<template>
  <div class="leakage-analysis">
    <date-pick-search @getTime="getTime"></date-pick-search>
    <div class="leakage-analysis-body">
      <div class="card-box">
        <div class="title">
          <div class="letf-tip">
            <div class="tip-color"></div>
            <h3>{{ type }}分析</h3>
          </div>
        </div>
        <div class="card-content params-content week-charts">
          <div id="weekCharts"></div>
        </div>
      </div>
      <div class="card-box">
        <div class="title">
          <div class="letf-tip">
            <div class="tip-color"></div>
            <h3>湿度-漏电</h3>
          </div>
        </div>
        <div class="card-content params-content humid-charts">
          <div id="humidityCharts"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GetDeviceHistoryData } from "../../../api/api";
import DatePickSearch from "../../../components/DatePickSearch.vue";
import * as echarts from "echarts";
export default {
  props: ["curveDev"],
  components: { DatePickSearch },
  data() {
    return {
      //开始时间 结束时间
      start_time: "",
      end_time: "",
      time_span_unit: "",
      time_span_number: "",
      //上方图标x轴数据
      xAxis: [
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
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
      ],
      xAxisName: "(小时)",
      //表类型
      type: "日",
      //上方表格
      topChartsStartTime: this.$moment().format("YYYY-MM") + "-01",
      topChartsEndTime: this.$moment().add(7, "days").format("YYYY-MM-DD"),
      topChartsSpanUnit: "hour",
      topChartsSpanNumber: 2,
      //湿度
      humidityStartTime: this.$moment().format("YYYY-MM") + "-01",
      humidityEndTime: this.$moment().add(30, "days").format("YYYY-MM") + "-01",
      humidityTimeSpanUnit: "day",
      humidityTimeSpanNumber: 1,
      //上方表格数据
      topChartsDatas: [],
      //湿度分析数据
      humidityData: [],
    };
  },
  methods: {
    //请求周分析数据
    async getWeekDatas(params) {
      if (params) {
        let res = await GetDeviceHistoryData(params);
        if (res.data.code != 0) {
          this.$message.error("周分析数据请求失败");
        } else {
          let data = res.data.data;
          let i = 6,
            j = 0;
          data.record.forEach((item) => {
            this.topChartsDatas.push(new Array(j, i, item.In_Avg));
            j++;
            if (j >= 12) {
              i--;
              j = 0;
            }
          });
          this.setWeekCharts();
        }
      }
    },
    //请求湿度分析数据
    async getHumidityDatas(params) {
      if (params) {
        let res = await GetDeviceHistoryData(params);
        if (res.data.code != 0) {
          this.$message.error("湿度-漏电数据请求失败");
        } else {
          let data = res.data.data;
          data.record.forEach((item) => {
            this.humidityData.push(new Array(item.H, item.In_Avg));
          });
          this.setHumidityCharts();
        }
      }
    },
    //初始化数据
    rest() {
      this.topChartsDatas = [];
      this.humidityData = [];
    },

    //周分析图表
    setWeekCharts() {
      let charts = document.getElementById("weekCharts");
      const dom = document.querySelector(".week-charts");
      const h = dom.offsetHeight;
      const w = dom.offsetWidth;
      charts.style.height = h + "px";
      charts.style.width = w + "px";
      let myChart = echarts.init(charts);
      let option = {
        tooltip: {
          trigger: "axis",
          showDelay: 0,
          axisPointer: {
            type: "cross",
            lineStyle: {
              type: "dashed",
              width: 1,
            },
          },
        },
        toolbox: {
          show: false,
          feature: {
            mark: {
              show: true,
            },
            dataZoom: {
              show: true,
            },
            dataView: {
              show: true,
              readOnly: true,
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
            data: this.xAxis,
            name: this.xAxisName,
            scale: true,
            splitArea: {
              show: false,
            },
            axisLabel: {
              textStyle: {
                color: "rgb(142, 149, 170)",
              },
            },
            axisLine: {
              show: false,
            },
            splitLine: {
              lineStyle: {
                color: "rgb(232, 234, 238)",
                width: 1,
              },
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "(次)",
            power: 1,
            splitNumber: 4,
            scale: true,
            axisLabel: {
              textStyle: {
                color: "rgb(142, 149, 170)",
              },
            },
            // axisLine: {
            //     show: false,
            //     lineStyle: {
            //         color: "rgb(232, 234, 238)",
            //         width: 1,
            //     },
            // },
          },
        ],
        series: [
          {
            name: "-",
            type: "scatter",
            symbol: "circle",
            data: this.topChartsDatas,
            itemStyle: {
              normal: {
                borderWidth: 0,
                color: "rgb(0, 255, 220)",
              },
            },
            symbolSize: function anonymous(value) {
              var radius = ((value[2] - 0) * 16) / 95 + 5;
              return Math.max(Math.round(radius), 1) || 1;
            },
          },
        ],
      };
      myChart.setOption(option);
    },

    //湿度-漏电图表
    setHumidityCharts() {
      let charts = document.getElementById("humidityCharts");
      const dom = document.querySelector(".humid-charts");
      const h = dom.offsetHeight;
      const w = dom.offsetWidth;
      charts.style.height = h + "px";
      charts.style.width = w + "px";
      let myChart = echarts.init(charts);
      let option = {
        tooltip: {
          trigger: "axis",
          showDelay: 0,
          axisPointer: {
            type: "cross",
            lineStyle: {
              type: "dashed",
              width: 1,
            },
          },
        },
        toolbox: {
          show: false,
          feature: {
            mark: {
              show: true,
            },
            dataZoom: {
              show: true,
            },
            dataView: {
              show: true,
              readOnly: true,
            },
            restore: {
              show: true,
            },
            saveAsImage: {
              show: true,
            },
          },
        },
        grid: {
          y2: 30,
          y: 30,
        },
        xAxis: [
          {
            type: "value",
            name: "%",
            power: 1,
            precision: 2,
            scale: true,
            axisLine: {
              show: false,
              lineStyle: {
                color: "#48b",
              },
            },
            splitLine: {
              lineStyle: {
                color: "rgb(232, 234, 238)",
                width: 1,
              },
            },
            axisLabel: {
              textStyle: {
                color: "rgb(142, 149, 170)",
              },
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "mA",
            power: 1,
            precision: 2,
            scale: true,
            axisLine: {
              show: false,
            },
            splitLine: {
              lineStyle: {
                color: "rgb(232, 234, 238)",
                width: 1,
              },
            },
            axisLabel: {
              textStyle: {
                color: "rgb(142, 149, 170)",
              },
            },
          },
        ],
        series: [
          {
            type: "scatter",
            data: this.humidityData,
            itemStyle: {
              normal: {
                color: "rgb(236, 112, 60)",
                borderWidth: 0,
              },
            },
            symbol: "circle",
            symbolSize: 2,
          },
        ],
      };
      myChart.setOption(option);
    },

    //切换日期请求数据
    getTime(time) {
      this.type = time.type;
      if (time.type == "日") {
        this.start_time = this.$moment(time.value).format("YYYY-MM-DD");
        this.end_time = this.$moment(time.value)
          .add(1, "days")
          .format("YYYY-MM-DD");
      } else if (time.type == "周") {
        this.start_time = this.$moment(time.value)
          .startOf("week")
          .add(1, "days")
          .format("YYYY-MM-DD");
        this.end_time = this.$moment(time.value)
          .endOf("week")
          .add(2, "days")
          .format("YYYY-MM-DD");
      } else if (time.type == "月") {
        this.start_time = this.$moment(time.value)
          .startOf("month")
          .format("YYYY-MM-DD");
        this.end_time = this.$moment(time.value)
          .add(1, "months")
          .startOf("month")
          .format("YYYY-MM-DD");
      } else if (time.type == "年") {
        this.start_time = this.$moment(time.value)
          .startOf("year")
          .format("YYYY-MM-DD");
        this.end_time = this.$moment(time.value)
          .add(1, "years")
          .startOf("year")
          .format("YYYY-MM-DD");
      }

      if (time.type == "日") {
        this.start_time = this.$moment(time.value).format("YYYY-MM-DD");
        this.end_time = this.$moment(time.value)
          .add(1, "days")
          .format("YYYY-MM-DD");
        this.time_span_unit = "day";
        this.time_span_number = 1;
        this.xAxis = [
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
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "24",
        ];
        this.xAxisName = "(小时)";
      } else if (time.type == "周") {
        this.start_time = this.$moment(time.value)
          .startOf("week")
          .add(1, "days")
          .format("YYYY-MM-DD");
        this.end_time = this.$moment(time.value)
          .endOf("week")
          .add(2, "days")
          .format("YYYY-MM-DD");
        this.time_span_unit = "week";
        this.time_span_number = 2;

        // 第一步: 获取今天是本周的第几天
        const weekOfday = this.$moment(time.value).format("E");
        // 第二步: 获取本周周一的日期
        const lastMonday = this.$moment(time.value)
          .subtract(weekOfday, "days")
          .format("YYYYMMDD");
        // 第三步: 获取本周周末的日期
        const lastSunday = this.$moment(time.value)
          .add(6 - weekOfday, "days")
          .format("YYYYMMDD");

        let arr = [];
        for (let i = lastMonday; i <= lastSunday; i++) {
          let j = String(i);
          arr.push(j.slice(4, 6) + "-" + j.slice(6, 8));
        }
        this.xAxis = arr;
        this.xAxisName = "(天)";
      } else if (time.type == "月") {
        this.start_time = this.$moment(time.value)
          .startOf("month")
          .format("YYYY-MM-DD");
        this.end_time = this.$moment(time.value)
          .add(1, "months")
          .startOf("month")
          .format("YYYY-MM-DD");
        this.time_span_unit = "mom";
        this.time_span_number = 1;
        const month = this.$moment(time.value).format("MM");
        const lastMonthDay = this.$moment(time.value)
          .endOf("month")
          .format("DD");
        if (lastMonthDay == "28") {
          this.xAxis = [
            month + "01" + "-" + month + "07",
            month + "08" + "-" + month + "14",
            month + "15" + "-" + month + "21",
            month + "22" + "-" + month + "28",
          ];
        } else {
          this.xAxis = [
            month + "01" + "-" + month + "07",
            month + "08" + "-" + month + "14",
            month + "15" + "-" + month + "21",
            month + "22" + "-" + month + "28",
            month + "29" + "-" + month + lastMonthDay,
          ];
        }
        this.xAxisName = "(周)";
      } else if (time.type == "年") {
        this.start_time = this.$moment(time.value)
          .startOf("year")
          .format("YYYY-MM-DD");
        this.end_time = this.$moment(time.value)
          .add(1, "years")
          .startOf("year")
          .format("YYYY-MM-DD");
        this.time_span_unit = "year";
        this.time_span_number = 1;
        this.xAxis = [
          "1月",
          "2月",
          "3月",
          "4月",
          "5月",
          "6月",
          "7月",
          "8月",
          "9月",
          "10月",
          "11月",
          "12月",
        ];
        this.xAxisName = "(月)";
      }
      this.$emit("requstStatus", true);
      let params = {
        dev: this.curveDev,
        start_time: this.start_time,
        end_time: this.end_time,
        time_span_unit: this.time_span_unit,
        time_span_number: this.time_span_number,
      };
      this.getWeekDatas(params);
      this.getHumidityDatas(params);
      setTimeout(() => {
        this.$emit("requstStatus", false);
      }, 500);
    },
  },
  watch: {
    //设备切换重新请求数据
    curveDev: {
      immediate: true,
      handler(newVal) {
        this.$emit("requstStatus", true);
        let weekParams = {
          dev: newVal,
          start_time: this.topChartsStartTime,
          end_time: this.topChartsEndTime,
          time_span_unit: this.topChartsSpanUnit,
          time_span_number: this.topChartsSpanNumber,
        };
        this.getWeekDatas(weekParams);
        let humidityParams = {
          dev: newVal,
          start_time: this.humidityStartTime,
          end_time: this.humidityEndTime,
          time_span_unit: this.humidityTimeSpanUnit,
          time_span_number: this.humidityTimeSpanNumber,
        };
        this.getHumidityDatas(humidityParams);
        setTimeout(() => {
          this.$emit("requstStatus", false);
        }, 500);
      },
    },
  },
};
</script>
<style lang="scss">
@import "./leakageAnalysis.scss";
</style>
