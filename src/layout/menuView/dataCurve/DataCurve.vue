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
                                <div class="Ia icon"></div>
                                <p class="text">A相电流</p>
                            </div>
                            <div class="value">
                                <p class="num">{{ electricA }}</p>
                                <p class="comp">A</p>
                            </div>
                        </div>
                        <div class="electric-B electric">
                            <div class="tip">
                                <div class="Ib icon"></div>
                                <p class="text">B相电流</p>
                            </div>
                            <div class="value">
                                <p class="num">{{ electricB }}</p>
                                <p class="comp">A</p>
                            </div>
                        </div>
                        <div class="electric-C electric">
                            <div class="tip">
                                <div class="Ic icon"></div>
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
                                <div class="Va icon"></div>
                                <p class="text">A相电压</p>
                            </div>
                            <div class="value">
                                <p class="num">{{ voltageA }}</p>
                                <p class="comp">V</p>
                            </div>
                        </div>
                        <div class="electric-B electric">
                            <div class="tip">
                                <div class="Vb icon"></div>
                                <p class="text">B相电压</p>
                            </div>
                            <div class="value">
                                <p class="num">{{ voltageB }}</p>
                                <p class="comp">V</p>
                            </div>
                        </div>
                        <div class="electric-C electric">
                            <div class="tip">
                                <div class="Vc icon"></div>
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
import { GetDeviceData } from "../../../api/api";
export default {
    props: ["curveDev"],
    data() {
        return {
            //漏电电流最大
            electricMax: "",
            //漏电电流平均值
            average: "",
            //X相电流
            electricA: "",
            electricB: "",
            electricC: "",
            //X相电压
            voltageA: "",
            voltageB: "",
            voltageC: "",
            //漏电电流图表数据
            electricDatas: [],
            //X相电流图表数据
            electricDatasA: [],
            electricDatasB: [],
            electricDatasC: [],
            //环境温度
            temperature: "",
            //接点最高温度
            maxTemperature: "",
            //环境湿度
            humidity: ""
        };
    },
    created() {
        //轮询数据
        this.timer = window.setInterval(() => {
            if (this.curveDev) {
                setTimeout(() => {
                    this.getRealDevDatas(this.curveDev);
                }, 0)
            }
        }, 5000)
    },
    methods: {
        //请求设备实时数据
        async getRealDevDatas(params) {
            if (params) {
                let res = await GetDeviceData(params);
                if (res.data.code != 0) {
                    this.$message.error('设备数据请求失败');
                } else {
                    let data = res.data.data;
                    this.electricMax = data.record[0].In_Max;
                    this.average = data.record[0].In_Avg;
                    this.electricA = data.record[0].Ia;
                    this.electricB = data.record[0].Ib;
                    this.electricC = data.record[0].Ic;
                    this.voltageA = data.record[0].Ua;
                    this.voltageB = data.record[0].Ub;
                    this.voltageC = data.record[0].Uc;
                    this.temperature = data.record[0].T;
                    this.maxTemperature = data.record[0].Tn;
                    this.humidity = data.record[0].H;
                    if (this.electricDatas.length == 12) {
                        this.electricDatas.shift();
                    }
                    if (this.electricDatasA.length == 12) {
                        this.electricDatasA.shift();
                    }
                    if (this.electricDatasB.length == 12) {
                        this.electricDatasB.shift();
                    }
                    if (this.electricDatasC.length == 12) {
                        this.electricDatasC.shift();
                    }
                    this.electricDatas.push(data.record[0].In_Max);
                    this.electricDatasA.push(data.record[0].Ia);
                    this.electricDatasB.push(data.record[0].Ib);
                    this.electricDatasC.push(data.record[0].Ic);
                    this.setRealTimeCharts();
                    this.setEnvironmentalCharts();
                }
            }
        },
        //初始化数据
        rest() {
            this.electricMax = "";
            this.average = "";
            this.electricA = "";
            this.electricB = "";
            this.electricC = "";
            this.voltageA = "";
            this.voltageB = "";
            this.voltageC = "";
            this.electricDatas = [];
            this.electricDatasA = [];
            this.electricDatasB = [];
            this.electricDatasC = [];
            this.temperature = "";
            this.maxTemperature = "";
            this.humidity = "";
        },
        //设置实时曲线图表
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
                        data: this.electricDatas,
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
            myElectricChart.setOption(electricOption);
            myRelativeChart.setOption(relativeOption);
        },
        //设置环境监测图表
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
                            show: false
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
                                value: this.temperature
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
                            show: false
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
                                value: this.maxTemperature
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
                            show: false
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
                                value: this.humidity
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
        //请求组件数据
        curveDev: {
            immediate: true,
            handler(newVal) {
                this.$emit('requstStatus', true);
                this.rest();
                this.getRealDevDatas(newVal);
                setTimeout(() => {
                    this.$emit('requstStatus', false);
                }, 500);
            }
        },
    },
    destroyed() {
        window.clearInterval(this.timer)
    }
};
</script>

<style lang="scss">
@import "./DataCurve.scss";
</style>
