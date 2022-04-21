import axios from 'axios'

// Vue.prototype.qs = qs

axios.defaults.baseURL = 'http://127.0.0.1:8002/api'
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

// async function GetMenuTree() {
//     let res = await httpget('data/register')
//     return res.data.data.body
// }
// async function GetRealtime(params) {
//     let res = await httppost('data/realtime', params)
//     let body = res.data.data.body
//     let data = {}
//     for (let i in body) {
//         data[body[i].name] = Number(body[i].val)
//     }
//     return data
// }
// async function GetHistoryData(params) {
//     let res = await httppost('data/historyN', params)
//     let body = res.data.data.body
//     let data = []
//     for (let i in body) {
//         let item = {
//             time: body[i].time
//         }
//         for (let j in body[i].body) {
//             item[body[i].body[j].name] = Number(body[i].body[j].val)
//         }
//         data.push(item)
//     }
//     return data
// }

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
export {
    GetDeviceList,
    GetDeviceData,
    GetDeviceHistoryData
};