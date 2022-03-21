<template>
    <div>
      <span>数据监测</span>
      <el-table :data="tableData">
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
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="20">
      </el-pagination>
    </div>
</template>

<script>
export default{
  props: ['tableData'],
  data(){

  },
  methods:{

  }
}
</script>

<style>
</style>