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
                    data: [
                        {
                            name: "漏电电流",
                            itemStyle: {
                                borderColor: 'rgba(59, 236, 242, 0.41)',
                                borderWidth: 1.6
                            }
                        }, {
                            name: "A相电流",
                            itemStyle: {
                                borderColor: 'rgba(255, 163, 0, 0.3)',
                                borderWidth: 1.6
                            }
                        }, {
                            name: "B相电流",
                            itemStyle: {
                                borderColor: 'rgba(2, 228, 151, 0.52)',
                                borderWidth: 1.6
                            }
                        }, {
                            name: "C相电流",
                            itemStyle: {
                                borderColor: 'rgba(255, 116, 173, 0.3)',
                                borderWidth: 1.6
                            }
                        }],
                    selectedMode: "multiple",
                    x: "center",
                    y: "top",
                    textStyle: { color: "rgb(153, 153, 153)" },
                    itemWidth: 8,
                    itemHeighth: 8,
                    // padding: 10
                },
                toolbox: {
                    feature : {
                        mark: {
                            show: true
                        },
                        dataView: { show: true, readOnly: true },
                        magicType: { show: false, type: ["line", "bar"] },
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                calculable: true,
                 xAxis: { 
                    type: "category", 
                    boundaryGap: false, 
                    // 测试数据
                    data: ["01", "02", "03", "04", "05", "06", "07"], 
                    // 实际接口
                    // data: this.dataTimes,
                    axisLine: {
                        show: true,
                        lineStyle: { color: "rgb(232, 234, 238)", width: 1 }
                    },
                    axisLabel: {
                        textStyle: { color: "rgb(142, 149, 170)" }, show: true
                    }, 
                    splitLine: {
                        show: false,
                        lineStyle: { width: 1 }
                    },
                    axisTick: { show: false }
                },
                 yAxis: {
                    type: "value",
                    name: "(A)",
                    nameTextStyle: {
                        color: "rgb(142, 149, 170)"
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: "rgb(232, 234, 238)",
                            width: 1
                        }
                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: "rgb(142, 149, 170)"
                        }
                    },
                    splitArea: { show: false },
                    axisTick: { show: false },
                    splitLine: {
                        show: true,
                        lineStyle: { color: "rgb(232, 234, 238)" }
                    }
                },
                // yAxis: {
                //     type: "value",
                //     name: "(A)",
                //     nameTextStyle: {
                //         align: "right",
                //     },
                // },
                series: [
                    {
                        type: "line",
                        name: "漏电电流",
                        data: [45, 78, 79, 34, 56, 78, 34],
                        itemStyle: {
                            normal: {
                                color: '#3BECF2',
                                lineStyle: { color: "#3BECF2", width: 2 },
                                borderColor: "#FFFFFF",
                                borderWidth: 1,
                                // shadowColor: 'rgba(0, 0, 0, 0.32)',
                                // shadowBlur: 6
                            }
                        },
                        symbol: 'circle',
                        showSymbol: false,
                        symbolSize: 7
                    },
                    {
                        name: "A相电流",
                        type: "line",
                        // 测试数据
                        data: [56, 65, 67, 67, 56, 68, 89],
                        itemStyle: {
                            normal: {
                                color: '#FDDD00',
                                type: 'solid',
                                lineStyle: { type: "solid", color: "#FDDD00", width: 2 },
                                borderWidth: 1,
                                borderColor: "#FFFFFF",
                                // shadowColor: 'rgba(0, 0, 0, 0.32)',
                                // shadowBlur: 6
                            }
                        },
                        symbol: 'circle',
                        showSymbol: false,
                        symbolSize: 7
                    },
                    {
                        name: "B相电流",
                        type: "line",
                        data: [45, 38, 62, 51, 56, 71, 58],
                        itemStyle: {
                            normal: {
                                color: "#02E437",
                                lineStyle: { color: "#02E437", width: 2 },
                                borderWidth: 1,
                                borderColor: "#FFFFFF",
                                label: { show: false },
                                // shadowColor: 'rgba(0, 0, 0, 0.32)',
                                // shadowBlur: 6,
                            }
                        },
                        symbol: 'circle',
                        showSymbol: false,
                        symbolSize: 7
                    },
                    {
                        type: "line",
                        name: "C相电流",
                        data: [56, 56, 67, 34, 45, 23, 23],
                        itemStyle: {
                            normal: {
                                color: "#FF1C43",
                                lineStyle: { color: "#FF1C43", width: 2 },
                                borderColor: "#FFFFFF",
                                borderWidth: 1,
                                // shadowColor: 'rgba(0, 0, 0, 0.32)',
                                // shadowBlur: 6
                            }
                        },
                        symbol: 'circle',
                        showSymbol: false,
                        symbolSize: 7
                    }],
                // series: [
                //     {
                //         name: "漏电电流",
                //         type: "line",
                //         stack: "Total",
                //         data: this.electricDatas,
                //     },
                //     {
                //         name: "A相电流",
                //         type: "line",
                //         stack: "Total",
                //         data: this.electricDatasA,
                //     },
                //     {
                //         name: "B相电流",
                //         type: "line",
                //         stack: "Total",
                //         data: this.electricDatasB,
                //     },
                //     {
                //         name: "C相电流",
                //         type: "line",
                //         stack: "Total",
                //         data: this.electricDatasC,
                //     },
                // ],
                // color: ["#ff7f50", "#87cefa", "#da70d6", "#32cd32", "#6495ed", "#ff69b4", "#ba55d3", "#cd5c5c", "#ffa500", "#40e0d0", "#1e90ff", "#ff6347", "#7b68ee", "#00fa9a", "#ffd700", "#6699FF", "#ff6666", "#3cb371", "#b8860b", "#30e0e0"],
                grid: { x: 54 }
            };
            let clearOption = {
                tooltip: { trigger: "axis" },
                toolbox: {
                    show: false,
                    feature: {
                        mark: { show: true },
                        dataView: { show: true, readOnly: true },
                        magicType: { show: false, type: ["line", "bar"] },
                        restore: { show: true },
                        saveAsImage: { show: true }
                    },
                    calculable: true,
                },
                xAxis: {
                    type: "category",
                    boundaryGap: false,
                    data: ["-20", "0", "20", "40"],
                    axisTick: { show: false },
                    axisLine: { show: false },
                    splitLine: { show: false },
                    axisLabel: {
                        textStyle: { color: "rgb(142, 149, 170)" }
                    }
                },
                // xAxis: {
                //     type: "category",
                //     data: this.dataTimes
                // },
                yAxis: {
                    type: "value",
                    // name: "°C",
                    axisLine: { show: false },
                    axisLabel: {
                        textStyle: { color: "rgb(142, 149, 170)"}
                    },
                    splitLine: {
                        lineStyle: { color: "rgb(232, 234, 238)" }
                    }
                },
                // yAxis: {
                //     type: "value",
                //     name: "(mA)",
                //     nameTextStyle: {
                //         align: "right",
                //     },
                // },
                series: [
                    {
                        name: "-",
                        type: "line",
                        data: [11, 11, 15, 13],
                        symbolSize: 2,
                        itemStyle: {
                            normal: {
                                color: "rgb(59, 236, 242)",
                                lineStyle: { color: "rgb(59, 236, 242)" },
                                borderWidth: 2,
                                borderColor: "rgb(59, 236, 242)"
                            }
                        }
                    } ]
                // series: [
                //     {
                //         data: this.clearDatas,
                //         type: "line",
                //     },
                // ],
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