<template>
  <div ref="dom" :style="{ height: '300px'}"></div>
</template>

<script>
import * as echarts from 'echarts'
import tdTheme from './theme.json'
//import { on, off } from '@/libs/tools'

export default {
  name: 'LineChartTwo',
  props: {
    value: Object,
    text: String,
    subtext: String
  },
  data () {
    return {
      dom: null
    }
  },
  methods: {
    resize () {
      this.dom.resize()
    }
  },
  mounted () {    
       let xAxisData = ["11:00","11:00","11:00","11:00","11:00","11:00","11:00","11:00","11:00","11:00","11:00","11:00",]
    //   let seriesData = Object.values(this.value)
      let option = {
        tooltip: {
            trigger: "axis"
        },
        legend: {
            // data: ["漏电电流"],
        },
        grid: [
            {
                left: 60,
                right: 50,
                height: '35%'
            },
            {
                left: 60,
                right: 50,
                top: '60%',
                height: '35%'
            }
        ],
        xAxis: [
            {
                type: "category",
                boundaryGap: false,
                axisLine: {
                    lineStyle: {
                        width: 0
                    }
                }
            },{
                gridIndex: 1,
                type: "category",
                boundaryGap: false,
                axisLine: {
                    lineStyle: {
                        width: 0
                    }
                }
            }
        ],
        yAxis: [
            {
                type: "value",
                name: "mA"               
            },
            {
                gridIndex: 1,
                name: 'A',
                type: 'value',
            }
        ],
        series: [
            {
                name: '漏电电流(mA)',
                type: 'line',
                data: [
                    30,20,50,60,70,90,55,33,
                ],                                
                itemStyle: {
                    normal: {
                        color: "#3BECF2"
                    }
                }
            },
            {
                name: "A相电流",
                type: "line",
                xAxisIndex: 1,
                yAxisIndex: 1,
                data: [20,30,25,35,45,40,50,55,60,65,52,68,72,85],
                itemStyle: {
                    normal: {
                        color: "#FDDD00"
                    }
                }
            },
            {
                name: "B相电流",
                type: "line",            
                xAxisIndex: 1,
                yAxisIndex: 1,
                data: [15,20,30,25,35,45,40,50,55,60,65,52,68,72],
                itemStyle: {
                    normal: {
                        color: "#00DCFF"
                    }
                }
            },
            {
                name: "C相电流",
                type: "line",
                xAxisIndex: 1,
                yAxisIndex: 1,
                data: [12,18,20,30,25,35,45,40,50,55,60,65,52,68],
                itemStyle: {
                    normal: {
                        color: "#FF1C7F"
                    }
                }
            }
        ]
      }
            
      this.dom = echarts.init(this.$refs.dom)
      this.dom.setOption(option)
      //on(window, 'resize', this.resize)    
  },
  beforeDestroy () {
    //off(window, 'resize', this.resize)
  }
}
</script>
