<template>
  <div ref="dom" :style="{ height: '180px'}"></div>
</template>

<script>
import * as echarts from 'echarts'

//import { on, off } from '@/libs/tools'

export default {
  name: 'GaugeChart',
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
    //   let xAxisData = Object.keys(this.value)
    //   let seriesData = Object.values(this.value)
      let option = {
        tooltip: {
            formatter: '{a} <br/>{b} : {c}%'
        },
        series: [
            {
            name: 'Pressure',
            type: 'gauge',
            startAngle: 200,
            endAngle: -20,
            progress: {
                show: true
            },
            itemStyle: {
                color: '#3674F6'
            },
            detail: {
                valueAnimation: true,
                formatter: '{value}'
            },
            axisTick: {
                distance: 45,
                splitNumber: 5,
                lineStyle: {
                width: 0,
                color: '#999'
                }
            },
            splitLine: {
                distance: -30,
                length: 0,
                lineStyle: {
                    width: 3,
                    color: '#999'
                }
            },
            data: [
                {
                value: 50,
                // name: 'SCORE'
                }
            ]
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
