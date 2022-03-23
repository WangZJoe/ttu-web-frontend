<template>
    <div>
      <el-row style="height:70px;display: flex;align-items: center;">
        <i class="icon-monitor"></i><span class="title">数据监测</span>
      </el-row>
      <el-table :data="tableData" class="table" border :row-style="tableRowStyle" :header-cell-style="tableHeaderColor">
        <el-table-column prop="date" label="时间" width="165"></el-table-column>
        <el-table-column prop="name" label="In Avg(mA)"></el-table-column>
        <el-table-column prop="name" label="In Max(mA)"></el-table-column>
        <el-table-column prop="name" label="Ia(A)"></el-table-column>
        <el-table-column prop="name" label="Ib(A)"></el-table-column>
        <el-table-column prop="name" label="Ic(A)"></el-table-column>        
        <el-table-column prop="name" label="Ua(v)"></el-table-column>
        <el-table-column prop="name" label="Ub(v)"></el-table-column>
        <el-table-column prop="name" label="Uc(v)"></el-table-column>
        <el-table-column prop="name" label="Tn(℃)"></el-table-column>
        <el-table-column prop="name" label="T(℃)"></el-table-column>
        <el-table-column prop="name" label="H(%rh)"></el-table-column>
        <el-table-column prop="name" label="接点温度Max(℃)" width="142"></el-table-column>        
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
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