<template>

<el-container style="border: 0px solid #eee;">
      <el-header style="text-align: left;">
        <span style="text-align:left;font-size:24px;color:rgb(8, 113, 117)">低压台区漏电管家</span>
        <span style="margin-left:20px">10kv古城大道线路——邱家咀3#台区</span>
      <el-dropdown style="float:right">
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>参数设置</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span  style="float:right;margin-right:20px">2022-03-20 15:12:55</span>
      <span  style="float:right;margin-right:20px">离线设备8台</span>
      <span  style="float:right;margin-right:20px">在线设备7台</span>

    </el-header>

  
  <el-container>
  <el-aside width="150px" style="background-color: rgb(238, 241, 246)">
    <el-menu :default-openeds="['1', '2']">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-menu"></i>设备组1</template>
        <el-menu-item index="1-1">01#设备</el-menu-item>
        <el-menu-item index="1-1">02#设备</el-menu-item>
        <el-menu-item index="1-1">03#设备</el-menu-item>
        <el-menu-item index="1-1">04#设备</el-menu-item>
        <el-menu-item index="1-1">05#设备</el-menu-item>
        <el-menu-item index="1-1">06#设备</el-menu-item>
        <el-menu-item index="1-1">07#设备</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-menu"></i>设备组2</template>
        <el-menu-item index="1-1">21#设备</el-menu-item>
        <el-menu-item index="1-1">22#设备</el-menu-item>
        <el-menu-item index="1-1">23#设备</el-menu-item>
        <el-menu-item index="1-1">24#设备</el-menu-item>
        <el-menu-item index="1-1">25#设备</el-menu-item>
        <el-menu-item index="1-1">26#设备</el-menu-item>
        <el-menu-item index="1-1">27#设备</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
    
    <el-main>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="数据曲线" name="1">
          <data-curve></data-curve>
        </el-tab-pane>
        <el-tab-pane label="告警事件" name="2">告警事件</el-tab-pane>
        <el-tab-pane label="故障波形" name="3">故障波形</el-tab-pane>
        <el-tab-pane label="保护策略" name="4">保护策略</el-tab-pane>
        <el-tab-pane label="漏电分析" name="5">漏电分析</el-tab-pane>
      </el-tabs>
      
    </el-main>
  </el-container>
</el-container>

</template>

<script>
import DataCurve from './DataCurve.vue';
export default {
  components: { DataCurve },
  data(){
      return{
        activeName:"1"
      }
  },
  methods: {
    startHacking () {
      this.$notify({
        title: 'It works!',
        type: 'success',
        message: 'We\'ve laid the ground work for you. It\'s time for you to build something epic!',
        duration: 5000
      })
    }    
  },
      

}
</script>

<style>
  .el-header {
    background-color: #e6e6e6;    
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>