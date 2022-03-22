<template>
    <div>
        <el-card class="box-card">
          <div slot="header" class="clearfix" shadow="never">
            <span class="title">实时数据</span>            
          </div>
            <el-row>
              <el-col :span="11" style="margin-left: 4%;">
                <el-card class="box-card1" shadow="never">
                  <div slot="header" class="clearfix">
                    <span>漏电电流最大值(mA)</span>            
                  </div>
                  <span class="big-number">183</span>
                </el-card>
              </el-col>
              <el-col :span="11" style="margin-left: 4%;">
                <el-card class="box-card2" shadow="never">
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
    </div>
</template>

<script>
import GaugeChart from '../chart/GaugeChart.vue';
export default{
    components:{
        GaugeChart
    },
    data(){

    },
    methods:{

    }
}
</script>

<style>
.box-card1{
  background: linear-gradient(91deg, #1D89FF 0%, #2D41F5 100%);
  /* background-image: url("../assets/card1.png"); */
  border-radius: 8px 8px 8px 8px;
  color: white;
}
.box-card2{
  background: linear-gradient(91deg, #02E1E4 0%, #06E3B6 100%);
  /* background-image: url("../assets/card2.png"); */
  border-radius: 8px 8px 8px 8px;
  color: white;
}
.big-number{
  color: white;
}
.title{
  font-size: 20px;
  font-family: 'Source Han Sans CN-Medium, Source Han Sans CN';
  font-weight: 500;
  color: #333333;
}
</style>