<template>
  <div ref="dom" :style="{ height: '180px'}"></div>
</template>

<script>
import * as echarts from 'echarts'

//import { on, off } from '@/libs/tools'

export default {
  name: 'GaugeChart',
  props: {
    value: Number,
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
          pointer:{
            show:false
          },
          axisLine: {
            show: false
          },
          axisTick: {
            distance: 0,
            splitNumber: 8,
            lineStyle: {
              width: 1,
              color: '#AEC6F5'
            }
          },
          splitLine: {
            show:true,
            distance: 0,
            length: 10,
            lineStyle: {
              width: 1,
              color: '#AEC6F5'
            }
          },
          axisLabel: {
            distance: 10,
            color: '#999',
            fontSize: 10
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
            offsetCenter: [0, '-2%'],
            formatter: function (value) {return '{value|' + value.toFixed(0) + '}{unit|°C}';},
            rich:{
              value: {
                fontSize: 30,
                fontWeight: 'bolder',
                color: '#3674F6'
              },
              unit: {
                fontSize: 13,
                color: '#3674F6'
              }
            },
          },
          data: [
            {
              value: String(this.value)
            }
          ]
        },{
          'type':'gauge',
          center:['50%','60%'],
          startAngle: 240,
          endAngle: -60,
          min: 0,
          max: 250,
          splitNumber: 5,
          pointer:{
            show:false
          },
          axisLine: {
            show: false
          },
          axisTick: {
            distance: -4,
            length:1,
            splitNumber: 16,
            lineStyle: {
              width: 1,
              color: '#AEC6F5'
            }
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
          detail: {
            show: false
          }
        },{
          'type':'gauge',
          center:['50%','60%'],
          startAngle: 240,
          endAngle: -60,
          min: 0,
          max: 250,
          splitNumber: 5,
          pointer:{
            show:false
          },
          axisLine: {
            show: false
          },
          axisTick: {
            distance: -15,
            length:8,
            splitNumber: 16,
            lineStyle: {
              width: 3,
              color: '#AEC6F5'
            }
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
          detail: {
            show: false
          }
        },
        {
          'type':'gauge',
          center:['50%','60%'],
          startAngle: 240,
          endAngle: 210,
          min: 0,
          max: 250,
          splitNumber: 1,
          pointer:{
            show:false
          },
          axisLine: {
            show: false
          },
          axisTick: {
            distance: -15,
            length:8,
            splitNumber: 8,
            lineStyle: {
              width: 3,
              color: '#3674F6'
            }
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
          detail: {
            show: false
          }
        },
        {
          'type':'gauge',
          center:['50%','60%'],
          startAngle: 210,
          endAngle: 210,
          min: 0,
          max: 250,
          splitNumber: 1,
          pointer:{
            show:false
          },
          axisLine: {
            show: false
          },
          axisTick: {
            distance: -15,
            length:8,
            splitNumber: 1,
            lineStyle: {
              width: 3,
              color: 'red'
            }
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
          detail: {
            show: false
          }
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
