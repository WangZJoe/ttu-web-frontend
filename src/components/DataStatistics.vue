<template>
    <div>
      <el-row style="display: flex;align-items: center;margin-left: 18px">
        <i class="icon-statistics"></i><span class="title">数据统计</span>
      </el-row>
        <line-chart-two :value=value style="height:300px"></line-chart-two>
    </div>
</template>

<script>
import LineChartTwo from '../chart/LineChartTwo.vue';
export default{
    components: {
        LineChartTwo
    },
    props:["value"],
    methods:{

    }
}
</script>

<style>
.title{
    color: #333333;
    font-size: 20px;
    font-family: 'Source Han Sans CN-Medium, Source Han Sans CN';
    font-weight: 500;
}
</style>
