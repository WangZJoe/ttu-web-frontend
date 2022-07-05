<template>
  <div class="history-standing-book">
    <date-pick-search @getTime="getTime"></date-pick-search>
    <div class="top-charts card-box">
      <div class="title">
        <div class="tip-color"></div>
        <h3>数据统计</h3>
      </div>
      <div class="card-content row-charts">
        <div class="full" @click="full"></div>
        <!-- <div id="leakageCharts" :style="{ height: '14rem'}"></div> -->
        <div id="electricCharts" :style="{ height: '14rem' }"></div>
        <div id="voltageCharts" :style="{ height: '14rem' }"></div>
      </div>
    </div>
    <div class="table-body card-box">
      <div class="title">
        <div class="tip-color"></div>
        <h3>历史数据</h3>
      </div>
      <div class="card-content table-content">
        <el-table
          :data="showData"
          border
          height="100%"
          :header-cell-style="{
            background: '#FBFBFD',
            'text-align': 'center',
            color: '#333333',
          }"
          :row-class-name="tableRowClassName"
          @row-click="rowClick"
          :row-style="selectedRowStyle"
          :cell-style="{ 'text-align': 'center', color: '#585858' }"
        >
          <el-table-column prop="time" label="时间" min-width="16%">
          </el-table-column>
          <el-table-column prop="In_Avg" label="In Avg(mA)" min-width="12%">
          </el-table-column>
          <el-table-column prop="In_Max" label="In Max(mA)" min-width="12%">
          </el-table-column>
          <el-table-column prop="Ia" label="Ia(A)" min-width="7%">
          </el-table-column>
          <el-table-column prop="Ib" label="Ib(A)" min-width="7%">
          </el-table-column>
          <el-table-column prop="Ic" label="Ic(A)" min-width="7%">
          </el-table-column>
          <el-table-column prop="Ua" label="Ua(V)" min-width="7%">
          </el-table-column>
          <el-table-column prop="Ub" label="Ub(V)" min-width="7%">
          </el-table-column>
          <el-table-column prop="Uc" label="Uc(V)" min-width="7%">
          </el-table-column>
          <el-table-column prop="In_Max" label="Tn(°C)" min-width="7%">
          </el-table-column>
          <el-table-column prop="In_Max" label="T(°C)" min-width="7%">
          </el-table-column>
          <el-table-column prop="In_Max" label="H(%rh)" min-width="10%">
          </el-table-column>
        </el-table>
      </div>
      <pagination
        :currentPage="currentPage"
        :pagerCount="tableData.length"
        :pageSize="pageSize"
        @changePager="changePager"
      ></pagination>
    </div>
    <el-dialog
      title="三相电流及漏电电流统计"
      :visible.sync="dialogVisible"
      width="75%"
      top="10vh"
      @open="open"
    >
      <span slot="footer" class="dialog-footer">
        <div id="dialogCharts" style="width: 100%; height: 70vh"></div>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as echarts from "echarts";
import DatePickSearch from "../../../components/DatePickSearch.vue";
import { GetDeviceHistoryData } from "../../../api/api";
import Pagination from "../../../components/ThePagination.vue";
import Vue from "vue";
import Plugin from "v-fit-columns";
Vue.use(Plugin);
export default {
  components: { DatePickSearch, Pagination },
  props: ["curveDev"],
  data() {
    return {
      //表格数据
      tableData: [],
      //dialog
      dialogVisible: false,
      //表格行索引值
      getRowIndex: null,
      //展示数据
      showData: [],
      //表格当前页面
      currentPage: 1,
      //表格大小
      pageSize: 5,
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
      start_time: this.$moment().format("YYYY-MM-DD"),
      end_time: this.$moment().add(1, "days").format("YYYY-MM-DD"),
      //间隔周期 间隔数
      time_span_unit: "min",
      time_span_number: 15,
    };
  },
  methods: {
    //图表全屏
    full() {
      this.dialogVisible = true;
    },
    open() {
      this.$nextTick(() => {
        this.setDialogCharts();
      });
    },
    //设置dialog图表
    setDialogCharts() {
      let charts = document.getElementById("dialogCharts");
      let myCharts = echarts.init(charts);
      //计算y轴最大最小值
      let max1 = Math.max(
        this.calMax(this.electricDatasA),
        this.calMax(this.electricDatasB),
        this.calMax(this.electricDatasC)
      );
      let min1 = Math.min(
        this.calMin(this.electricDatasA),
        this.calMin(this.electricDatasB),
        this.calMin(this.electricDatasC)
      );
      let max2 = this.calMax(this.leakageDatas);
      let min2 = this.calMin(this.leakageDatas);
      let splitNum = 5;
      let option = {
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["A相电流", "B相电流", "C相电流", "漏电电流"],
          selectedMode: "multiple",
          x: "center",
          y: "top",
          textStyle: {
            color: "rgb(153, 153, 153)",
          },
          itemWidth: 8,
          itemHeighth: 8,
          borderColor: "rgb(204, 204, 204)",
          padding: 10,
        },
        toolbox: {
          show: true,
          feature: {
            myTool1: {
              show: true,
              title: "全屏",
              icon: "src/assets/img/full-defalut.png",
              onclick: function () {
                alert("full");
              },
            },
          },
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            name: "(小时)",
            boundaryGap: false,
            data: this.dataTimes,
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
              textStyle: {
                color: "rgb(142, 149, 170)",
              },
              show: true,
            },
            splitLine: {
              show: false,
              lineStyle: {
                width: 1,
              },
            },
            axisTick: {
              show: false,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "(A)",
            position: "left",
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
            splitArea: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgb(232, 234, 238)",
              },
            },
            max: max1,
            min: min1,
            splitNumber: splitNum,
            interval:
              min1 != undefined && max1 != undefined
                ? (max1 - min1) / splitNum
                : "auto",
          },
          {
            type: "value",
            name: "(mA)",
            position: "right",
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
            splitArea: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgb(232, 234, 238)",
              },
            },
            max: max2,
            min: min2,
            splitNumber: splitNum,
            interval:
              min2 != undefined && max2 != undefined
                ? (max2 - min2) / splitNum
                : "auto",
          },
        ],
        series: [
          {
            name: "A相电流",
            type: "line",
            yAxisIndex: 0,
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
              },
            },
            symbol: "circle",
            showSymbol: false,
            symbolSize: 7,
          },
          {
            name: "B相电流",
            type: "line",
            yAxisIndex: 0,
            data: this.electricDatasB,
            itemStyle: {
              normal: {
                color: "#02E437",
                lineStyle: { color: "#02E437", width: 2 },
                borderWidth: 1,
                borderColor: "#FFFFFF",
                label: { show: false },
              },
            },
            symbol: "circle",
            showSymbol: false,
            symbolSize: 7,
          },
          {
            type: "line",
            name: "C相电流",
            yAxisIndex: 0,
            data: this.electricDatasC,
            itemStyle: {
              normal: {
                color: "#FF1C43",
                lineStyle: { color: "#FF1C43", width: 2 },
                borderColor: "#FFFFFF",
                borderWidth: 1,
              },
            },
            symbol: "circle",
            showSymbol: false,
            symbolSize: 7,
          },
          {
            type: "line",
            name: "漏电电流",
            yAxisIndex: 1,
            data: this.leakageDatas,
            itemStyle: {
              normal: {
                color: "#3BECF2",
                lineStyle: { color: "#3BECF2", width: 2 },
                borderColor: "#FFFFFF",
                borderWidth: 1,
              },
            },
            symbol: "circle",
            showSymbol: false,
            symbolSize: 7,
          },
        ],
        grid: {
          x: 54,
        },
      };
      myCharts.setOption(option);
    },
    tableRowClassName({ row, rowIndex }) {
      row.rowIndex = rowIndex;
    },
    // 行点击事件，这里获取到的行对象(row)是没有index属性的，索引值是初始化添加进去的
    rowClick(row) {
      this.getRowIndex = row.rowIndex;
    },
    // 设置行对象(row)的样式(style)，只在文本显示时才有效果
    // eslint-disable-next-line no-unused-vars
    selectedRowStyle({ _row, rowIndex }) {
      if (this.getRowIndex === rowIndex) {
        return {
          "background-color": "#eff6f5",
        };
      }
    },
    //获取历史设备数据参数
    getHistoryDataParams(dev) {
      let params = {
        dev: dev,
        start_time: this.start_time,
        end_time: this.end_time,
        time_span_unit: this.time_span_unit,
        time_span_number: this.time_span_number,
      };
      this.rest();
      return params;
    },
    //请求历史台账数据
    async getHistoryDatas(params) {
      if (params) {
        let res = await GetDeviceHistoryData(params);
        if (res.data.code != 0) {
          this.$message.error("设备数据请求失败");
          this.setDataCensusCharts();
        } else {
          let data = res.data.data;
          data.record.forEach((item) => {
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
          this.showData = this.tableData.slice(0, this.pageSize);
        }
      }
    },
    //初始化数据
    rest() {
      this.tableData = [];
      this.showData = [];
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
      const dom = document.querySelector(".row-charts");
      let electricCharts = document.getElementById("electricCharts");
      let voltageCharts = document.getElementById("voltageCharts");
      const h = dom.offsetHeight;
      const w = dom.offsetWidth;
      electricCharts.style.height = h + "px";
      electricCharts.style.width = w / 2 + "px";
      voltageCharts.style.height = h + "px";
      voltageCharts.style.width = w / 2 + "px";
      let myElectricCharts = echarts.init(electricCharts);
      let myVoltageCharts = echarts.init(voltageCharts);

      //计算y轴最大最小值
      let max1 = Math.max(
        this.calMax(this.electricDatasA),
        this.calMax(this.electricDatasB),
        this.calMax(this.electricDatasC)
      );
      let min1 = Math.min(
        this.calMin(this.electricDatasA),
        this.calMin(this.electricDatasB),
        this.calMin(this.electricDatasC)
      );
      let max2 = this.calMax(this.leakageDatas);
      let min2 = this.calMin(this.leakageDatas);
      let splitNum = 5;
      let electricOption = {
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["A相电流", "B相电流", "C相电流", "漏电电流"],
          selectedMode: "multiple",
          x: "center",
          y: "top",
          textStyle: {
            color: "rgb(153, 153, 153)",
          },
          itemWidth: 8,
          itemHeighth: 8,
          borderColor: "rgb(204, 204, 204)",
          padding: 10,
        },
        toolbox: {
          show: true,
          feature: {
            myTool1: {
              show: true,
              title: "全屏",
              icon: "src/assets/img/full-defalut.png",
              onclick: function () {
                alert("full");
              },
            },
          },
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: this.dataTimes,
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
              },
              show: true,
            },
            splitLine: {
              show: false,
              lineStyle: {
                width: 1,
              },
            },
            axisTick: {
              show: false,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "(A)",
            position: "left",
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
            splitArea: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgb(232, 234, 238)",
              },
            },
            max: max1,
            min: min1,
            splitNumber: splitNum,
            interval:
              min1 != undefined && max1 != undefined
                ? (max1 - min1) / splitNum
                : "auto",
          },
          {
            type: "value",
            name: "(mA)",
            position: "right",
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
            splitArea: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgb(232, 234, 238)",
              },
            },
            max: max2,
            min: min2,
            splitNumber: splitNum,
            interval:
              min2 != undefined && max2 != undefined
                ? (max2 - min2) / splitNum
                : "auto",
          },
        ],
        series: [
          {
            name: "A相电流",
            type: "line",
            yAxisIndex: 0,
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
              },
            },
            symbol: "circle",
            showSymbol: false,
            symbolSize: 7,
          },
          {
            name: "B相电流",
            type: "line",
            yAxisIndex: 0,
            data: this.electricDatasB,
            itemStyle: {
              normal: {
                color: "#02E437",
                lineStyle: { color: "#02E437", width: 2 },
                borderWidth: 1,
                borderColor: "#FFFFFF",
                label: { show: false },
              },
            },
            symbol: "circle",
            showSymbol: false,
            symbolSize: 7,
          },
          {
            type: "line",
            name: "C相电流",
            yAxisIndex: 0,
            data: this.electricDatasC,
            itemStyle: {
              normal: {
                color: "#FF1C43",
                lineStyle: { color: "#FF1C43", width: 2 },
                borderColor: "#FFFFFF",
                borderWidth: 1,
              },
            },
            symbol: "circle",
            showSymbol: false,
            symbolSize: 7,
          },
          {
            type: "line",
            name: "漏电电流",
            yAxisIndex: 1,
            data: this.leakageDatas,
            itemStyle: {
              normal: {
                color: "#3BECF2",
                lineStyle: { color: "#3BECF2", width: 2 },
                borderColor: "#FFFFFF",
                borderWidth: 1,
              },
            },
            symbol: "circle",
            showSymbol: false,
            symbolSize: 7,
          },
        ],
        grid: {
          x: 54,
        },
      };
      let voltageOption = {
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["A相电压", "B相电压", "C相电压"],
          textStyle: {
            color: "rgb(153, 153, 153)",
            fontSize: 14,
          },
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
        calculable: true,
        xAxis: {
          type: "category",
          data: this.dataTimes,
          axisLine: {
            show: false,
            lineStyle: {
              color: "rgb(142, 149, 170)",
              width: 20,
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: "rgb(232, 234, 238)",
              },
            },
            nameTextStyle: {
              color: "rgb(0, 255, 255)",
              fontSize: 9,
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "rgb(142, 149, 170)",
              },
            },
            boundaryGap: false,
          },
        },
        yAxis: [
          {
            type: "value",
            name: "(V)",
            position: "left",
            nameTextStyle: {
              color: "rgb(142, 149, 170)",
              fontSize: 12,
            },
            axisLine: {
              show: false,
              lineStyle: {
                width: 0,
                color: "rgb(232, 234, 238)",
              },
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              lineStyle: {
                color: "rgb(232, 234, 238)",
              },
              show: true,
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
            name: "A相电压",
            type: "line",
            stack: "Total",
            data: this.voltageDatasA,
            itemStyle: {
              normal: {
                color: "#FDDD00",
                type: "solid",
                lineStyle: { color: "#FDDD00", width: 2 },
                borderWidth: 1,
                borderColor: "#FFFFFF",
              },
            },
            symbol: "circle",
            showSymbol: false,
            symbolSize: 7,
          },
          {
            name: "B相电压",
            type: "line",
            stack: "Total",
            data: this.voltageDatasB,
            itemStyle: {
              normal: {
                color: "#02E437",
                lineStyle: { color: "#02E437", width: 2 },
                borderWidth: 1,
                borderColor: "#FFFFFF",
                label: { show: false },
              },
            },
            symbol: "circle",
            showSymbol: false,
            symbolSize: 7,
          },
          {
            name: "C相电压",
            type: "line",
            stack: "Total",
            data: this.voltageDatasC,
            itemStyle: {
              normal: {
                color: "#FF1C43",
                lineStyle: { color: "#FF1C43", width: 2 },
                borderColor: "#FFFFFF",
                borderWidth: 1,
              },
            },
            symbol: "circle",
            showSymbol: false,
            symbolSize: 7,
          },
        ],
      };
      myElectricCharts.setOption(electricOption);
      myVoltageCharts.setOption(voltageOption);
    },
    //计算最大值
    calMax(arr) {
      let max = Math.max(...arr);
      let log;
      if (max < 0) {
        log = Math.log10(-max);
      } else if (max > 0) {
        log = Math.log10(max);
      } else {
        log = 0;
      }
      log = Math.floor(log);
      log = Math.pow(10, log);
      let maxint = Math.ceil(max / (0.95 * log)); // 不让最高的值超过最上面的刻度
      let maxval = maxint * log; // 让显示的刻度是整数

      // 为了防止数据为0时，Y轴不显示，给个最大值
      if (maxval == 0) {
        maxval = 1;
      }
      return maxval;
    },
    //计算最小值
    calMin(arr) {
      let min = Math.min(...arr);
      let log;
      if (min < 0) {
        log = Math.log10(-min);
      } else if (min > 0) {
        log = Math.log10(min);
      } else {
        log = 0;
      }
      log = Math.floor(log);
      log = Math.pow(10, log);
      let minint = Math.floor(min / (1.05 * log));
      let minval = minint * log; //让显示的刻度是整数
      return minval;
    },

    //日期选择切换查询历史数据
    getTime(time) {
      if (time.type == "日") {
        this.start_time = this.$moment(time.value).format("YYYY-MM-DD");
        this.end_time = this.$moment(time.value)
          .add(1, "days")
          .format("YYYY-MM-DD");
      } else if (time.type == "周") {
        this.start_time = this.$moment(time.value)
          .startOf("week")
          .format("YYYY-MM-DD");
        this.end_time = this.$moment(time.value)
          .endOf("week")
          .format("YYYY-MM-DD");
      } else if (time.type == "月") {
        this.start_time = this.$moment(time.value).format("YYYY-MM-DD");
        this.end_time = this.$moment(time.value)
          .add(1, "months")
          .format("YYYY-MM-DD");
      } else if (time.type == "年") {
        this.start_time = this.$moment(time.value).format("YYYY-MM-DD");
        this.end_time = this.$moment(time.value)
          .add(1, "years")
          .format("YYYY-MM-DD");
      }
      this.$emit("requstStatus", true);
      let params = this.getHistoryDataParams(this.curveDev);
      this.getHistoryDatas(params);
      setTimeout(() => {
        this.$emit("requstStatus", false);
      }, 500);
    },
    //切换页面
    changePager(newPage) {
      this.currentPage = newPage;
      let min = (newPage - 1) * this.pageSize,
        max =
          newPage * this.pageSize > this.tableData.length
            ? this.tableData.length
            : newPage * this.pageSize;
      this.showData = this.tableData.slice(min, max);
    },
  },
  watch: {
    //设备切换重新请求数据
    curveDev: {
      immediate: true,
      handler(newVal) {
        this.$emit("requstStatus", true);
        let params = this.getHistoryDataParams(newVal);
        this.getHistoryDatas(params);
        setTimeout(() => {
          this.$emit("requstStatus", false);
        }, 500);
      },
    },
  },
};
</script>
<style lang="scss">
@import "./historyStandingBook.scss";
</style>
