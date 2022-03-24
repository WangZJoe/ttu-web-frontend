<template>
  <div ref="dom" :style="{ height: '200px' }"></div>
</template>

<script>
import * as echarts from "echarts";
import tdTheme from "./theme.json";
//import { on, off } from '@/libs/tools'

export default {
  name: "LineChartFirst",
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
        data: ["漏电电流"],
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
            name: "mA",
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
            name: "漏电电流",
            type: "line",
            data: [11, 11, 15, 13, 12, 13, 10, 5, 9, 5, 11, 12, 8, 8, 2, 3, 5, 23, 20, 15, 18, 16, 15, 14],
            itemStyle: {
                normal: {
                    lineStyle: {
                        color: "rgb(59, 236, 242)",
                        width: 3
                    }
                }
            },
            symbolSize: 0
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
