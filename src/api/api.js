import axios from 'axios'

// Vue.prototype.qs = qs

axios.defaults.baseURL = 'http://127.0.0.1:8002/api'
// axios.defaults.baseURL = 'http://127.0.0.1:4523/mock/908535/api'
// axios.defaults.baseURL = 'http://192.168.2.33:8002/api'
// axios.defaults.baseURL = window.location.href + "api"
//console.log(window.location.href)
//debugger

async function httpget(url) {
    return axios.get(url)
}
async function httppost(url, para) {
    return axios.post(url, para)
}

//获取设备列表
async function GetDeviceList() {
    let res = await httpget('base/deviceList')
    return res;
}

//获取设备实时数据
async function GetDeviceData(params) {
    let pms = {
        dev: params
    }
    let res = await httppost('base/realtime', pms)
    return res
}

//获取设备历史台账数据
async function GetDeviceHistoryData(params) {
    let res = await httppost('base/record', params)
    return res;
}

//获取设备告警事件数据
async function GetAlarmEvent(params) {
    let res = await httppost('http://127.0.0.1:4523/mock/908535/api/base/alarm', params)
    return res;
}

//获取设备故障波形数据
async function GetErrorState(params) {
    let res = await httppost('http://127.0.0.1:4523/mock/908535/api/base/faultWaveform', params)
    return res;
}

export {
    GetDeviceList,
    GetDeviceData,
    GetDeviceHistoryData,
    GetAlarmEvent,
    GetErrorState
};