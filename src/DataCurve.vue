<template>
  <div>

    <el-row>
      <el-col class="statistics" >
        <data-statistics :value="tableData"></data-statistics>
      </el-col>
      <el-col class="current">
        <data-current :data="realtimeData"></data-current>
      </el-col>
    </el-row>

    <data-monitoring :tableData="tableData" class="monitoring"></data-monitoring>
    
  </div>
</template>

<script>
import DataStatistics from './Data/DataStatistics.vue'
import DataCurrent from './Data/DataCurrent.vue'
import DataMonitoring from './Data/DataMonitoring.vue'
import {GetHistoryData,GetRealtime} from './utils/api'

export default {
  components: { DataStatistics, DataCurrent,DataMonitoring},
  props: ['currentDev'],
  // mounted:{},
  data() {
      const item = {
        date: '2016-05-02 12:00:00',
        name: '25.45',
      };
      return {
        tableData: [{ "time": "2022-04-02 15:40:42",}],//Array(5).fill(item),
        realtimeData:[{"Tmp":25.21}],
        lineData: {
          "10:00": 30,
          "11:00": 20,
          "12:00": 50,
          "13:00": 60,
          "14:00": 70,
          "15:00": 90,
          "16:00": 55,
          "17:00": 33,
        }
    
    }
  },
  methods: {  
    getTableData : async function(){
      let historyData = await GetHistoryData({
        "dev": this.currentDev,
        "upperN": 10,
        "frozen_type": "SchFroz",
        "body": "-"
      })  
      this.tableData.length=0    
      this.tableData = historyData      
    },
    getRealtimeData : async function(){
      let RealtimeData = await GetRealtime({
        "dev": this.currentDev,
        "attribute": "-",
        "totalCall": "1"
      })  
      this.realtimeData.length=0    
      this.realtimeData = RealtimeData      
    },
  },
  watch:{
    currentDev:async function(oldDev,newDev){
      if(oldDev==newDev){return}
      await this.getTableData()      
      await this.getRealtimeData()      
    }
  }

}
</script>

<style>
  .big-number{
    font-size:64px;
    color:rgb(8, 113, 117);
  }
  .el-card__header{
    padding: 0;
    font-size: 18px;
    /* background-color: rgb(166,202,202); */
  }
  .el-card__body{
    padding: 0;
  }
  .statistics{
    width: 54%;
    height: 100%;
    background: #FFFFFF;
    border-radius: 10px 10px 10px 10px;
  }
  .current{
    margin-left: 3%;
    width: 43%;
    height: 100%;
    background: #FFFFFF;
    border-radius: 10px 10px 10px 10px;
  }
  .monitoring{
    margin-top: 1%;
    height: 39%;
    background: #FFFFFF;
    border-radius: 10px 10px 10px 10px;
  }
</style>
