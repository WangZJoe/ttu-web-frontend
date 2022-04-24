<template>
    <div class="error-state-book">
        <date-pick-search @getTime="getTime"></date-pick-search>
        <div class="layout">
            <div class="card-box card-table">
                <div class="table-body">
                    <el-table :data="tableData" border height="100%" :header-cell-style="{background:'#F0F7FD'}">
                        <el-table-column prop="number" label="序号">
                        </el-table-column>
                        <el-table-column prop="time" label="时间">
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="card-box card-charts">
                <div class="card-content column-charts">
                    <div class="title">
                        <div class="tip-color"></div>
                        <h3>故障波形</h3>
                    </div>
                    <div id="errorCharts" :style="{ height: '14rem'}"></div>
                    <div class="title">
                        <div class="tip-color"></div>
                        <h3>超清波形</h3>
                    </div>
                    <div id="clearCharts" :style="{ height: '14rem'}"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import * as echarts from "echarts";
import DatePickSearch from "../../../components/DatePickSearch.vue";
import { GetDeviceHistoryData } from "../../../api/api"

export default {
    components: { DatePickSearch },
    props: ["curveDev"],
    data() {
        return {
            //表格数据
            tableData: [],
            //数据时间
            dataTimes: [],
            //漏电电流 时间
            electricDatas: [],
            //x相电流 时间
            electricDatasA: [],
            electricDatasB: [],
            electricDatasC: [],

            //开始 结束时间
            // start_time: this.$moment().format('YYYY-MM-DD'),
            start_time: "2022-04-04",
            // end_time: this.$moment().format('YYYY-MM-DD'),
            end_time: "2022-04-24",
            //间隔周期 间隔数
            time_span_unit: "min",
            time_span_number: 60,
        };
    },
    methods: {
        //获取历史设备数据参数
        getHistoryDataParams(dev) {
            let params = {
                dev: dev,
                start_time: this.start_time,
                end_time: this.end_time,
                time_span_unit: this.time_span_unit,
                time_span_number: this.time_span_number,
            }
            this.rest();
            return params
        },
        //请求历史台账数据
        async getHistoryDatas(params) {
            if (params) {
                let res = await GetDeviceHistoryData(params);
                if (res.data.code != 0) {
                    this.$message.error('设备数据请求失败');
                    this.setDataCensusCharts();
                } else {
                    let data = res.data.data;
                    data.record.forEach(item => {
                        this.dataTimes.push(item.time);
                        this.electricDatas.push(item.In_Avg);
                        this.electricDatasA.push(item.Ia);
                        this.electricDatasB.push(item.Ib);
                        this.electricDatasC.push(item.Ic);
                    });
                    this.tableData = data.record;
                    this.setDataCensusCharts();
                }
            }
        },
        //初始化数据
        rest() {
            this.tableData = [];
            this.dataTimes = [];
            this.electricDatas = [];
            this.electricDatasA = [];
            this.electricDatasB = [];
            this.electricDatasC = [];
        },
        //设置数据统计图表
        setDataCensusCharts() {
            let errorCharts = document.getElementById("errorCharts");
            let clearCharts = document.getElementById("clearCharts");

            let myErrorCharts = echarts.init(errorCharts);
            let myClearCharts = echarts.init(clearCharts);


            let errorOption = {
                tooltip: {
                    trigger: "axis",
                },
                legend: {
                    data: ["漏电电流", "A相电流", "B相电流", "C相电流"],
                },
                xAxis: {
                    type: "category",
                    data: this.dataTimes,
                },
                yAxis: {
                    type: "value",
                    name: "(A)",
                    nameTextStyle: {
                        align: "right",
                    },
                },
                series: [
                    {
                        name: "漏电电流",
                        type: "line",
                        stack: "Total",
                        data: this.electricDatas,
                    },
                    {
                        name: "A相电流",
                        type: "line",
                        stack: "Total",
                        data: this.electricDatasA,
                    },
                    {
                        name: "B相电流",
                        type: "line",
                        stack: "Total",
                        data: this.electricDatasB,
                    },
                    {
                        name: "C相电流",
                        type: "line",
                        stack: "Total",
                        data: this.electricDatasC,
                    },
                ],
            };
            let clearOption = {
                xAxis: {
                    type: "category",
                    data: this.dataTimes
                },
                yAxis: {
                    type: "value",
                    name: "(mA)",
                    nameTextStyle: {
                        align: "right",
                    },
                },
                series: [
                    {
                        data: this.clearDatas,
                        type: "line",
                    },
                ],
            };

            myErrorCharts.setOption(errorOption);
            myClearCharts.setOption(clearOption);
        },
        //日期选择切换查询历史数据
        getTime(val) {
            this.start_time = val[0];
            this.end_time = val[1];
            this.$emit('requstStatus', true);
            let params = this.getHistoryDataParams(this.curveDev);
            this.getHistoryDatas(params);
            setTimeout(() => {
                this.$emit('requstStatus', false);
            }, 500);
        }
    },
    watch: {
        //设备切换重新请求数据
        curveDev: {
            immediate: true,
            handler(newVal) {
                this.$emit('requstStatus', true);
                let params = this.getHistoryDataParams(newVal);
                this.getHistoryDatas(params);
                setTimeout(() => {
                    this.$emit('requstStatus', false);
                }, 500);
            }
        },
    }
};
</script>
<style lang="scss">
@import "./ErrorState.scss";
</style>