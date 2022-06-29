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
                <p class="tip">漏电电流最大</p>
                <div class="value">
                  <p class="num">{{ electricMax }}</p>
                  <p class="comp">mA</p>
                </div>
              </div>
            </div>
            <div class="average">
              <div class="icon second-icon"></div>
              <div class="text">
                <p class="tip">漏电电流平均值</p>
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
              </div>
              <div class="value">
                <p class="text">A相电流</p>
                <div class="bottom-value">
                  <p class="num">{{ electricA }}</p>
                  <p class="comp">A</p>
                </div>
              </div>
            </div>
            <div class="electric-B electric">
              <div class="tip">
                <div class="Ib icon"></div>
              </div>
              <div class="value">
                <p class="text">B相电流</p>
                <div class="bottom-value">
                  <p class="num">{{ electricB }}</p>
                  <p class="comp">A</p>
                </div>
              </div>
            </div>
            <div class="electric-C electric">
              <div class="tip">
                <div class="Ic icon"></div>
              </div>
              <div class="value">
                <p class="text">C相电流</p>
                <div class="bottom-value">
                  <p class="num">{{ electricC }}</p>
                  <p class="comp">A</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="data-right card-box right-unset">
          <div class="title">
            <div class="tip-color"></div>
            <h3>电压监测</h3>
          </div>
          <div class="card-content">
            <div class="electric-A electric">
              <div class="tip">
                <div class="Va icon"></div>
              </div>
              <div class="value">
                <p class="text">A相电压</p>
                <div class="bottom-value">
                  <p class="num">{{ voltageA }}</p>
                  <p class="comp">V</p>
                </div>
              </div>
            </div>
            <div class="electric-B electric">
              <div class="tip">
                <div class="Vb icon"></div>
              </div>
              <div class="value">
                <p class="text">B相电压</p>
                <div class="bottom-value">
                  <p class="num">{{ voltageB }}</p>
                  <p class="comp">V</p>
                </div>
              </div>
            </div>
            <div class="electric-C electric">
              <div class="tip">
                <div class="Vc icon"></div>
              </div>
              <div class="value">
                <p class="text">C相电压</p>
                <div class="bottom-value">
                  <p class="num">{{ voltageC }}</p>
                  <p class="comp">V</p>
                </div>
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
          <div id="electricCharts" style="height: 288px; width: 100%"></div>
          <div id="relativeCharts" style="height: 288px; width: 100%"></div>
        </div>
      </div>
    </div>
    <div class="right-layout">
      <div class="max-temperature card-box">
        <div class="title">
          <div class="tip-color"></div>
          <h3>接点最高温度</h3>
        </div>
        <div class="bar-charts-max">
          <div
            id="maxTemperatureCharts"
            style="height: 220px; width: 100%"
          ></div>
        </div>
      </div>
      <div class="environmental card-box">
        <div class="title">
          <div class="tip-color"></div>
          <h3>环境监测</h3>
        </div>
        <div class="bar-charts-environmental">
          <div id="temperatureCharts" style="height: 187px; width: 100%"></div>
          <div id="humidityCharts" style="height: 187px; width: 100%"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { GetDeviceData } from "../../../api/api";
// import { chartssize } from "../../../utils/fn";
export default {
  props: ["curveDev"],
  data() {
    return {
      //漏电电流最大
      electricMax: "",
      //漏电电流平均值
      average: "",
      //时间
      timeData: "",
      timeDatas: [],
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
      humidity: "",
    };
  },
  created() {
    //轮询数据
    this.timer = window.setInterval(() => {
      if (this.curveDev) {
        setTimeout(() => {
          this.getRealDevDatas(this.curveDev);
        }, 0);
      }
    }, 5000);
  },
  computed: {
    maxTemperatureWH() {
      debugger;
      // const w = document.querySelector(".bar-charts-max");
      return {
        width: 264 + "px",
        height: 100 + "%",
      };
    },
  },
  mounted() {
    window.addEventListener("resize", this.handleResize, false);
  },
  methods: {
    handleResize() {
      const _this = this;
      const timer = setTimeout(() => {
        _this.myElectricChart.resize();
        _this.myRelativeChart.resize();
        _this.myTemperatureCharts.resize();
        _this.myRelativeChartmyMaxTemperatureCharts.resize();
        _this.myRelativeChartmyHumidityCharts.resize();
      }, 500);
      // 清除定时器
      this.$once("hook:beforeDestroy", () => {
        setTimeout(timer);
      });
    },
    //请求设备实时数据
    async getRealDevDatas(params) {
      if (params) {
        let res = await GetDeviceData(params);
        if (res.data.code != 0) {
          this.$message.error("设备数据请求失败");
        } else {
          let data = res.data.data;
          this.electricMax = data.record[0].In_Max;
          this.average = data.record[0].In_Avg;
          this.timeData = data.record[0].time;
          this.electricA = data.record[0].Ia;
          this.electricB = data.record[0].Ib;
          this.electricC = data.record[0].Ic;
          this.voltageA = data.record[0].Ua;
          this.voltageB = data.record[0].Ub;
          this.voltageC = data.record[0].Uc;
          this.temperature = data.record[0].T;
          this.maxTemperature = data.record[0].Tn;
          this.humidity = data.record[0].H;
          if (this.timeDatas.length == 12) {
            this.timeDatas.shift();
          }
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
          this.timeDatas.push(data.record[0].time.substring(11));
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
      this.timeData = "";
      this.electricA = "";
      this.electricB = "";
      this.electricC = "";
      this.voltageA = "";
      this.voltageB = "";
      this.voltageC = "";
      this.timeDatas = [];
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
      const dom = document.querySelector(".line-charts");
      let electricCharts = document.getElementById("electricCharts");
      let relativeCharts = document.getElementById("relativeCharts");
      const h = dom.offsetHeight;
      const w = dom.offsetWidth;
      electricCharts.style.width = w + "px";
      electricCharts.style.height = h + "px";
      relativeCharts.style.width = w + "px";
      relativeCharts.style.height = h + "px";

      this.myElectricChart = echarts.init(electricCharts);
      this.myRelativeChart = echarts.init(relativeCharts);
      let electricOption = {
        tooltip: {
          trigger: "axis",
          show: false,
        },
        legend: {
          data: ["漏电电流"],
          x: "center",
          textStyle: {
            color: "rgb(153, 153, 153)",
            fontSize: 14,
          },
          borderWidth: 0,
          selectedMode: "multiple",
          y: "top",
          orient: "horizontal",
          itemWidth: 16,
        },
        toolbox: {
          show: false,
          feature: {
            mark: {
              show: true,
            },
            dataView: {
              show: true,
              readOnly: true,
            },
            magicType: {
              show: false,
              type: ["line", "bar"],
            },
            restore: {
              show: true,
            },
            saveAsImage: {
              show: true,
            },
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.timeDatas,
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgb(232, 234, 238)",
              width: 1,
            },
          },
          axisLabel: {
            textStyle: {
              color: "rgb(142, 149, 170)",
              fontSize: 12,
            },
            show: true,
          },
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
        yAxis: [
          {
            type: "value",
            name: "(mA)",
            nameTextStyle: {
              color: "rgb(142, 149, 170)",
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "rgb(232, 234, 238)",
                width: 1,
              },
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "rgb(142, 149, 170)",
              },
            },
            splitLine: {
              lineStyle: {
                color: "rgb(232, 234, 238)",
                width: 1,
              },
            },
            splitArea: {
              areaStyle: {
                type: "default",
              },
            },
          },
        ],
        series: [
          {
            data: this.electricDatas,
            type: "line",
            name: "漏电电流",
            itemStyle: {
              normal: {
                lineStyle: {
                  color: "rgb(59, 236, 242)",
                  width: 3,
                },
              },
            },
            symbolSize: 0,
          },
        ],
        calculable: true,
        grid: {
          x: 71,
          borderWidth: 1,
          borderColor: "rgb(232, 234, 238)",
        },
      };
      let relativeOption = {
        tooltip: {
          trigger: "axis",
          show: false,
        },
        legend: {
          // eslint-disable-next-line no-sparse-arrays
          data: ["A相电流", , "B相电流", "C相电流"],
          selectedMode: "multiple",
          x: "center",
          y: "top",
          textStyle: { color: "rgb(153, 153, 153)" },
          itemWidth: 8,
          itemHeighth: 8,
          padding: 10,
        },
        toolbox: {
          show: false,
          feature: {
            mark: {
              show: true,
            },
            dataView: {
              show: true,
              readOnly: true,
            },
            magicType: {
              show: false,
              type: ["line", "bar"],
            },
            restore: {
              show: true,
            },
            saveAsImage: {
              show: true,
            },
          },
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: this.timeDatas,
            axisLine: {
              show: true,
              lineStyle: {
                width: 1,
                color: "rgb(232, 234, 238)",
              },
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "rgb(142, 149, 170)",
                fontSize: 12,
              },
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "(A)",
            nameTextStyle: {
              color: "rgb(142, 149, 170)",
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "rgb(232, 234, 238)",
                width: 1,
              },
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "rgb(142, 149, 170)",
              },
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgb(232, 234, 238)",
                width: 1,
              },
            },
            splitArea: {
              areaStyle: {
                type: "default",
              },
            },
          },
        ],
        series: [
          {
            name: "A相电流",
            type: "line",
            data: this.electricDatasA,
            itemStyle: {
              normal: {
                color: "#FDDD00",
                type: "solid",
                lineStyle: {
                  type: "solid",
                  color: "#FDDD00",
                  width: 2,
                },
                borderWidth: 1,
                borderColor: "#FFFFFF",
                // shadowColor: 'rgba(0, 0, 0, 0.32)',
                // shadowBlur: 6
              },
            },
            symbol: "circle",
            showSymbol: false,
            symbolSize: 7,
          },
          {
            type: "line",
            name: "B相电流",
            data: this.electricDatasB,
            itemStyle: {
              normal: {
                color: "#02E437",
                type: "solid",
                lineStyle: { color: "#02E437", width: 2 },
                borderWidth: 1,
                borderColor: "#FFFFFF",
              },
            },
            symbol: "circle",
            showSymbol: false,
            symbolSize: 7,
          },
          {
            type: "line",
            name: "C相电流",
            data: this.electricDatasC,
            itemStyle: {
              normal: {
                color: "#FF1C43",
                type: "solid",
                lineStyle: { color: "#FF1C43", width: 2 },
                borderWidth: 1,
                borderColor: "#FFFFFF",
              },
            },
            symbol: "circle",
            showSymbol: false,
            symbolSize: 7,
          },
        ],
        calculable: true,
        grid: {
          x: 71,
          borderWidth: 1,
          borderColor: "rgb(232, 234, 238)",
        },
      };
      this.myElectricChart.setOption(electricOption);
      this.myRelativeChart.setOption(relativeOption);
    },
    //设置环境监测图表
    setEnvironmentalCharts() {
      const maxDom = document.querySelector(".bar-charts-max");
      const environmentalDom = document.querySelector(
        ".bar-charts-environmental"
      );
      let temperatureCharts = document.getElementById("temperatureCharts");
      let maxTemperatureCharts = document.getElementById(
        "maxTemperatureCharts"
      );
      let humidityCharts = document.getElementById("humidityCharts");
      const maxH = maxDom.offsetHeight;
      const maxW = maxDom.offsetWidth;
      const envH = environmentalDom.offsetHeight;
      const envW = environmentalDom.offsetWidth;
      maxTemperatureCharts.style.width = maxW + "px";
      maxTemperatureCharts.style.height = maxH - 20 + "px";
      temperatureCharts.style.width = envW + "px";
      temperatureCharts.style.height = envH / 2 + "px";
      humidityCharts.style.height = envH / 2 + "px";
      humidityCharts.style.width = envW + "px";
      this.myTemperatureCharts = echarts.init(temperatureCharts);
      this.myRelativeChartmyMaxTemperatureCharts =
        echarts.init(maxTemperatureCharts);
      this.myRelativeChartmyHumidityCharts = echarts.init(humidityCharts);
      let maxTemperatureOption = {
        tooltip: {
          trigger: "item",
        },
        title: {
          text: "环境温度",
          left: "center",
          bottom: 20,
          textStyle: {
            color: "#333333FF",
            fontSize: 13,
          },
        },
        series: [
          {
            name: "Pressure",
            type: "gauge",
            min: -40,
            max: 150,
            splitNumber: 19,
            colorBy: "series",
            detail: {
              formatter: "{value}",
            },
            axisLine: {
              show: true,
              lineStyle: {
                width: 10,
              },
            },
            progress: {
              show: true,
              width: 10,
              itemStyle: {
                color: "#0CD6B8FF",
              },
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "#7F9CD4FF",
              },
              length: 10,
              distance: 8,
            },
            axisTick: {
              show: true,
              length: 2,
              lineStyle: {
                color: "#AEC6F5FF",
              },
              distance: 3,
            },
            axisLabel: {
              show: true,
              distance: 15,
              fontSize: 7,
            },
            pointer: {
              show: false,
            },
            // eslint-disable-next-line no-dupe-keys
            detail: {
              formatter: "{value}℃",
              fontSize: 20,
              fontFamily: "font-demo",
              valueAnimation: true,
              width: "60%",
              lineHeight: 40,
              borderRadius: 8,
              offsetCenter: [0, "-1%"],
              fontWeight: "400",
              color: "#189E99FF",
            },
            data: [
              {
                value: this.maxTemperature,
              },
            ],
          },
        ],
      };
      let temperatureOption = {
        tooltip: {
          trigger: "item",
        },
        title: {
          text: "接点最高温度",
          left: "center",
          bottom: 20,
          textStyle: {
            color: "#333333FF",
            fontSize: 13,
          },
        },
        series: [
          {
            name: "Pressure",
            type: "gauge",
            min: -40,
            max: 150,
            splitNumber: 19,
            colorBy: "series",
            detail: {
              formatter: "{value}",
            },
            axisLine: {
              show: true,
              lineStyle: {
                width: 10,
              },
            },
            progress: {
              show: true,
              width: 10,
              itemStyle: {
                color: "#0CD6B8FF",
              },
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "#7F9CD4FF",
              },
              length: 10,
              distance: 8,
            },
            axisTick: {
              show: true,
              length: 2,
              lineStyle: {
                color: "#AEC6F5FF",
              },
              distance: 3,
            },
            axisLabel: {
              show: true,
              distance: 15,
              fontSize: 7,
            },
            pointer: {
              show: false,
            },
            // eslint-disable-next-line no-dupe-keys
            detail: {
              formatter: "{value}℃",
              fontSize: 20,
              fontFamily: "font-demo",
              valueAnimation: true,
              width: "60%",
              lineHeight: 40,
              borderRadius: 8,
              offsetCenter: [0, "-1%"],
              fontWeight: "400",
              color: "#189E99FF",
            },
            data: [
              {
                value: this.temperature,
              },
            ],
          },
        ],
      };
      let humidityOption = {
        tooltip: {
          trigger: "item",
        },
        title: {
          text: "环境湿度",
          left: "center",
          bottom: 20,
          textStyle: {
            color: "#333333FF",
            fontSize: 13,
          },
        },
        series: [
          {
            name: "Pressure",
            type: "gauge",
            min: -40,
            max: 150,
            splitNumber: 19,
            colorBy: "series",
            detail: {
              formatter: "{value}",
            },
            axisLine: {
              show: true,
              lineStyle: {
                width: 10,
              },
            },
            progress: {
              show: true,
              width: 10,
              itemStyle: {
                color: "#0CD6B8FF",
              },
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "#7F9CD4FF",
              },
              length: 10,
              distance: 8,
            },
            axisTick: {
              show: true,
              length: 2,
              lineStyle: {
                color: "#AEC6F5FF",
              },
              distance: 3,
            },
            axisLabel: {
              show: true,
              distance: 15,
              fontSize: 7,
            },
            pointer: {
              show: false,
            },
            // eslint-disable-next-line no-dupe-keys
            detail: {
              formatter: "{value}℃",
              fontSize: 20,
              fontFamily: "font-demo",
              valueAnimation: true,
              width: "60%",
              lineHeight: 40,
              borderRadius: 8,
              offsetCenter: [0, "-1%"],
              fontWeight: "400",
              color: "#189E99FF",
            },
            data: [
              {
                value: this.humidity,
              },
            ],
          },
        ],
      };
      this.myTemperatureCharts.setOption(temperatureOption);
      this.myRelativeChartmyMaxTemperatureCharts.setOption(
        maxTemperatureOption
      );
      this.myRelativeChartmyHumidityCharts.setOption(humidityOption);
    },
  },
  watch: {
    //请求组件数据
    curveDev: {
      immediate: true,
      handler(newVal) {
        this.$emit("requstStatus", true);
        this.rest();
        this.getRealDevDatas(newVal);
        setTimeout(() => {
          this.$emit("requstStatus", false);
        }, 500);
      },
    },
  },
  destroyed() {
    window.clearInterval(this.timer);
  },
};
</script>

<style lang="scss">
@import "./realTimeMonitoring.scss";
</style>
