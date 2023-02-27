import { Alert, PermissionsAndroid, ToastAndroid } from "react-native";
import SystemSetting from "react-native-system-setting";

/**
 * 判断是否已开启定位权限
 **/
export const verifyLocationPermission = () => {
    return new Promise<void>(async (resolve, reject) => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: "需要开启定位权限",
                    message: "使用BLE功能需要您开启定位权限",
                    buttonPositive: "开启",
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                // Toast.success('获取权限成功！');
                resolve();
            } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
                ToastAndroid.show("打开蓝牙失败，请在设置中开启定位权限", ToastAndroid.SHORT);
                reject();
            } else {
                ToastAndroid.show("打开蓝牙失败，请在设置中开启定位权限", ToastAndroid.SHORT);
                reject();
            }
        } catch (err) {
            reject();
        }
    });
};

/**
 * 判断是否打开蓝牙
 * */
export const verifyBLEOpen = () => {
    return new Promise<void>(async (resolve, reject) => {
        /**判断蓝牙是否开启 */
        const isBlueToothEnabled = await SystemSetting.isBluetoothEnabled();

        if (!isBlueToothEnabled) {
            Alert.alert("蓝牙未开启", "检测到您未开启蓝牙，是否打开？", [
                {
                    text: "取消",
                    onPress: () => {
                        ToastAndroid.show("请开启蓝牙功能", ToastAndroid.SHORT);
                        reject();
                    },
                    style: "cancel",
                },
                {
                    text: "打开",
                    onPress: () => {
                        SystemSetting.switchBluetooth(async () => {
                            const isBlueToothEnabled = await SystemSetting.isBluetoothEnabled();
                            if (isBlueToothEnabled) {
                                ToastAndroid.show("蓝牙开启成功!", ToastAndroid.SHORT);
                                resolve();
                            } else {
                                ToastAndroid.show("请开启蓝牙功能", ToastAndroid.SHORT);
                                reject();
                            }
                        });
                    },
                },
            ]);
        } else {
            resolve();
        }
    });
};

