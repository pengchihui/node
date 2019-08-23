<template>
    <div ref="dom"></div>
</template>

<script>
import echarts from 'echarts'
import {
  on,
  off
} from '@/libs/tools'
export default {
  name: 'serviceRequests',
  data () {
    return {
      dom: null
    }
  },
  props: {
    lineData: Object
  },
  methods: {
    resize () {
      this.dom.resize()
    }
  },
  mounted () {
    const option = {
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.lineData.category
      },
      yAxis: {
        type: 'value'
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: ['#ffffff']
        }
      },
      textStyle: {
        fontSize: 15,
        color: '#fff'
      },
      series: [{
        data: this.lineData.data,
        type: 'line',
        itemStyle: {
          normal: {
            color: '#58C198'
          }
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: '#58C198'
            }, {
              offset: 1,
              color: '#0a1e39'
            }])
          }
        }
      }]
    }
    this.$nextTick(() => {
      this.dom = echarts.init(this.$refs.dom)
      this.dom.setOption(option)
      on(window, 'resize', this.resize)
    })
  },
  beforeDestroy () {
    off(window, 'resize', this.resize)
  }
}
</script>
