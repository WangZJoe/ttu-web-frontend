<template>
    <div class="leakage-analysis">
        <div class="card-box">
            <div class="title">
                <div class="letf-tip">
                    <div class="tip-color"></div>
                    <h3>日分析</h3>
                </div>
                <el-date-picker v-model="analysisDayStartTime" type="week" placeholder="选择日期">
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
import { GetDeviceHistoryData } from "../../../api/api"
import * as echarts from "echarts";
export default {
    props: ["curveDev"],
    data() {
        return {
            //页面loading
            getLoading: false,
            pushLoading: false,
            //日期控件值
            //日
            analysisDayStartTime: this.$moment().format('YYYY-MM-DD'),
            analysisDayEndTime: this.$moment().add(7, 'days').format('YYYY-MM-DD'),
            analysisDayTimeSpanUnit: "min",
            analysisDayTimeSpanNumber: 60,
            //
            analysisWeekTime: "",
            analysisMonthTime: "",
            humidityTime: "",
            //日分析数据
            analysisDayData: [],
            //周分析数据
            //月分析数据
            //湿度分析数据
        };
    },
    // mounted() {
    //     this.setDayCharts();
    //     this.setWeekCharts();
    //     this.setMonthCharts();
    //     this.setHumidityCharts();
    // },
    methods: {
        // //参数读取
        // getParams() {
        //     this.getLoading = true;
        //     setTimeout(() => {
        //         this.getLoading = false;
        //     }, 1000);
        // },
        // //上传
        // pushParams() {
        //     this.pushLoading = true;
        //     setTimeout(() => {
        //         this.pushLoading = false;
        //     }, 1000);
        // },

        //获取历史设备数据分析参数
        getAnalysisDataParams(dev, start_time, end_time, time_span_unit, time_span_number) {
            let params = {
                dev: dev,
                start_time: start_time,
                end_time: end_time,
                time_span_unit: time_span_unit,
                time_span_number: time_span_number,
            }
            this.rest();
            return params
        },
        //请求日分析数据
        async getDayDatas(params) {
            if (params) {
                let res = await GetDeviceHistoryData(params);
                if (res.data.code != 0) {
                    this.$message.error('日分析数据请求失败');
                } else {
                    let data = res.data.data;
                    let i = 0, j = 0;
                    data.record.forEach(item => {
                        this.analysisDayData.push(new Array(i,j,item.In_Avg));
                        j++;
                        if(j>=24) {
                            i++;
                            j=0;
                        }
                    });
                    // console.log(this.analysisDayData)
                    this.setDayCharts();
                }
            }
        },
        //请求日分析数据
        async getWeekDatas(params) {
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
        //请求月分析数据
        async getMonthDatas(params) {
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
            // //日期控件值
            // analysisDayStartTime = "";
            // analysisDayEndTime = "";
            // analysisWeekTime = "";
            // analysisMonthTime = "";
            // humidityTime = "";
            //日分析数据
            this.analysisDayData = [];
        },

        //日分析图表设置
        setDayCharts() {
            let charts = document.getElementById("dayCharts");
            let myChart = echarts.init(charts);
            // prettier-ignore
            const hours = [
                '12a', '1a', '2a', '3a', '4a', '5a', '6a',
                '7a', '8a', '9a', '10a', '11a',
                '12p', '1p', '2p', '3p', '4p', '5p',
                '6p', '7p', '8p', '9p', '10p', '11p'
            ];
            // prettier-ignore
            const days = [
                'Saturday', 'Friday', 'Thursday',
                'Wednesday', 'Tuesday', 'Monday', 'Sunday'
            ];
            // prettier-ignore
            const data = this.analysisDayData;
            let option = {
            // legend: {
            //     data: ['Punch Card'],
            //     left: 'right'
            // },
            polar: {},
            tooltip: {
                formatter: function (params) {
                return (
                    params.value[2] +
                    ' commits in ' +
                    hours[params.value[1]] +
                    ' of ' +
                    days[params.value[0]]
                );
                }
            },
            angleAxis: {
                type: 'category',
                data: hours,
                boundaryGap: false,
                splitLine: {
                    show: true
                },
                axisLine: {
                    show: false,
                },
                axisLabel: {
                    textStyle: { color: "#8E95AA", weight:400, size:12 }, show: true
                }, 
            },
            radiusAxis: {
                type: 'category',
                data: days,
                axisLine: {
                    show: false
                },
                axisLabel: {
                    rotate: 45,
                    textStyle: { color: "#8E95AA", weight:400, size:5 },
                    show: true
                }
            },
            series: [
                {
                    name: 'Punch Card',
                    type: 'scatter',
                    coordinateSystem: 'polar',
                    symbolSize: function (val) {
                        return val[2] * 2;
                    },
                    data: data,
                    animationDelay: function (idx) {
                        return idx * 5;
                    },
                    itemStyle: {
                        normal: {
                            color: "#00FFDC",
                            borderWidth: 0
                        }
                    },
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
                    position: 'top'
                },
                calendar: {
                    orient: 'vertical',
                    yearLabel: {
                        show: false
                    },
                    monthLabel: {
                        show:false,
                        nameMap: 'cn',
                        margin: 20,
                        color: "#8E95AA"
                    },
                    dayLabel: {
                        firstDay: 1,
                        nameMap: 'ZH',
                        color: "#8E95AA"
                    },
                    cellSize: 40,
                    range: '2017-02',
                    splitLine: {
                        lineStyle: {color: "#E8EAEE"}
                    }
                },
                series: [
                    {
                        type: 'scatter',
                        coordinateSystem: 'calendar',
                        symbolSize: function (val) {
                            return val[1] / 60;
                        },
                        data: this.getVirtulData('2017'),
                        itemStyle: {
                            normal: {
                                color: '#01BDBF',
                            }
                        },
                    }
                ]
                };
            myChart.setOption(option);
        },
        getVirtulData(year) {
            year = year || '2017';
            let date = +echarts.number.parseDate(year + '-01-01');
            let end = +echarts.number.parseDate(+year + 1 + '-01-01');
            let dayTime = 3600 * 24 * 1000;
            let data = [];
            for (let time = date; time < end; time += dayTime) {
                data.push([
                echarts.format.formatTime('yyyy-MM-dd', time),
                Math.floor(Math.random() * 1000)
                ]);
            }
            return data;
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
    },
    watch: {
        //设备切换重新请求数据
        curveDev: {
            immediate: true,
            handler(newVal) {
                this.$emit('requstStatus', true);
                let params = this.getAnalysisDataParams(newVal, this.analysisDayStartTime, this.analysisDayEndTime, this.analysisDayTimeSpanUnit, this.analysisDayTimeSpanNumber);
                this.getDayDatas(params);
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