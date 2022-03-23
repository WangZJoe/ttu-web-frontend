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
      // let option = {
      //   tooltip: {
      //       formatter: '{a} <br/>{b} : {c}%'
      //   },
      //   series: [
      //       {
      //       name: 'Pressure',
      //       type: 'gauge',
      //       startAngle: 200,
      //       endAngle: -20,
      //       progress: {
      //           show: true
      //       },
      //       itemStyle: {
      //           color: '#3674F6'
      //       },
      //       detail: {
      //           valueAnimation: true,
      //           formatter: '{value}'
      //       },
      //       axisTick: {
      //           distance: 45,
      //           splitNumber: 5,
      //           lineStyle: {
      //           width: 0,
      //           color: '#999'
      //           }
      //       },
      //       splitLine: {
      //           distance: -30,
      //           length: 0,
      //           lineStyle: {
      //               width: 3,
      //               color: '#999'
      //           }
      //       },
      //       data: [
      //           {
      //           value: 50,
      //           // name: 'SCORE'
      //           }
      //       ]
      //       }
      //   ]
      //   }
      
      
    let option = {
      series: [
        {
          type: 'gauge',
          center: ['50%', '60%'],
          startAngle: 240,
          endAngle: -60,
          min: 0,
          max: 250,
          splitNumber: 5,
          progress: {
            show: true,
            width: 10
          },
          pointer: {
            show: false
          },
          axisLine: {
            lineStyle: {
              width: 10
            }
          },
          axisTick: {
            distance: 20,
            splitNumber: 5,
            lineStyle: {
              width: 2,
              color: '#999'
            }
          },
          splitLine: {
            show:true,
            distance: 10,
            length: 14,
            lineStyle: {
              width: 3,
              color: '#3674F6'
            }
          },
          axisLabel: {
            distance: -20,
            color: '#3674F6',
            fontSize: 20
          },
          anchor: {
            show: false
          },
          title: {
            show: false
          },
          detail: {
            valueAnimation: true,
            width: '60%',
            lineHeight: 40,
            borderRadius: 8,
            offsetCenter: [0, '-10%'],
            fontSize: 20,
            fontWeight: 'bolder',
            formatter: '{value} °C',
            color: '#3674F6'
          },
          data: [
            {
              value: 20
            }
          ]
        }
      ]
    };



      this.dom = echarts.init(this.$refs.dom)
      this.dom.setOption(option)
      //on(window, 'resize', this.resize)    
  },
  beforeDestroy () {
    //off(window, 'resize', this.resize)
  }
}
</script>
