<template>
  <div ref="dom" :style="{ height: '300px' }"></div>
</template>

<script>
import * as echarts from "echarts";
import * as _ from "lodash";
import tdTheme from "./theme.json";
//import { on, off } from '@/libs/tools'

export default {
  name: "LineChartTwo",
  props: {
    value: Array,
    text: String,
    subtext: String,
  },
  data() {
    return {
      dom: null,
    };
  },
  methods: {
    resize() {
      this.dom.resize();
    },
    draw(){
      //   let seriesData = Object.values(this.value)
      let option = {
        tooltip: {
          trigger: "axis",
        },
        legend: {
          // data: ["漏电电流"],
        },
        grid: [
          {
            left: 60,
            right: 50,
            height: "30%",
          },
          {
            left: 60,
            right: 50,
            top: "60%",
            height: "30%",
          },
        ],
        xAxis: [
          {
            //type: "time",
            data:_.map(this.value,"time"),
            //boundaryGap: false,
            axisLine: {
              lineStyle: {
                width: 0,
              },
            },
          },
          {
            gridIndex: 1,
            //type: "time",
            data:_.map(this.value,"time"),
            //boundaryGap: false,
            axisLine: {
              lineStyle: {
                width: 0,
              },
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            //name: "mA",
            scale:true
          },
          {
            gridIndex: 1,
            //name: "A",
            type: "value",
            scale:true
          },
        ],
        series: [
          {
            name: "PhV_phsA",
            type: "line",
            data:_.map(this.value,"PhV_phsA"),
            itemStyle: {
              normal: {
                color: "#3BECF2",
              },
            },
          },
          {
            name: "PhV_phsB",
            type: "line",
            data:_.map(this.value,"PhV_phsB"),
            itemStyle: {
              normal: {
                color: "#FDDD00",
              },
            },
          },
                    {
            name: "PhV_phsC",
            type: "line",
            data:_.map(this.value,"PhV_phsC"),
            itemStyle: {
              normal: {
                color: "#FF1C7F",
              },
            },
          },
          {
            name: "A_phsA",
            type: "line",
            xAxisIndex: 1,
            yAxisIndex: 1,
            // data: [20, 30, 25, 35, 45, 40, 50, 55, 60, 65, 52, 68, 72, 85],
            data:_.map(this.value,"A_phsA"),

            itemStyle: {
              normal: {
                color: "#FDDD00",
              },
            },
          },
          {
            name: "B_phsA",
            type: "line",
            xAxisIndex: 1,
            yAxisIndex: 1,
            data:_.map(this.value,"B_phsA"),
            // data: [15, 20, 30, 25, 35, 45, 40, 50, 55, 60, 65, 52, 68, 72],
            itemStyle: {
              normal: {
                color: "#00DCFF",
              },
            },
          },
          {
            name: "C_phsA",
            type: "line",
            xAxisIndex: 1,
            yAxisIndex: 1,
            data:_.map(this.value,"C_phsA"),
            // data: [12, 18, 20, 30, 25, 35, 45, 40, 50, 55, 60, 65, 52, 68],
            itemStyle: {
              normal: {
                color: "#FF1C7F",
              },
            },
          },
        ],
        // dataset: {
        //   dimensions: ['time', 'PhV_phsA','A_phsA', 'B_phsA', 'C_phsA'],
        //   source: this.value
        // },
      };

      this.dom.setOption(option);
      //on(window, 'resize', this.resize)
    }
  },
  watch:{
    value:function(oldvalue,newvalue){
     this.draw()
    }
  },
  mounted() {    
      this.dom = echarts.init(this.$refs.dom);
            let self = this
      setTimeout(() => {
        window.onresize = function () {
          self.dom.resize();
        };
      }, 20);
  },
  beforeDestroy() {
    //off(window, 'resize', this.resize)
  },
};
</script>
