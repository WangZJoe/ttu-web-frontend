<template>
    <div>
      <el-row style="height:70px;display: flex;align-items: center;margin-left: 18px">
        <i class="icon-monitor"></i><span class="title">数据监测</span>
      </el-row>
      <el-table :data="tableData" class="table" border :row-style="tableRowStyle" :header-cell-style="tableHeaderColor">
        <!-- <el-table-column prop="time" label="时间" width="165"></el-table-column> -->
        <el-table-column v-for="(value, name) in tableData[0]" v-bind:key="name" v-bind:prop="name" v-bind:label="name"></el-table-column>
        <!-- <el-table-column prop="AMax_phsA"            label="AMax_phsA"            ></el-table-column>         
        <el-table-column prop="BMax_phsA"            label="BMax_phsA"            ></el-table-column>         
        <el-table-column prop="CMax_phsA"            label="CMax_phsA"            ></el-table-column>         
        <el-table-column prop="AMax_neut"            label="AMax_neut"            ></el-table-column>         
        <el-table-column prop="A_phsA"               label="A_phsA"               ></el-table-column>   
        <el-table-column prop="B_phsA"               label="B_phsA"               ></el-table-column>   
        <el-table-column prop="C_phsA"               label="C_phsA"               ></el-table-column>   
        <el-table-column prop="EnvHum"               label="EnvHum"               ></el-table-column>   
        <el-table-column prop="PhV_phsA"             label="PhV_phsA"             ></el-table-column>       
        <el-table-column prop="PhV_phsB"             label="PhV_phsB"             ></el-table-column>       
        <el-table-column prop="PhV_phsC"             label="PhV_phsC"             ></el-table-column>       
        <el-table-column prop="Tmp"                  label="Tmp"                  ></el-table-column>
        <el-table-column prop="PTUV_Open_Op_phsA"    label="PTUV_Open_Op_phsA"    ></el-table-column>                         
        <el-table-column prop="PTUV_Open_Op_phsB"    label="PTUV_Open_Op_phsB"    ></el-table-column>                         
        <el-table-column prop="PTUV_Open_Op_phsC"    label="PTUV_Open_Op_phsC"    ></el-table-column>                         
        <el-table-column prop="A_neut"               label="A_neut"               ></el-table-column>   
        <el-table-column prop="AMax_neut"            label="AMax_neut"            ></el-table-column>         
        <el-table-column prop="Max_Tmp"              label="Max_Tmp"              ></el-table-column>     
        <el-table-column prop="Max_TmpValue"         label="Max_TmpValue"         ></el-table-column>         -->
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="20"
        class="pages">
      </el-pagination>
    </div>
</template>

<script>
export default{
  props: ['tableData'],
  data(){
    return{
      currentPage:1,
    }
  },
  methods:{
    // 修改table tr行
    tableRowStyle({ row, rowIndex }) {
      return 'color: #585858;font-weight: 400;font-family: Source Han Sans CN-Normal, Source Han Sans CN;'
    },
    // 修改table header
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'text-align: center;background-color: #FBFBFD; color: #333333; font-family: Source Han Sans CN-Medium, Source Han Sans CN;font-weight: 400;'
      }
    },
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
}
</script>

<style>
.table{
  border: 1px solid #E9E9E9;
  width: 96%;
  margin-left: 2%;
  text-align: center;
}
.pages{
  margin-top: 1%;
  margin-left: 2%;
}
.title{
  font-size: 20px;
  font-family: 'Source Han Sans CN-Medium, Source Han Sans CN';
  font-weight: 500;
  color: #333333;
}
.icon-monitor, #el-icon-menu{
  width: 32px;
  height: 32px;
  content: url(../assets/monitor.png);
}
</style>