<template>
    <div>
      <span>数据监测</span>
      <el-table :data="tableData" class="table" border>
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
.table{
  border: 1px solid #E9E9E9;
}
</style>