import axios from 'axios'

// Vue.prototype.qs = qs

// axios.defaults.baseURL = 'http://127.0.0.1:8002'
//axios.defaults.baseURL = 'http://192.168.2.33:8002/api'
axios.defaults.baseURL = window.location.href+"api"
//console.log(window.location.href)
//debugger

async function httpget(url){
    return axios.get(url)
}
async function httppost(url,para){
    return axios.post(url,para)
}

async function GetMenuTree(){
    let res = await httpget('data/register')
    return res.data.data.body  
}
async function GetRealtime(req){
    let res = await httppost('data/realtime',req)
    let body = res.data.data.body  
    let data = {}
    for(let i in body){
        data[body[i].name]=Number(body[i].val)
    }    
    return data
}
async function GetHistoryData(req){
    let res = await httppost('data/historyN',req)
    let body = res.data.data.body  
    let data = []
    for(let i in body){
        let item = {
            time:body[i].time
        }
        for(let j in body[i].body){
            item[body[i].body[j].name]=Number(body[i].body[j].val)
        }
        data.push(item)
    }
    return data
}
export{
    GetMenuTree,
    GetRealtime,
    GetHistoryData
};