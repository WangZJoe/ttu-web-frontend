<template>
    <div class="history-standing-book">
        <date-pick-search @getTime="getTime"></date-pick-search>
        <div class="top-charts card-box">
            <div class="title">
                <div class="tip-color"></div>
                <h3>数据统计</h3>
            </div>
            <div class="card-content row-charts">
                <div id="leakageCharts" :style="{ height: '14rem'}"></div>
                <div id="electricCharts" :style="{ height: '14rem'}"></div>
                <div id="voltageCharts" :style="{ height: '14rem'}"></div>
            </div>
        </div>
        <div class="table-body card-box">
            <div class="title">
                <div class="tip-color"></div>
                <h3>历史数据</h3>
            </div>
            <div class="card-content table-content">
                <el-table :data="tableData" border height="100%" :header-cell-style="{background:'#F0F7FD'}">
                    <el-table-column prop="time" label="时间">
                    </el-table-column>
                    <el-table-column prop="In_Avg" label="In Avg(mA)">
                    </el-table-column>
                    <el-table-column prop="In_Max" label="In Max(mA)">
                    </el-table-column>
                    <el-table-column prop="Ia" label="Ia(A)">
                    </el-table-column>
                    <el-table-column prop="Ib" label="Ib(A)">
                    </el-table-column>
                    <el-table-column prop="Ic" label="Ic(A)">
                    </el-table-column>
                    <el-table-column prop="Ua" label="Ua(V)">
                    </el-table-column>
                    <el-table-column prop="Ub" label="Ub(V)">
                    </el-table-column>
                    <el-table-column prop="Uc" label="Uc(V)">
                    </el-table-column>
                    <el-table-column prop="In_Max" label="Tn(°C)">
                    </el-table-column>
                    <el-table-column prop="In_Max" label="T(°C)">
                    </el-table-column>
                    <el-table-column prop="In_Max" label="H(%rh)">
                    </el-table-column>
                </el-table>
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
            leakageDatas: [],
            //x相电流 时间
            electricDatasA: [],
            electricDatasB: [],
            electricDatasC: [],
            //x相电压 时间
            voltageDatasA: [],
            voltageDatasB: [],
            voltageDatasC: [],
            //开始 结束时间
            start_time: this.$moment().format('YYYY-MM-DD'),
            // start_time: "2022-04-04",
            end_time: this.$moment().format('YYYY-MM-DD'),
            // end_time: "2022-04-24",
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
                        this.leakageDatas.push(item.In_Avg);
                        this.electricDatasA.push(item.Ia);
                        this.electricDatasB.push(item.Ib);
                        this.electricDatasC.push(item.Ic);
                        this.voltageDatasA.push(item.Ua);
                        this.voltageDatasB.push(item.Ub);
                        this.voltageDatasC.push(item.Uc);
                    });
                    this.tableData = data.record;
                    this.setDataCensusCharts();
                }
            }
        },
        //初始化数据
        rest() {
            this.tableData = [];
            this.leakageDatas = [];
            this.dataTimes = [];
            this.electricDatasA = [];
            this.electricDatasB = [];
            this.electricDatasC = [];
            this.voltageDatasA = [];
            this.voltageDatasB = [];
            this.voltageDatasC = [];
        },
        //设置数据统计图表
        setDataCensusCharts() {
            let leakageCharts = document.getElementById("leakageCharts");
            let electricCharts = document.getElementById("electricCharts");
            let voltageCharts = document.getElementById("voltageCharts");

            let myLeakageCharts = echarts.init(leakageCharts);
            let myElectricCharts = echarts.init(electricCharts);
            let myVoltageCharts = echarts.init(voltageCharts);

            let leakageOption = {
                title: {
                    left: "center",
                    text: "漏电电流",
                },
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
                        data: this.leakageDatas,
                        type: "line",
                    },
                ],
            };
            let electricOption = {
                tooltip: {
                    trigger: "axis",
                },
                legend: {
                    data: ["A相电流", "B相电流", "C相电流"],
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
            let voltageOption = {
                tooltip: {
                    trigger: "axis",
                },
                legend: {
                    data: ["A相电压", "B相电压", "C相电压"],
                },
                xAxis: {
                    type: "category",
                    data: this.dataTimes,
                },
                yAxis: {
                    type: "value",
                    name: "(V)",
                    nameTextStyle: {
                        align: "right",
                    },
                },
                series: [
                    {
                        name: "A相电压",
                        type: "line",
                        stack: "Total",
                        data: this.voltageDatasA,
                    },
                    {
                        name: "B相电压",
                        type: "line",
                        stack: "Total",
                        data: this.voltageDatasB,
                    },
                    {
                        name: "C相电压",
                        type: "line",
                        stack: "Total",
                        data: this.voltageDatasC,
                    },
                ],
            };
            myLeakageCharts.setOption(leakageOption);
            myElectricCharts.setOption(electricOption);
            myVoltageCharts.setOption(voltageOption);
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
@import "./DataBefore.scss";
</style>