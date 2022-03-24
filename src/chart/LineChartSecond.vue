<template>
  <div ref="dom" :style="{ height: '200px' }"></div>
</template>

<script>
import * as echarts from "echarts";
import tdTheme from "./theme.json";
//import { on, off } from '@/libs/tools'

export default {
  name: "LineChartSecond",
  props: {
    value: Object,
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
  },
  mounted() {
    let xAxisData = [
      "11:00",
      "11:00",
      "11:00",
      "11:00",
      "11:00",
      "11:00",
      "11:00",
      "11:00",
      "11:00",
      "11:00",
      "11:00",
      "11:00",
    ];
    //   let seriesData = Object.values(this.value)
    let option = {
    tooltip: {
        trigger: "axis",
        show: false
    },
    legend: {
        data: ["A相电流", "B相电流", "C相电流"],
        x: "center",
        textStyle: {
            color: "rgb(153, 153, 153)",
            fontSize: 14
        },
        borderWidth: 0,
        selectedMode: "multiple",
        backgroundColor: "rgb(255, 255, 255)",
        y: "top",
        orient: "horizontal",
        itemWidth: 16
    },
    toolbox: {
        show: false,
        feature: {
            mark: {
                show: true
            },
            dataView: {
                show: true,
                readOnly: true
            },
            magicType: {
                show: false,
                type: ["line", "bar"]
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
            type: "category",
            boundaryGap: false,
            data: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"],
            axisLine: {
                show: true,
                lineStyle: {
                    width: 1,
                    color: "rgb(232, 234, 238)"
                }
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: "rgb(142, 149, 170)",
                    fontSize: 12
                }
            },
            axisTick: {
                show: false
            },
            splitLine: {
                show: false
            }
        }
    ],
    yAxis: [
        {
            type: "value",
            name: "A",
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
            splitLine: {
                lineStyle: {
                    color: "rgb(232, 234, 238)",
                    width: 1
                }
            },
            splitArea: {
                areaStyle: {
                    type: "default"
                }
            }
        }
    ],
    series: [
        {
            name: "A相电流",
            type: "line",
            data: [54, 51, 58, 51, 58, 53, 45, 45, 42, 49, 51, 48, 54, 57, 52, 54, 53, 56, 51, 43, 45, 41, 42, 45],
            itemStyle: {
                normal: {
                    lineStyle: {
                        color: "rgb(59, 236, 242)",
                        width: 3
                    }
                }
            },
            symbolSize: 0,
            smooth: true
        },
        {
            type: "line",
            name: "B相电流",
            data: [67, 65, 65, 69, 67, 65, 63, 65, 69, 61, 59, 58, 58, 59, 63, 62, 61, 61, 58, 56, 57, 60, 63, 65],
            symbolSize: 0,
            itemStyle: {
                normal: {
                    lineStyle: {
                        color: "rgb(255, 28, 127)",
                        width: 3
                    }
                }
            },
            smooth: true
        },
        {
            type: "line",
            name: "C相电流",
            data: [72, 76, 78, 71, 74, 72, 78, 70, 68, 78, 75, 71, 65, 69, 73, 74, 78, 77, 71, 68, 71, 69, 65, 71],
            symbolSize: 0,
            itemStyle: {
                normal: {
                    lineStyle: {
                        color: "rgb(253, 221, 0)",
                        width: 3
                    }
                }
            },
            smooth: true
        }
    ],
    calculable: true,
    grid: {
        left: 60,
        right: 50,
        borderColor: "rgb(232, 234, 238)"
    }
};

    this.dom = echarts.init(this.$refs.dom);
    this.dom.setOption(option);
    //on(window, 'resize', this.resize)

    // let self = this
    // setTimeout(() => {
    //   window.onresize = function () {
    //     self.dom.resize();
    //   };
    // }, 20);
  },
  beforeDestroy() {
    //off(window, 'resize', this.resize)
  },
};
</script>
