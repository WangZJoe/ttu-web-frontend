<template>
    <div>
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
</style>