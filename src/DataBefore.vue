<template>
    <div>
        <data-statistics></data-statistics>
        <data-monitoring :tableData="tableData" class="monitoring"></data-monitoring>
    </div>
</template>

<script>
import DataStatistics from './Data/DataStatistics.vue'
import DataMonitoring from './Data/DataMonitoring.vue'

export default{
    components:{DataStatistics,DataMonitoring},
    data(){
         const item = {
        date: '2016-05-02 12:00:00',
        name: '25.45',
      };
      return {
        tableData: Array(10).fill(item),
        
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
    }
}
</script>
