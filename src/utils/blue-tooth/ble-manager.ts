import BleManager from "react-native-ble-manager";
import { emitter } from "@/global/event-bus";
import { EmitterSubscription, NativeEventEmitter, NativeModules, ToastAndroid } from "react-native";
import { dealData } from "@/utils/protocol/analysis";
import { verifyBLEOpen, verifyLocationPermission } from "@/utils/blue-tooth/permission-helper";

// 注册BLE模块
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

// 发现设备监听器
let discoverPeripheralListener: EmitterSubscription,
    // 停止扫描监听器
    stopScanListener: EmitterSubscription,
    // 设备断开监听器
    disconnectPeripheralListener: EmitterSubscription,
    // 特征值更新监听器
    updateValueForCharacteristicListener: EmitterSubscription;


// 开始监听BLE
export const BLEManagerListener = () => {
    BleManager.start({ showAlert: false }).then(e => null);

    discoverPeripheralListener = bleManagerEmitter.addListener("BleManagerDiscoverPeripheral", handleDiscoverPeripheral);
    stopScanListener = bleManagerEmitter.addListener("BleManagerStopScan", handleStopScan);
    disconnectPeripheralListener = bleManagerEmitter.addListener("BleManagerDisconnectPeripheral", handleDisconnectedPeripheral);
    updateValueForCharacteristicListener = bleManagerEmitter.addListener("BleManagerDidUpdateValueForCharacteristic", handleUpdateValueForCharacteristic);
};


// 移除监听BLE
export const removeBLEManagerListener = () => {
    discoverPeripheralListener && discoverPeripheralListener.remove();
    stopScanListener && stopScanListener.remove();
    disconnectPeripheralListener && disconnectPeripheralListener.remove();
    updateValueForCharacteristicListener && updateValueForCharacteristicListener.remove();
};


// // 蓝牙服务 -- uuid
// const service = "0000fee7-0000-1000-8000-00805f9b34fb";
//
// // 接收数据特征值 -- uuid
// const receiveCharacteristic = "0000fec8-0000-1000-8000-00805f9b34fb";
// // 写数据特征值 -- uuid
// const writeCharacteristic = "0000fec7-0000-1000-8000-00805f9b34fb";


// 蓝牙服务 -- uuid
const service = "0000ffe0-0000-1000-8000-00805f9b34fb";

// 接收数据特征值 -- uuid
const receiveCharacteristic = "0000ffe1-0000-1000-8000-00805f9b34fb";
// 写数据特征值 -- uuid
const writeCharacteristic = "0000ffe2-0000-1000-8000-00805f9b34fb";


let isScanning = false;  // 是否正在扫描
let peripheralID = "";   // 连接的蓝牙设备ID

let timer: NodeJS.Timer | null = null;


/**
 * 开始扫描
 * */
export const startScan = async () => {
    try {
        // 判断是否已开启定位权限
        await verifyLocationPermission();

        // 判断是否打开蓝牙
        await verifyBLEOpen();

        const connectedPeripherals = await BleManager.getConnectedPeripherals([service]);

        if (connectedPeripherals.length > 0) {
            // 意味着设备已连接某个蓝牙
            ToastAndroid.show("正在连接蓝牙中", ToastAndroid.LONG);


            await connectDevice(connectedPeripherals[0]);
            await BleManager.stopScan();
            ToastAndroid.show("蓝牙连接成功", ToastAndroid.SHORT);


            emitter.emit("isConnect", true);

        } else {
            if (!isScanning) {
                await BleManager.scan([], 5, true);

                ToastAndroid.show("搜索蓝牙设备中", ToastAndroid.LONG);

                timer && clearTimeout(timer);
                timer = null;
                timer = setTimeout(() => ToastAndroid.show("未找到蓝牙设备", ToastAndroid.SHORT), 5000);

                isScanning = true;
            }
        }


    } catch (e) {
        isScanning = false;
        ToastAndroid.show("蓝牙连接错误", ToastAndroid.SHORT);

    }
};

/**
 * 停止搜索回调
 * */
export const handleStopScan = () => {
    console.log("Scan is stopped");
    isScanning = false;
};

/**
 * 处理连接断开回调
 * @param {any} data
 * */
export const handleDisconnectedPeripheral = (data: any) => {
    console.log("Disconnected from " + data.peripheral);
    emitter.emit("isConnect", false);
    ToastAndroid.show("蓝牙断开连接", ToastAndroid.SHORT);
};

/***
 * 处理数据上发回调
 * @param {any} data
 */
export const handleUpdateValueForCharacteristic = (data: any) => {
    dealData(data.value);
};

/**
 * 处理设备发现回调
 * */
export const handleDiscoverPeripheral = async (peripheral: any) => {

    // TODO 当前仅以bt24作为蓝牙设备名称

    if (peripheral.name && peripheral.name.toLowerCase() === "bt24") {

        timer && clearTimeout(timer);
        timer = null;

        ToastAndroid.show("正在连接蓝牙中", ToastAndroid.LONG);


        await connectDevice(peripheral);
        await BleManager.stopScan();
        ToastAndroid.show("蓝牙连接成功", ToastAndroid.SHORT);

        emitter.emit("isConnect", true);
    }
};


/**
 * 连接设备
 * */
const connectDevice = async (peripheral: any) => {
    try {
        if (!peripheral) return;
        if (peripheral.connected) return


        // 连接蓝牙
        await BleManager.connect(peripheral.id);

        // 设置连接的蓝牙ID
        peripheralID = peripheral.id;

        // 获取服务
        await BleManager.retrieveServices(peripheral.id);

        // 监听服务
        await BleManager.startNotification(peripheral.id, service, receiveCharacteristic);

    } catch (e) {
        console.log("蓝牙连接错误" + e);
    }

};


/**
 * 向BLE设备发送数据
 * @parma {number[]} data 待发送的数据
 * */
export const sendDataToBLE = async (data: number[]) => {
    try {
        if (peripheralID === "") return;

        await BleManager.write(peripheralID, service, writeCharacteristic, data);
    } catch (e) {
        console.log(e);
    }
};


