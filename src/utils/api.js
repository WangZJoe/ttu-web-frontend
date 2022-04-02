import axios from 'axios'

// Vue.prototype.qs = qs

axios.defaults.baseURL = 'http://127.0.0.1:8000'

async function httpget(url){
    let data;
    await axios.get(url).then((response)=>{
        data=response
    }).catch((error)=>{
        console.log(error)
    });
    return data
}

function GetMenuTree(){
    httpget('data/register').then(res=>{
        return res
    })
    
}
export{
    GetMenuTree
};