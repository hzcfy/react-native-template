/**
 * @Author: kkt
 * @Date:   2017-06-01 05:44:43
 * @Email:  ferry@gmail.com
 * @Filename: web.bundle.js
 * @Last modified by:   jimmydaddy
 * @Last modified time: 2017-08-02 03:10:21
 * @License: GNU General Public License（GPL)
 * @Copyright: ©2015-2017 www.songxiaocai.com 宋小菜 All Rights Reserved.
 */

/**
  * 注入html中的js
  * @method WebViewBridgeReady
  * @param  {Function}
  * 在html页面中如下调用:
  * 记得在插入js脚本中的应该加分号的地方加分号，不可省略分号，养成好习惯
  * 不然Android可能会崩哟
  */
export default `
 window.document.addEventListener('message', function (e) {
   const message = e.data;
   eval(message);
 });

 window.ReactNativeFunction = {
     goToAlipay : function(){
       try{
         window.postMessage('toAlipay', '*');
       } catch(e){
         alert(e);
       }
     },
     gotoBigTopUp : function(){
         window.postMessage('gotoBigTopUp', '*');
     },
     goToGuaguale: function(){
         window.postMessage('goToGuaguale', '*');
     },
     goToLotteryGuaGuale: function(){
        window.postMessage('goToLotteryGuaguale', '*');
     },
     setComplete: function(obj){
         window.postMessage(JSON.stringify(obj), '*');
     },
 };
 `;
