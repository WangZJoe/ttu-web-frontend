<template>

<el-container style="border: 0px solid #eee;">

    <el-header>
        <span style="text-align:left;font-size:26px;font-weight:500;color:#333333">低压台区漏电管家</span>
        <span style="margin-left:147px;font-size:18px;font-weight:500;color:#333333">10kv古城大道线路——邱家咀3#台区</span>
        <span style="margin-left:41px;background: #00FFDC;" class="circle"></span>
        <span style="font-size:18px;color:#666666;">在线 {{online}}/{{total}}</span>
      <el-dropdown style="float:right">
        <span  style="float:right;font-size:16px">2022-03-20 15:12:55</span>
        <i class="el-icon-bell" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>消息提醒</el-dropdown-item>
        </el-dropdown-menu>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>参数设置</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

    </el-header>

  
  <el-container>
  <el-aside width="12.5%" style="background-color: #176AD5">
    <el-menu :default-openeds="['1', '2']">
      <menu-tree :menuData="menuList"></menu-tree>
    </el-menu>
  </el-aside>
    
    <el-main>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane class="tab-pane" label="实时监测" name="1">
          <data-curve></data-curve>
        </el-tab-pane>
        <el-tab-pane class="tab-pane" label="历史数据" name="2">
          <data-before></data-before>
        </el-tab-pane>
        <el-tab-pane class="tab-pane" label="警告事件" name="3">故障波形</el-tab-pane>
        <el-tab-pane class="tab-pane" label="故障波形" name="4">保护策略</el-tab-pane>
        <el-tab-pane class="tab-pane" label="保护策略" name="5">漏电分析</el-tab-pane>
        <el-tab-pane class="tab-pane" label="漏电分析" name="6">漏电分析</el-tab-pane>
      </el-tabs>
      
    </el-main>
  </el-container>
</el-container>

</template>

<script>
import DataCurve from './DataCurve.vue';
import DataBefore from './DataBefore.vue';
import MenuTree from './MenuTree.vue'
export default {
  components: { DataCurve,DataBefore,MenuTree },
  data(){
      return{
        activeName:"1",

        //设备数量
        online:34,
        total:45,


        //侧边栏设备数据
        menuList:[
          {
            index:'1',
            icon:'icon-1',
            name:'设备组1',
            children:[
              {
                index:'1-1',
                icon:'icon-1-1',
                name:'01#设备'
              },
              {
                index:'1-2',
                icon:'icon-2',
                name:'02#设备'
              },
              {
                index:'1-3',
                icon:'icon-2-1',
                name:'03#设备'
              },
              {
                index:'1-4',
                icon:'icon-2',
                name:'04#设备'
              }
            ]
          },
           {
            index:'2',
            icon:'icon-3',
            name:'设备组2',
            children:[
              {
                index:'2-1',
                icon:'icon-3-1',
                name:'21#设备'
              },
              {
                index:'2-2',
                icon:'icon-1',
                name:'22#设备'
              },
              {
                index:'2-3',
                icon:'icon-1-1',
                name:'23#设备'
              },
              {
                index:'2-4',
                icon:'icon-2-1',
                name:'24#设备'
              }
            ]
          }
        ]
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
    background-color: #fff;    
    line-height: 60px;
    box-shadow: 0px 3px 10px 1px rgba(0, 104, 163, 0.1);
    height: 6%;
  }

  .circle{
    display:inline-block; 
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }

  .icon-1, #el-icon-menu{
    width: 18px;
    height: 18px;
    content: url(assets/1.png);
  }

  
  .icon-1-1, #el-icon-menu{
    width: 18px;
    height: 18px;
    content: url(assets/1-1.png);
  }

  .icon-2, #el-icon-menu{
    width: 18px;
    height: 18px;
    content: url(assets/2.png);
  }

  .icon-2-1, #el-icon-menu{
    width: 18px;
    height: 18px;
    content: url(assets/2-1.png);
  }

  .icon-3, #el-icon-menu{
    width: 18px;
    height: 18px;
    content: url(assets/3.png);
  }

  .icon-3-1, #el-icon-menu{
    width: 18px;
    height: 18px;
    content: url(assets/3-1.png);
  }

  .tab-pane{
    font-size: 22px;
    font-family: 'Source Han Sans CN-Regular, Source Han Sans CN';
    font-weight: 400;
    color: #585858;
  }
  
</style>