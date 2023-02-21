/*
 * @Author: JimmyDaddy
 * @Date: 2017-09-12 11:53:39
 * @Last Modified by: JimmyDaddy
 * @Last Modified time: 2018-04-27 15:20:55
 * @Description host
 */
export default {
  getHost: (test) => {
    if (test) {
      return 'http://121.40.83.124:8080';
    }
    return 'https://gateway.songxiaocai.com/';
  }
};
