<template>
  <div>

    <el-row>
      <el-col :span="16">
        <line-chart-two style="height:300px"></line-chart-two>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix" shadow="never">
            <span>实时数据</span>            
          </div>
            <el-row>
              <el-col :span="12">
                <el-card class="box-card" shadow="never">
                  <div slot="header" class="clearfix">
                    <span>漏电电流最大值(mA)</span>            
                  </div>
                  <span class="big-number">183</span>
                </el-card>
              </el-col>
              <el-col :span="12">
                <el-card class="box-card" shadow="never">
                  <div slot="header" class="clearfix">
                    <span>漏电电流平均值(mA)</span>            
                  </div>
                  <span class="big-number">36</span>
                </el-card>
              </el-col>
            </el-row>
          <div>
            <el-row>
              <el-col :span="8">
                <gauge-chart></gauge-chart>
              </el-col>
              <el-col :span="8">
                <gauge-chart></gauge-chart>
              </el-col>              
              <el-col :span="8">
                <gauge-chart></gauge-chart>
              </el-col>   
            </el-row>            
          </div>
        </el-card>  
      </el-col>
    </el-row>
    <el-table :data="tableData" height="800px">
      <el-table-column prop="date" label="时间" width="160"></el-table-column>
      <el-table-column prop="name" label="漏电电流Avg(mA)"></el-table-column>
      <el-table-column prop="name" label="漏电电流Max(mA)"></el-table-column>
      <el-table-column prop="name" label="A相电流(A)"></el-table-column>
      <el-table-column prop="name" label="B相电流(A)"></el-table-column>
      <el-table-column prop="name" label="C相电流(A)"></el-table-column>        
      <el-table-column prop="name" label="A相电压(A)"></el-table-column>
      <el-table-column prop="name" label="B相电压(A)"></el-table-column>
      <el-table-column prop="name" label="C相电压(A)"></el-table-column>
      <el-table-column prop="name" label="环境温度(℃)"></el-table-column>
      <el-table-column prop="name" label="环境湿度(%)"></el-table-column>
      <el-table-column prop="name" label="接点温度(℃)"></el-table-column>        
    </el-table>
    <el-pagination
      layout="->,prev, pager, next"
      :total="50">
    </el-pagination>
  </div>
</template>

<script>
import GaugeChart from './chart/GaugeChart.vue';
import LineChartTwo from './chart/LineChartTwo.vue';
export default {
  components: {LineChartTwo, GaugeChart},
  data() {
      const item = {
        date: '2016-05-02 12:00:00',
        name: '25.45',
      };
      return {
        tableData: Array(20).fill(item),
        
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
    background-color: rgb(166,202,202);
  }
  .el-card__body{
    padding: 0;
  }
</style>
