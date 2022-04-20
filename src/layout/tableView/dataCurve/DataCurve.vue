<template>
    <div class="real-time-monitoring">
        <div class="left-layout">
            <div class="data-show">
                <div class="data-left card-box">
                    <div class="title">
                        <div class="tip-color"></div>
                        <h3>漏电电流监测</h3>
                    </div>
                    <div class="card-content">
                        <div class="max">
                            <div class="icon first-icon"></div>
                            <div class="text">
                                <div class="tip">漏电电流最大</div>
                                <div class="value">
                                    <p class="num">{{ electricMax }}</p>
                                    <p class="comp">mA</p>
                                </div>
                            </div>
                        </div>
                        <div class="average">
                            <div class="icon second-icon"></div>
                            <div class="text">
                                <div class="tip">漏电电流平均值</div>
                                <div class="value">
                                    <p class="num">{{ average }}</p>
                                    <p class="comp">mA</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="data-center card-box">
                    <div class="title">
                        <div class="tip-color"></div>
                        <h3>电流监测</h3>
                    </div>
                    <div class="card-content">
                        <div class="electric-A electric">
                            <div class="tip">
                                <div class="icon"></div>
                                <p class="text">A相电流</p>
                            </div>
                            <div class="value">
                                <p class="num">{{ electricA }}</p>
                                <p class="comp">A</p>
                            </div>
                        </div>
                        <div class="electric-B electric">
                            <div class="tip">
                                <div class="icon"></div>
                                <p class="text">B相电流</p>
                            </div>
                            <div class="value">
                                <p class="num">{{ electricB }}</p>
                                <p class="comp">A</p>
                            </div>
                        </div>
                        <div class="electric-C electric">
                            <div class="tip">
                                <div class="icon"></div>
                                <p class="text">C相电流</p>
                            </div>
                            <div class="value">
                                <p class="num">{{ electricC }}</p>
                                <p class="comp">A</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="data-right card-box">
                    <div class="title">
                        <div class="tip-color"></div>
                        <h3>电压监测</h3>
                    </div>
                    <div class="card-content">
                        <div class="electric-A electric">
                            <div class="tip">
                                <div class="icon"></div>
                                <p class="text">A相电压</p>
                            </div>
                            <div class="value">
                                <p class="num">{{ voltageA }}</p>
                                <p class="comp">V</p>
                            </div>
                        </div>
                        <div class="electric-B electric">
                            <div class="tip">
                                <div class="icon"></div>
                                <p class="text">B相电压</p>
                            </div>
                            <div class="value">
                                <p class="num">{{ voltageB }}</p>
                                <p class="comp">V</p>
                            </div>
                        </div>
                        <div class="electric-C electric">
                            <div class="tip">
                                <div class="icon"></div>
                                <p class="text">C相电压</p>
                            </div>
                            <div class="value">
                                <p class="num">{{ voltageC }}</p>
                                <p class="comp">V</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="charts-show card-box">
                <div class="title">
                    <div class="tip-color"></div>
                    <h3>实时曲线</h3>
                </div>
                <div class="line-charts">
                    <div id="electricCharts" :style="{ height: '18rem', width: '30rem' }"></div>
                    <div id="relativeCharts" :style="{ height: '18rem', width: '30rem' }"></div>
                </div>
            </div>
        </div>
        <div class="right-layout">
            <div class="temperature card-box">
                <div class="title">
                    <div class="tip-color"></div>
                    <h3>环境监测</h3>
                </div>
                <div class="bar-charts">
                    <div id="temperatureCharts" :style="{ height: '12rem', width: '15rem' }"></div>
                    <div id="maxTemperatureCharts" :style="{ height: '12rem', width: '15rem' }"></div>
                    <div id="humidityCharts" :style="{ height: '12rem', width: '15rem' }"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import * as echarts from "echarts";
import { GetHistoryData, GetRealtime } from "../../../api/api";

export default {
    props: ["devData"],
    data() {
        const item = {
            date: "2016-05-02 12:00:00",
            name: "25.45",
        };
        return {
            //漏电电流最大
            electricMax: this.devData.record[0].In_Max,
            //漏电电流平均值
            average: this.devData.record[0].In_Avg,
            //X相电流
            electricA: this.devData.record[0].Ia,
            electricB: this.devData.record[0].Ib,
            electricC: this.devData.record[0].Ic,
            //X相电压
            voltageA: this.devData.record[0].Ua,
            voltageB: this.devData.record[0].Ub,
            voltageC: this.devData.record[0].Uc,
        };
    },
    mounted() {
        this.setRealTimeCharts();
        this.setEnvironmentalCharts();
    },
    methods: {
        getTableData: async function () {
            let historyData = await GetHistoryData({
                dev: this.currentDev,
                upperN: 10,
                frozen_type: "SchFroz",
                body: "-",
            });
            this.tableData.length = 0;
            this.tableData = historyData;
        },
        getRealtimeData: async function () {
            let RealtimeData = await GetRealtime({
                dev: this.currentDev,
                attribute: "-",
                totalCall: "1",
            });
            this.realtimeData.length = 0;
            this.realtimeData = RealtimeData;
        },
        setRealTimeCharts() {
            let electricCharts = document.getElementById("electricCharts");
            let relativeCharts = document.getElementById("relativeCharts");
            let myElectricChart = echarts.init(electricCharts);
            let myRelativeChart = echarts.init(relativeCharts);
            let electricOption = {
                title: {
                    left: "center",
                    text: "漏电电流",
                },
                xAxis: {
                    type: "category",
                    data: [
                        "01",
                        "02",
                        "03",
                        "04",
                        "05",
                        "06",
                        "07",
                        "08",
                        "09",
                        "10",
                        "11",
                        "12",
                    ],
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
                        data: [100, 150, 200, 250],
                        type: "line",
                    },
                ],
            };
            let relativeOption = {
                tooltip: {
                    trigger: "axis",
                },
                legend: {
                    data: ["A相电流", "B相电流", "C相电流"],
                },
                xAxis: {
                    type: "category",
                    data: [
                        "01",
                        "02",
                        "03",
                        "04",
                        "05",
                        "06",
                        "07",
                        "08",
                        "09",
                        "10",
                        "11",
                        "12",
                    ],
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
                        data: [120, 132, 101, 134, 90, 230, 210],
                    },
                    {
                        name: "B相电流",
                        type: "line",
                        stack: "Total",
                        data: [220, 182, 191, 234, 290, 330, 310],
                    },
                    {
                        name: "C相电流",
                        type: "line",
                        stack: "Total",
                        data: [150, 232, 201, 154, 190, 330, 410],
                    },
                ],
            };
            myElectricChart.setOption(electricOption);
            myRelativeChart.setOption(relativeOption);
        },
        setEnvironmentalCharts() {
            let temperatureCharts = document.getElementById("temperatureCharts");
            let maxTemperatureCharts = document.getElementById("maxTemperatureCharts");
            let humidityCharts = document.getElementById("humidityCharts");
            let myTemperatureCharts = echarts.init(temperatureCharts);
            let myMaxTemperatureCharts = echarts.init(maxTemperatureCharts);
            let myHumidityCharts = echarts.init(humidityCharts);

            let temperatureOption = {
                title: {
                    text: "环境温度",
                    left: 80,
                    bottom: 30
                },
                series: [
                    {
                        type: 'gauge',
                        center: ['50%', '65%'],
                        startAngle: 200,
                        endAngle: -20,
                        min: 0,
                        max: 250,
                        splitNumber: 5,
                        itemStyle: {
                            color: '#0CD6B8'
                        },
                        progress: {
                            show: true,
                            width: 30
                        },
                        pointer: {
                            show: true
                        },
                        axisLine: {
                            lineStyle: {
                                width: 30
                            }
                        },
                        axisTick: {
                            distance: -30,
                            splitNumber: 5,
                            lineStyle: {
                                width: 2,
                                color: '#7F9CD4'
                            }
                        },
                        splitLine: {
                            distance: -20,
                            length: 10,
                            lineStyle: {
                                width: 3,
                                color: '#7F9CD4'
                            }
                        },
                        axisLabel: {
                            distance: -20,
                            color: '#7F9CD4',
                            fontSize: 20
                        },
                        anchor: {
                            show: false
                        },
                        title: {
                            show: true
                        },
                        detail: {
                            valueAnimation: true,
                            width: '60%',
                            lineHeight: 40,
                            borderRadius: 8,
                            offsetCenter: [0, '-15%'],
                            fontSize: 20,
                            fontWeight: '400',
                            formatter: '{value} °C',
                            color: 'auto'
                        },
                        data: [
                            {
                                value: this.devData.record[0].T
                            }
                        ]
                    },
                ]
            };
            let maxTemperatureOption = {
                title: {
                    text: "接点最高温度",
                    left: 60,
                    bottom: 20
                },
                series: [
                    {
                        type: 'gauge',
                        center: ['50%', '65%'],
                        startAngle: 200,
                        endAngle: -20,
                        min: 0,
                        max: 250,
                        splitNumber: 5,
                        itemStyle: {
                            color: '#0CD6B8'
                        },
                        progress: {
                            show: true,
                            width: 30
                        },
                        pointer: {
                            show: true
                        },
                        axisLine: {
                            lineStyle: {
                                width: 30
                            }
                        },
                        axisTick: {
                            distance: -30,
                            splitNumber: 5,
                            lineStyle: {
                                width: 2,
                                color: '#7F9CD4'
                            }
                        },
                        splitLine: {
                            distance: -20,
                            length: 10,
                            lineStyle: {
                                width: 3,
                                color: '#7F9CD4'
                            }
                        },
                        axisLabel: {
                            distance: -20,
                            color: '#7F9CD4',
                            fontSize: 20
                        },
                        anchor: {
                            show: false
                        },
                        title: {
                            show: true
                        },
                        detail: {
                            valueAnimation: true,
                            width: '60%',
                            lineHeight: 40,
                            borderRadius: 8,
                            offsetCenter: [0, '-15%'],
                            fontSize: 20,
                            fontWeight: '400',
                            formatter: '{value} °C',
                            color: 'auto'
                        },
                        data: [
                            {
                                value: this.devData.record[0].Tn
                            }
                        ]
                    },
                ]
            };
            let humidityOption = {
                title: {
                    text: "环境湿度",
                    left: 80,
                    bottom: 20
                },
                series: [
                    {
                        type: 'gauge',
                        center: ['50%', '65%'],
                        startAngle: 200,
                        endAngle: -20,
                        min: 0,
                        max: 250,
                        splitNumber: 5,
                        itemStyle: {
                            color: '#0CD6B8'
                        },
                        progress: {
                            show: true,
                            width: 30
                        },
                        pointer: {
                            show: true
                        },
                        axisLine: {
                            lineStyle: {
                                width: 30
                            }
                        },
                        axisTick: {
                            distance: -30,
                            splitNumber: 5,
                            lineStyle: {
                                width: 2,
                                color: '#7F9CD4'
                            }
                        },
                        splitLine: {
                            distance: -20,
                            length: 10,
                            lineStyle: {
                                width: 3,
                                color: '#7F9CD4'
                            }
                        },
                        axisLabel: {
                            distance: -20,
                            color: '#7F9CD4',
                            fontSize: 20
                        },
                        anchor: {
                            show: false
                        },
                        title: {
                            show: true
                        },
                        detail: {
                            valueAnimation: true,
                            width: '60%',
                            lineHeight: 40,
                            borderRadius: 8,
                            offsetCenter: [0, '-15%'],
                            fontSize: 20,
                            fontWeight: '400',
                            formatter: '{value} °C',
                            color: 'auto'
                        },
                        data: [
                            {
                                value: this.devData.record[0].H
                            }
                        ]
                    },
                ]
            };
            myTemperatureCharts.setOption(temperatureOption);
            myMaxTemperatureCharts.setOption(maxTemperatureOption);
            myHumidityCharts.setOption(humidityOption);
        },
    },
    watch: {
        currentDev: async function (oldDev, newDev) {
            if (oldDev == newDev) {
                return;
            }
            await this.getTableData();
            await this.getRealtimeData();
        },
    },
};
</script>

<style lang="scss">
@import "./DataCurve.scss";
</style>
