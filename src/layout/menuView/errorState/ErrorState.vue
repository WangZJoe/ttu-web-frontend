<template>
    <div class="error-state-book">
        <date-pick-search @getTime="getTime"></date-pick-search>
        <div class="layout">
            <div class="card-box card-table">
                <div class="table-body">
                    <el-table ref="eventTable" :data="tableData" border height="100%"
                              :header-cell-style="{background:'#FBFBFD', 'text-align':'center', color:'#333333'}"
                              :cell-style="{'text-align':'center', color:'#585858'}"
                              highlight-current-row @current-change="handleCurrentChange">
                    <el-table-column label="序号">
                        <template slot-scope="scope"> {{scope.$index+1}} </template>
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
import { GetAlarmEvent, GetErrorState } from "../../../api/api"

export default {
    components: { DatePickSearch },
    props: ["curveDev", "eventData"],
    data() {
        return {
            //表格数据
            tableData: [],
            //事件时间
            eventTime: "",
            //数据时间
            dataTimes: [],
            //漏电电流 数据
            leakageDatas: [],
            //x相电流 数据
            electricDatasA: [],
            electricDatasB: [],
            electricDatasC: [],

            //开始 结束时间
            start_time: this.$moment().format('YYYY-MM-DD'),
            // start_time: "2022-04-04",
            end_time: this.$moment().add(1, 'days').format('YYYY-MM-DD'),
            // end_time: "2022-04-24",
        };
    },
    methods: {
        //获取表格数据参数
        getTableDataParams(dev) {
            let params = {
                dev: dev,
                start_time: this.start_time,
                end_time: this.end_time,
            }
            this.rest();
            return params
        },
        //请求表格数据
        async getTableDatas(params) {
            if (params) {
                let res = await GetAlarmEvent(params);
                if (res.data.code != 0) {
                    this.$message.error('故障波形表格数据请求失败');
                } else {
                    let data = res.data.data.alarm;
                    this.tableData = data;
                    if(data!==undefined && data!==null && this.eventData<data.length) {
                        this.eventTime = data[this.eventData].time
                        this.$refs.eventTable.setCurrentRow(data[this.eventData]);
                    } else {
                        this.eventTime = data[0].time
                        this.$refs.eventTable.setCurrentRow(data[0]);
                    }
                }
            }
        },
        //获取图表数据参数
        getChartDataParams(dev, time) {
            let params = {
                dev: dev,
                timestamp: time
            }
            this.restChart();
            return params
        },
        //请求图表数据
        async getChartDatas(params) {
            if (params) {
                let res = await GetErrorState(params);
                if (res.data.code != 0) {
                    this.$message.error('故障波形图表数据请求失败');
                } else {
                    let data = res.data.data.waveform;
                    data.forEach(item => {
                        this.dataTimes.push(item.time);
                        this.leakageDatas.push(item.In);
                        this.electricDatasA.push(item.Ia);
                        this.electricDatasB.push(item.Ib);
                        this.electricDatasC.push(item.Ic);
                    });
                    this.setErrorStateCharts();
                }
            }
        },
        //初始化全部数据
        rest() {
            this.restTable();
            this.restChart();
        },
        //初始化表格数据
        restTable() {
            this.tableData = [];
        },
        //初始化图表数据
        restChart() {
            this.dataTimes = [];
            this.leakageDatas = [];
            this.electricDatasA = [];
            this.electricDatasB = [];
            this.electricDatasC = [];
        },
        //设置故障波形图表
        setErrorStateCharts() {
            let errorCharts = document.getElementById("errorCharts");
            let clearCharts = document.getElementById("clearCharts");

            let myErrorCharts = echarts.init(errorCharts);
            let myClearCharts = echarts.init(clearCharts);

            //计算y轴最大最小值
            let max1 = Math.max(this.calMax(this.electricDatasA), this.calMax(this.electricDatasB), this.calMax(this.electricDatasC))
            let min1 = Math.min(this.calMin(this.electricDatasA), this.calMin(this.electricDatasB), this.calMin(this.electricDatasC))
            let max2 = this.calMax(this.leakageDatas)
            let min2 = this.calMin(this.leakageDatas)
            let splitNum = 5

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
                    // itemWidth: 8,
                    itemHeight: 8
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
                    name: "(mS)",
                    nameTextStyle: {
                        color: "rgb(142, 149, 170)"
                    },
                    boundaryGap: false, 
                    // 数据
                    data: this.dataTimes, 
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
                 yAxis: [{
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
                    },
                    max:max1,
                    min:min1,
                    splitNumber: splitNum,
                    interval: (min1!=undefined && max1!=undefined)?((max1-min1)/splitNum):'auto'
                },
                {
                    type: "value", 
                    name: "(mA)", 
                    position: "right",
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
                    splitArea: {
                        show: false
                    }, 
                    axisTick: {
                        show: false
                    }, 
                    splitLine: {
                        show: true, 
                        lineStyle: {
                            color: "rgb(232, 234, 238)"
                        }
                    },
                    max:max2,
                    min:min2,
                    splitNumber: splitNum,
                    interval: (min2!=undefined && max2!=undefined)?((max2-min2)/splitNum):'auto'
                }],
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
                        data: this.leakageDatas,
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
                        symbolSize: 7,
                        yAxisIndex: 1,
                    },
                    {
                        name: "A相电流",
                        type: "line",
                        data: this.electricDatasA,
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
                        symbolSize: 7,
                        yAxisIndex: 0,
                    },
                    {
                        name: "B相电流",
                        type: "line",
                        data: this.electricDatasB,
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
                        symbolSize: 7,
                        yAxisIndex: 0,
                    },
                    {
                        type: "line",
                        name: "C相电流",
                        data: this.electricDatasC,
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
                        symbolSize: 7,
                        yAxisIndex: 0,
                    }],
                grid: { x: 54 }
            };
            let clearOption = {
                tooltip: { trigger: "axis" },
                // toolbox: {
                //     show: false,
                //     feature: {
                //         mark: { show: true },
                //         dataView: { show: true, readOnly: true },
                //         magicType: { show: false, type: ["line", "bar"] },
                //         restore: { show: true },
                //         saveAsImage: { show: true }
                //     },
                //     calculable: true,
                // },
                xAxis: {
                    type: "category",
                    name: "(mS)",
                    nameTextStyle: {
                        color: "rgb(142, 149, 170)"
                    },
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
        //计算最大值
        calMax(arr) {
            let max = Math.max(...arr);
            let log;
            if(max<0) {
                log = Math.log10(-max);
            } else if(max>0) {
                log = Math.log10(max);
            } else {
                log = 0;
            }
            log = Math.floor(log);
            log = Math.pow(10, log);
            //console.log(log);
            let maxint = Math.ceil(max / (0.95*log)); // 不让最高的值超过最上面的刻度
            let maxval = maxint * log; // 让显示的刻度是整数
            
            // 为了防止数据为0时，Y轴不显示，给个最大值
            if(maxval == 0){ maxval = 1 } 
            return maxval;
        },
        //计算最小值
        calMin(arr) {
            let min = Math.min(...arr);
            let log;
            if(min<0) {
                log = Math.log10(-min);
            } else if(min>0) {
                log = Math.log10(min);
            } else {
                log = 0;
            }
            log = Math.floor(log);
            log = Math.pow(10, log);
            let minint = Math.floor(min / (1.05*log));
            let minval = minint * log;//让显示的刻度是整数
            return minval;
        },
        //日期选择切换查询历史数据
        getTime(val) {
            this.start_time = val[0];
            this.end_time = val[1];
            this.$emit('requstStatus', true);
            let params = this.getTableDataParams(this.curveDev);
            this.getTableDatas(params);
            let paramsChart = this.getChartDataParams(this.curveDev, this.eventTime);
            this.getChartDatas(paramsChart);
            setTimeout(() => {
                this.$emit('requstStatus', false);
            }, 500);
        },
        //表格行切换查询故障波形数据
        handleCurrentChange(val) {
            this.currentRow = val;
            this.eventTime = val.time
            let params = this.getChartDataParams(this.curveDev, this.eventTime);
            this.getChartDatas(params)
        }
    },
    watch: {
        //设备切换重新请求数据
        curveDev: {
            immediate: true,
            handler(newVal) {
                this.$emit('requstStatus', true);
                let params = this.getTableDataParams(newVal);
                this.getTableDatas(params);
                let paramsChart = this.getChartDataParams(newVal, this.eventTime);
                this.getChartDatas(paramsChart);
                setTimeout(() => {
                    this.$emit('requstStatus', false);
                }, 500);
            }
        }
    }
};
</script>
<style lang="scss">
@import "./ErrorState.scss";
</style>