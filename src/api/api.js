import axios from "axios";

// Vue.prototype.qs = qs

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV.curMode == "development") {
  axios.defaults.baseURL = "	http://127.0.0.1:4523/m1/761759-0-default/";
} else {
  axios.defaults.baseURL = "https://mock.apifox.cn/m1/761759-0-default/";
}

//apifox本地模拟数据
//axios.defaults.baseURL = 'http://127.0.0.1:8080/mock/908535/';

//apifox云端模拟数据
//axios.defaults.baseURL = 'https://mock.apifox.cn/m1/761759-0-default/';

//本地设备包数据
//axios.defaults.baseURL = 'http://127.0.0.1:8002/api'

//线上数据接口
//axios.defaults.baseURL = window.location.href + "api";

// axios.defaults.baseURL = 'http://127.0.0.1:8002/api'
// axios.defaults.baseURL = 'http://192.168.2.33:8002/api'
// axios.defaults.baseURL = window.location.href + "api"

async function httpget(url) {
  return axios.get(url);
}
async function httppost(url, para) {
  return axios.post(url, para);
}

//获取设备列表
async function GetDeviceList() {
  let res = await httpget("api/base/deviceList");
  return res;
}

//获取设备实时数据
async function GetDeviceData(params) {
  let pms = {
    dev: params,
  };
  let res = await httppost("api/base/realtime", pms);
  return res;
}

//获取设备历史台账数据
async function GetDeviceHistoryData(params) {
  let res = await httppost("api/base/record", params);
  return res;
}

//获取设备告警事件数据
async function GetAlarmEvent(params) {
  let res = await httppost("api/base/alarm", params);
  return res;
}

//获取设备故障波形数据
async function GetErrorState(params) {
  let res = await httppost("api/base/faultWaveform", params);
  return res;
}

//获取设备参数
async function GetDevParams(params) {
  let res = await httppost("api/base/getConfig", params);
  return res;
}

//上传设备参数
async function SetDevParams(params) {
  let res = await httppost("api/base/setConfig", params);
  return res;
}

//登录
async function LoginParams(params) {
  let res = await httppost("api/user/login", params);
  return res;
}

export {
  GetDeviceList,
  GetDeviceData,
  GetDeviceHistoryData,
  GetAlarmEvent,
  GetErrorState,
  GetDevParams,
  SetDevParams,
  LoginParams,
};
