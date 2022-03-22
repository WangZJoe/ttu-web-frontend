<template>
    <div>
        <span class="title">数据统计</span>
        <line-chart-two style="height:300px"></line-chart-two>
    </div>
</template>

<script>
import LineChartTwo from '../chart/LineChartTwo.vue';
export default{
    components: {
        LineChartTwo
    },
    data(){

    },
    methods:{

    }
}
</script>

<style>
.title{
    color: #333333;
    font-size: 20px;
    font-family: Source Han Sans CN-Medium, Source Han Sans CN;
    font-weight: 500;
}
</style>
