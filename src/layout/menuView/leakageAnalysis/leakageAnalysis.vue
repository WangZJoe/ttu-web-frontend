<template>
    <div class="leakage-analysis">
        <div class="card-box">
            <div class="title">
                <div class="letf-tip">
                    <div class="tip-color"></div>
                    <h3>日分析</h3>
                </div>
                <el-date-picker v-model="analysisDayTime" type="week" placeholder="选择日期">
                </el-date-picker>
            </div>
            <div class="card-content">
                <div id="dayCharts"></div>
            </div>
        </div>
        <div class="card-box">
            <div class="title">
                <div class="letf-tip">
                    <div class="tip-color"></div>
                    <h3>周分析</h3>
                </div>
                <el-date-picker v-model="analysisWeekTime" type="week" placeholder="选择日期">
                </el-date-picker>
            </div>
            <div class="card-content params-content">
                <div id="weekCharts"></div>
            </div>
        </div>
        <div class="card-box">
            <div class="title">
                <div class="letf-tip">
                    <div class="tip-color"></div>
                    <h3>月分析</h3>
                </div>
                <el-date-picker v-model="analysisMonthTime" type="month" placeholder="选择日期">
                </el-date-picker>
            </div>
            <div class="card-content params-content">
                <div id="monthCharts"></div>
            </div>
        </div>
        <div class="card-box">
            <div class="title">
                <div class="letf-tip">
                    <div class="tip-color"></div>
                    <h3>湿度-漏电</h3>
                </div>
                <el-date-picker v-model="humidityTime" type="month" placeholder="选择日期">
                </el-date-picker>
            </div>
            <div class="card-content params-content">
                <div id="humidityCharts"></div>
            </div>
        </div>
    </div>
</template>

<script>
// import { GetDeviceHistoryData } from "../../../api/api"
import * as echarts from "echarts";
export default {
    props: ["curveDev"],
    data() {
        return {
            //表格数据
            tableData: [],
            //页面loading
            getLoading: false,
            pushLoading: false,
            //日期控件值
            analysisDayTime: "",
            analysisWeekTime: "",
            analysisMonthTime: "",
            humidityTime: "",


            //x相电流 时间
            electricDatasA: [],
            electricDatasB: [],
            electricDatasC: [],
            //x相电压 时间
            voltageDatasA: [],
            voltageDatasB: [],
            voltageDatasC: [],
        };
    },
    mounted() {
        this.setDayCharts();
        this.setWeekCharts();
        this.setMonthCharts();
        this.setHumidityCharts();
    },
    methods: {
        //参数读取
        getParams() {
            this.getLoading = true;
            setTimeout(() => {
                this.getLoading = false;
            }, 1000);
        },
        //上传
        pushParams() {
            this.pushLoading = true;
            setTimeout(() => {
                this.pushLoading = false;
            }, 1000);
        },

        //日分析图表设置
        setDayCharts() {
            let charts = document.getElementById("dayCharts");
            let myChart = echarts.init(charts);
            let option = {
                tooltip: {
                    trigger: "axis",
                    showDelay: 0,
                    axisPointer: {
                        type: "cross",
                        lineStyle: {
                            type: "dashed",
                            width: 1
                        }
                    }
                },
                toolbox: {
                    show: false,
                    feature: {
                        mark: {
                            show: true
                        },
                        dataZoom: {
                            show: true
                        },
                        dataView: {
                            show: true,
                            readOnly: true
                        },
                        restore: {
                            show: true
                        },
                        saveAsImage: {
                            show: true
                        }
                    }
                },
                xAxis: [
                    {
                        type: "value",
                        power: 1,
                        precision: 2,
                        scale: true,
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: "#48b"
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: "rgb(232, 234, 238)",
                                width: 1
                            }
                        },
                        axisLabel: {
                            textStyle: {
                                color: "rgb(142, 149, 170)"
                            }
                        }
                    }
                ],
                yAxis: [
                    {
                        type: "value",
                        power: 1,
                        precision: 2,
                        scale: true,
                        axisLine: {
                            show: false
                        },
                        splitLine: {
                            lineStyle: {
                                color: "rgb(232, 234, 238)",
                                width: 1
                            }
                        },
                        axisLabel: {
                            textStyle: {
                                color: "rgb(142, 149, 170)"
                            }
                        }
                    }
                ],
                series: [
                    {
                        name: "-",
                        type: "scatter",
                        data: [[161.2, 51.6], [172.9, 62.5], [153.4, 42], [160, 50], [147.2, 49.8], [168.2, 49.2], [175, 73.2], [157, 47.8], [167.6, 68.8], [159.5, 50.6], [175, 82.5],
                        [166.8, 57.2], [176.5, 87.8], [170.2, 72.8], [174, 54.5], [173, 59.8], [179.9, 67.3], [170.5, 67.8], [162.6, 61.4], [109, 61.4], [123, 61.4], [109, 61.4], [121, 61.4], [109,
                            61.4], [90, 56], [89, 61.4], [78, 325], [95, 67], [90, 45], [91, 34], [98, 90], [59, 56], [23, 78], [67, 78], [245, 231], [210, 361]],
                        itemStyle: {
                            normal: {
                                color: "rgb(236, 112, 60)",
                                borderWidth: 0
                            }
                        },
                        symbol: "circle",
                        symbolSize: 2
                    }
                ]
            };
            myChart.setOption(option);
        },

        //周分析图表
        setWeekCharts() {
            let charts = document.getElementById("weekCharts");
            let myChart = echarts.init(charts);
            let option = {
                tooltip: {
                    trigger: "axis",
                    showDelay: 0,
                    axisPointer: {
                        type: "cross",
                        lineStyle: {
                            type: "dashed",
                            width: 1
                        }
                    }
                },
                toolbox: {
                    show: false,
                    feature: {
                        mark: {
                            show: true
                        },
                        dataZoom: {
                            show: true
                        },
                        dataView: {
                            show: true,
                            readOnly: true
                        },
                        restore: {
                            show: true
                        },
                        saveAsImage: {
                            show: true
                        }
                    }
                },
                xAxis: [
                    {
                        type: "value",
                        power: 1,
                        splitNumber: 4,
                        scale: true,
                        splitArea: {
                            show: false
                        },
                        axisLabel: {
                            textStyle: {
                                color: "rgb(142, 149, 170)"
                            }
                        },
                        axisLine: {
                            show: false
                        },
                        splitLine: {
                            lineStyle: {
                                color: "rgb(232, 234, 238)",
                                width: 1
                            }
                        }
                    }
                ],
                yAxis: [
                    {
                        type: "value",
                        power: 1,
                        splitNumber: 4,
                        scale: true,
                        axisLabel: {
                            textStyle: {
                                color: "rgb(142, 149, 170)"
                            }
                        },
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: "rgb(232, 234, 238)",
                                width: 1
                            }
                        }
                    }
                ],
                series: [
                    {
                        name: "-",
                        type: "scatter",
                        symbol: "circle",
                        data: [[-39, 58, 25], [-93, -65, 24], [60, -17, 22], [54, 88, 27], [-29, 76, 76], [-45, 32, 89], [-69, 58, 63], [90, 34, 33], [-41, -5, 91], [58, -33, 77], [-79, -83, 69], [-99, -43, 80], [44, 8, 0], [-81, -19, 74], [-13, 40, 84], [60, -67, 82], [16, 14, 59], [-37, 36, 93], [0, 54, 23], [-61, 44, 26], [32, 60, 10], [90, 20, 21], [20, -91, 53], [32, -87, 73], [-85, 90, 74], [72, -1, 95], [-67, -59, 87], [-21, -29, 60]],
                        itemStyle: {
                            normal: {
                                borderWidth: 0,
                                color: "rgb(0, 255, 220)"
                            }
                        },
                        symbolSize: function anonymous(value
                        ) {
                            var radius = (value[2] - 0) * 16 / 95 + 5;
                            return Math.max(Math.round(radius), 1) || 1;
                        }
                    }
                ]
            };
            myChart.setOption(option);
        },

        //月分析图表
        setMonthCharts() {
            let charts = document.getElementById("monthCharts");
            let myChart = echarts.init(charts);
            let option = {
                tooltip: {
                    trigger: "axis",
                    showDelay: 0,
                    axisPointer: {
                        type: "cross",
                        lineStyle: {
                            type: "dashed",
                            width: 1
                        }
                    }
                },
                toolbox: {
                    show: false,
                    feature: {
                        mark: {
                            show: true
                        },
                        dataZoom: {
                            show: true
                        },
                        dataView: {
                            show: true,
                            readOnly: true
                        },
                        restore: {
                            show: true
                        },
                        saveAsImage: {
                            show: true
                        }
                    }
                },
                xAxis: [
                    {
                        type: "value",
                        power: 1,
                        splitNumber: 4,
                        scale: true,
                        splitArea: {
                            show: false
                        },
                        axisLabel: {
                            textStyle: {
                                color: "rgb(142, 149, 170)"
                            }
                        },
                        axisLine: {
                            show: false
                        },
                        splitLine: {
                            lineStyle: {
                                color: "rgb(232, 234, 238)",
                                width: 1
                            }
                        }
                    }
                ],
                yAxis: [
                    {
                        type: "value",
                        power: 1,
                        splitNumber: 4,
                        scale: true,
                        axisLabel: {
                            textStyle: {
                                color: "rgb(142, 149, 170)"
                            }
                        },
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: "rgb(232, 234, 238)",
                                width: 1
                            }
                        }
                    }
                ],
                series: [
                    {
                        name: "-",
                        type: "scatter",
                        symbol: "circle",
                        data: [[-39, 58, 25], [-93, -65, 24], [60, -17, 22], [54, 88, 27], [-29, 76, 76], [-45, 32, 89], [-69, 58, 63], [90, 34, 33], [-41, -5, 91], [58, -33, 77], [-79, -83, 69], [-99, -43, 80], [44, 8, 0], [-81, -19, 74], [-13, 40, 84], [60, -67, 82], [16, 14, 59], [-37, 36, 93], [0, 54, 23], [-61, 44, 26], [32, 60, 10], [90, 20, 21], [20, -91, 53], [32, -87, 73], [-85, 90, 74], [72, -1, 95], [-67, -59, 87], [-21, -29, 60]],
                        itemStyle: {
                            normal: {
                                borderWidth: 0,
                                color: "rgb(0, 255, 220)"
                            }
                        },
                        symbolSize: function anonymous(value
                        ) {
                            var radius = (value[2] - 0) * 16 / 95 + 5;
                            return Math.max(Math.round(radius), 1) || 1;
                        }
                    }
                ]
            };
            myChart.setOption(option);
        },

        //湿度-漏电图表
        setHumidityCharts() {
            let charts = document.getElementById("humidityCharts");
            let myChart = echarts.init(charts);
            let option = {
                tooltip: {
                    trigger: "axis",
                    showDelay: 0,
                    axisPointer: {
                        type: "cross",
                        lineStyle: {
                            type: "dashed",
                            width: 1
                        }
                    }
                },
                toolbox: {
                    show: false,
                    feature: {
                        mark: {
                            show: true
                        },
                        dataZoom: {
                            show: true
                        },
                        dataView: {
                            show: true,
                            readOnly: true
                        },
                        restore: {
                            show: true
                        },
                        saveAsImage: {
                            show: true
                        }
                    }
                },
                xAxis: [
                    {
                        type: "value",
                        power: 1,
                        precision: 2,
                        scale: true,
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: "#48b"
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: "rgb(232, 234, 238)",
                                width: 1
                            }
                        },
                        axisLabel: {
                            textStyle: {
                                color: "rgb(142, 149, 170)"
                            }
                        }
                    }
                ],
                yAxis: [
                    {
                        type: "value",
                        power: 1,
                        precision: 2,
                        scale: true,
                        axisLine: {
                            show: false
                        },
                        splitLine: {
                            lineStyle: {
                                color: "rgb(232, 234, 238)",
                                width: 1
                            }
                        },
                        axisLabel: {
                            textStyle: {
                                color: "rgb(142, 149, 170)"
                            }
                        }
                    }
                ],
                series: [
                    {
                        name: "-",
                        type: "scatter",
                        data: [[161.2, 51.6], [172.9, 62.5], [153.4, 42], [160, 50], [147.2, 49.8], [168.2, 49.2], [175, 73.2], [157, 47.8], [167.6, 68.8], [159.5, 50.6], [175, 82.5],
                        [166.8, 57.2], [176.5, 87.8], [170.2, 72.8], [174, 54.5], [173, 59.8], [179.9, 67.3], [170.5, 67.8], [162.6, 61.4], [109, 61.4], [123, 61.4], [109, 61.4], [121, 61.4], [109,
                            61.4], [90, 56], [89, 61.4], [78, 325], [95, 67], [90, 45], [91, 34], [98, 90], [59, 56], [23, 78], [67, 78], [245, 231], [210, 361]],
                        itemStyle: {
                            normal: {
                                color: "rgb(236, 112, 60)",
                                borderWidth: 0
                            }
                        },
                        symbol: "circle",
                        symbolSize: 2
                    }
                ]
            };
            myChart.setOption(option);
        }

        //获取历史设备数据参数
        // getHistoryDataParams(dev) {
        //     let params = {
        //         dev: dev,
        //         start_time: this.start_time,
        //         end_time: this.end_time,
        //         time_span_unit: this.time_span_unit,
        //         time_span_number: this.time_span_number,
        //     }
        //     this.rest();
        //     return params
        // },
        //请求历史台账数据
        // async getHistoryDatas(params) {
        //     if (params) {
        //         let res = await GetDeviceHistoryData(params);
        //         if (res.data.code != 0) {
        //             this.$message.error('设备数据请求失败');
        //             this.setDataCensusCharts();
        //         } else {
        //             let data = res.data.data;
        //             data.record.forEach(item => {
        //                 this.dataTimes.push(item.time);
        //                 this.leakageDatas.push(item.In_Avg);
        //                 this.electricDatasA.push(item.Ia);
        //                 this.electricDatasB.push(item.Ib);
        //                 this.electricDatasC.push(item.Ic);
        //                 this.voltageDatasA.push(item.Ua);
        //                 this.voltageDatasB.push(item.Ub);
        //                 this.voltageDatasC.push(item.Uc);
        //             });
        //             this.tableData = data.record;
        //             this.setDataCensusCharts();
        //         }
        //     }
        // },
        //初始化数据
        // rest() {
        //     this.tableData = [];
        //     this.leakageDatas = [];
        //     this.dataTimes = [];
        //     this.electricDatasA = [];
        //     this.electricDatasB = [];
        //     this.electricDatasC = [];
        //     this.voltageDatasA = [];
        //     this.voltageDatasB = [];
        //     this.voltageDatasC = [];
        // },
    },
    watch: {
        //设备切换重新请求数据
        curveDev: {
            immediate: true,
            handler(newVal) {
                this.$emit('requstStatus', true);
                // let params = this.getHistoryDataParams(newVal);
                // this.getHistoryDatas(params);
                setTimeout(() => {
                    this.$emit('requstStatus', false);
                }, 500);
            }
        },
    }
};
</script>
<style lang="scss">
@import "./leakageAnalysis.scss";
</style>