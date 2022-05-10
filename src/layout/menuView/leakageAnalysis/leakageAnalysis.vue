<template>
    <div class="leakage-analysis">
        <div class="card-box">
            <div class="title">
                <div class="letf-tip">
                    <div class="tip-color"></div>
                    <h3>日分析</h3>
                </div>
                <el-date-picker @change="getDayTime" v-model="analysisDayStartTime" format="yyyy 第 WW 周" type="week" placeholder="选择日期">
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
                <el-date-picker @change="getWeekTime" v-model="analysisWeekStartTime" format="yyyy 第 WW 周" type="week" placeholder="选择日期">
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
                <el-date-picker @change="getMonthTime" v-model="analysisMonthStartTime" type="month" placeholder="选择日期">
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
                <el-date-picker @change="getHumidityTime" v-model="humidityStartTime" type="month" placeholder="选择日期">
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
            //周
            analysisWeekStartTime: this.$moment().format('YYYY-MM-DD'),
            analysisWeekEndTime: this.$moment().add(7, 'days').format('YYYY-MM-DD'),
            analysisWeekTimeSpanUnit: "min",
            analysisWeekTimeSpanNumber: 120,
            //月
            analysisMonthStartTime: this.$moment().format('YYYY-MM')+'-01',
            analysisMonthEndTime: this.$moment().add(30, 'days').format('YYYY-MM')+'-01',
            analysisMonthTimeSpanUnit: "day",
            analysisMonthTimeSpanNumber: 1,
            //湿度
            humidityStartTime: this.$moment().format('YYYY-MM')+'-01',
            humidityEndTime: this.$moment().add(30, 'days').format('YYYY-MM-DD')+'-01',
            humidityTimeSpanUnit: "day",
            humidityTimeSpanNumber: 1,
            //日分析数据
            analysisDayData: [],
            //周分析数据
            analysisWeekData: [],
            //月分析数据
            analysisMonthData: [],
            //湿度分析数据
            humidityData: []
        };
    },
    // mounted() {
    //     this.setDayCharts();
    //     this.setWeekCharts();
    //     this.setMonthCharts();
    //     this.setHumidityCharts();
    // },
    methods: {
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
                    let i = 6, j = 0;
                    data.record.forEach(item => {
                        this.analysisDayData.push(new Array(i,j,item.In_Avg));
                        j++;
                        if(j>=24) {
                            i--;
                            j=0;
                        }
                    });
                    this.setDayCharts();
                }
            }
        },
        //请求周分析数据
        async getWeekDatas(params) {
            if (params) {
                let res = await GetDeviceHistoryData(params);
                if (res.data.code != 0) {
                    this.$message.error('周分析数据请求失败');
                } else {
                    let data = res.data.data;
                    let i = 6, j = 0;
                    data.record.forEach(item => {
                        this.analysisWeekData.push(new Array(j,i,item.In_Avg));
                        j++;
                        if(j>=12) {
                            i--;
                            j=0;
                        }
                    });
                    this.setWeekCharts();
                }
            }
        },
        //请求月分析数据
        async getMonthDatas(params) {
            if (params) {
                let res = await GetDeviceHistoryData(params);
                if (res.data.code != 0) {
                    this.$message.error('月分析数据请求失败');
                } else {
                    let data = res.data.data;
                    data.record.forEach(item => {
                        this.analysisMonthData.push(item.In_Avg);
                    });
                    this.setMonthCharts();
                }
            }
        },
        //请求湿度分析数据
        async getHumidityDatas(params) {
            if (params) {
                let res = await GetDeviceHistoryData(params);
                if (res.data.code != 0) {
                    this.$message.error('湿度-漏电数据请求失败');
                } else {
                    let data = res.data.data;
                    data.record.forEach(item => {
                        this.humidityData.push(new Array(item.H, item.In_Avg));
                    });
                    this.setHumidityCharts();
                }
            }
        },
        //初始化数据
        rest() {
            this.analysisDayData = [];
            this.analysisWeekData = [];
            this.analysisMonthData = [];
            this.humidityData = [];
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
            const days = ['Sun','Sat','Fri','Thu','Wed','Tue','Mon'];
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
                        ' in ' +
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
                        return val[2]/10;
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
            let days = ['Sun','Sat','Fri','Thu','Wed','Tue','Mon'];
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
                    },
                    formatter: function (params) {
                        // console.log(params)
                        let tip = ""
                        params.forEach(item => {
                            tip+=days[parseInt(item.data[1])] + " "
                            tip+=item.data[2] + "<br>"
                        })
                        return tip;
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
                grid:{
                    y2:30,
                    y:0
	            },
                xAxis: [
                    {
                        type: 'category',
                        data: ['01', '03', '05', '07', '09', '11', '13', '15', '17', '19', '21', '23'],
                        // power: 1,
                        // splitNumber: 4,
                        // scale: true,
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
                        type: 'category',
                        data: days,
                        // power: 1,
                        // splitNumber: 4,
                        // scale: true,
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
                series: {
                    type: "scatter",
                    symbol: "circle",
                    data: this.analysisWeekData,
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
                    // cellSize: 40,
                    width: '80%',
                    // height: '80%',
                    top: 30,
                    bottom: 10,
                    left: '10%',
                    right: '10%',
                    range: this.analysisMonthStartTime.substring(0, 7),
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
                        data: this.getVirtulData(),
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
            let date = +echarts.number.parseDate(this.analysisMonthStartTime);
            let end = +echarts.number.parseDate(this.analysisMonthEndTime);
            let dayTime = 3600 * 24 * 1000;
            let data = [];
            let i = 0;
            for (let time = date; time < end; time += dayTime) {
                data.push([
                    echarts.format.formatTime('yyyy-MM-dd', time),
                    (i<this.analysisMonthData.length)?this.analysisMonthData[i]:0
                ]);
                i++;
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
                grid:{
                    y2:30,
                    y:30
	            },
                xAxis: [
                    {
                        type: "value",
                        name: '%',
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
                        name: 'mA',
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
                        type: "scatter",
                        data: this.humidityData,
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
        //日期选择切换查询日分析数据
        getDayTime(val) {
            // console.log(val.getFullYear())
            this.analysisDayStartTime = val.getFullYear() + '-' + (val.getMonth()+1) + '-' + val.getDate();
            val.setDate(val.getDate() + 7);
            this.analysisDayEndTime = val.getFullYear() + '-' + (val.getMonth()+1) + '-' + val.getDate();
            this.$emit('requstStatus', true);
            let params = this.getAnalysisDataParams(this.curveDev, this.analysisDayStartTime, this.analysisDayEndTime, this.analysisDayTimeSpanUnit, this.analysisDayTimeSpanNumber);
            this.getDayDatas(params);
            setTimeout(() => {
                this.$emit('requstStatus', false);
            }, 500);
        },
        //日期选择切换查询周分析数据
        getWeekTime(val) {
            this.analysisWeekStartTime = val.getFullYear() + '-' + (val.getMonth()+1) + '-' + val.getDate();
            val.setDate(val.getDate() + 7);
            this.analysisWeekEndTime = val.getFullYear() + '-' + (val.getMonth()+1) + '-' + val.getDate();
            this.$emit('requstStatus', true);
            let params = this.getAnalysisDataParams(this.curveDev, this.analysisWeekStartTime, this.analysisWeekEndTime, this.analysisWeekTimeSpanUnit, this.analysisWeekTimeSpanNumber);
            this.getWeekDatas(params);
            setTimeout(() => {
                this.$emit('requstStatus', false);
            }, 500);
        },
        //日期选择切换查询月分析数据
        getMonthTime(val) {
            this.analysisMonthStartTime = val.getFullYear() + '-' + this.getMonthFormat(val.getMonth()+1) + '-' + val.getDate();
            this.analysisMonthEndTime = val.getFullYear() + '-' + this.getMonthFormat(val.getMonth()+2) + '-' + val.getDate();
            this.$emit('requstStatus', true);
            let params = this.getAnalysisDataParams(this.curveDev, this.analysisMonthStartTime, this.analysisMonthEndTime, this.analysisMonthTimeSpanUnit, this.analysisMonthTimeSpanNumber);
            this.getMonthDatas(params);
            setTimeout(() => {
                this.$emit('requstStatus', false);
            }, 500);
        },
        //日期选择切换查询湿度-漏电数据
        getHumidityTime(val) {
            this.humidityStartTime = val.getFullYear() + '-' + this.getMonthFormat(val.getMonth()+1) + '-' + val.getDate();
            this.humidityEndTime = val.getFullYear() + '-' + this.getMonthFormat(val.getMonth()+2) + '-' + val.getDate();
            this.$emit('requstStatus', true);
            let params = this.getAnalysisDataParams(this.curveDev, this.humidityStartTime, this.humidityEndTime, this.humidityTimeSpanUnit, this.humidityTimeSpanNumber);
            this.getHumidityDatas(params);
            setTimeout(() => {
                this.$emit('requstStatus', false);
            }, 500);
        },
        //返回月份
        getMonthFormat(val) {
            if((val+"").length===1) {
                return "0"+val;
            } else {
                return val;
            }
        }
    },
    watch: {
        //设备切换重新请求数据
        curveDev: {
            immediate: true,
            handler(newVal) {
                this.$emit('requstStatus', true);
                let dayParams = this.getAnalysisDataParams(newVal, this.analysisDayStartTime, this.analysisDayEndTime, this.analysisDayTimeSpanUnit, this.analysisDayTimeSpanNumber);
                this.getDayDatas(dayParams);
                let weekParams = this.getAnalysisDataParams(newVal, this.analysisWeekStartTime, this.analysisWeekEndTime, this.analysisWeekTimeSpanUnit, this.analysisWeekTimeSpanNumber);
                this.getWeekDatas(weekParams);
                let monthParams = this.getAnalysisDataParams(newVal, this.analysisMonthStartTime, this.analysisMonthEndTime, this.analysisMonthTimeSpanUnit, this.analysisMonthTimeSpanNumber);
                this.getMonthDatas(monthParams);
                let humidityParams = this.getAnalysisDataParams(newVal, this.humidityStartTime, this.humidityEndTime, this.humidityTimeSpanUnit, this.humidityTimeSpanNumber);
                this.getHumidityDatas(humidityParams);
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