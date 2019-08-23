<template>
    <div class="wrap">
        <div class="flex" style="width: 100%;">
            <div class="flex-sub nh-flex-item" v-for="(infor, i) in inforCardData" :key="`infor-${i}`">
                <infor-card shadow :color="infor.color" :icon-size="36">
                    <p style="font-size: 22px;">{{ infor.title }}</p>
                    <count-to :end="infor.count" :color="infor.color" count-class="count-style" />
                </infor-card>
            </div>
        </div>
        <div class="flex align-center nh-center" style="width: 100%;">
            <div class="flex-sub hn-w1 ">
                <div>
                    <div class="bg-chars">
                        <div class="bg-chars-title">数据统计图</div>
                        <chart-pie style="height: 300px;" :value="pieData" text="数据统计图"></chart-pie>
                    </div>
                </div>
                <div style="margin-top: 40px;">
                    <div class="bg-chars">
                        <div class="flex justify-between hn-wrap-lina">
                            <div class="bg-chars-title">访问人数趋势图</div>
                            <div class="flex" style="margin-right: 50px;margin-top: 3px;">
                                <button v-for="(item,index) in lineList" :key="`line-${item}`" @click="lineTap(index)" class="hn-but  " :class="[lineOff==index?'hn-bg-bl':'']">{{item}}</button>
                            </div>
                        </div>
                        <example style="height: 310px;" :lineData="lineData" />
                    </div>
                </div>
            </div>
            <div class="flex-sub hn-w2">
                <div class="bg-map">
                    <chart-map style="height: 100%;min-height: 800px;" :value="pieData" text="数据统计图"></chart-map>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import InforCard from '_c/info-card'
import CountTo from '_c/count-to'
import { setToken, getToken } from '@/libs/util'
import {
  ChartPie,
  ChartBar,
  ChartMap
} from '_c/charts'
import Example from './example.vue'
export default {
  name: 'home',
  components: {
    InforCard,
    CountTo,
    ChartPie,
    ChartMap,
    ChartBar,
    Example
  },
  data () {
    return {
      lineOff: 0,
      lineList: ['最近一周', '近一个月', '近三个月'],
      lineData: {
        category: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        data: [820, 932, 901, 934, 1290, 1330, 1320]
      },
      inforCardData: [{
        title: '总访问量',
        count: 0,
        color: '#D4C13B'
      },
      {
        title: '用户总人数',
        count: 0,
        color: '#CF7243'
      },
      {
        title: '销售顾问人数',
        count: 0,
        color: '#179BC6'
      },
      {
        title: '楼盘总数',
        count: 0,
        color: '#17C68E'
      }
      ],
      pieData: [{
        value: 3352,
        name: '销售顾问人数 335,2次'
      },
      {
        value: 3101,
        name: '总访问量 310,1次'
      },
      {
        value: 2343,
        name: '总用户数 234,3人'
      }
      ]
    }
  },
  mounted () {
      this.init();
  },
  methods: {
    lineTap (index) {
      this.lineOff = index
    },
    init(){
        this.$http.post("index.php/admin",{}).then(e=>{
             this.inforCardData[3].count = Number(e.lists_num)
            this.inforCardData[0].count = Number(e.lists_visit)
            this.inforCardData[1].count = Number(e.user_num)
            this.inforCardData[2].count = Number(e.adviser_num)
        })
    },
  }
}
</script>

<style lang="less">
     .content-wrapper{
        background-image: url(/skyk/img/bg.png);
       background-size: 100% 100%;
    }
    html,
    body {
        overflow-x: hidden;
    }
    .content-wrapper{
            background-image: url('../../../assets/nh/bg.png');
            background-size: 100% 100%;
    }
    .hn-wrap-lina {
        border-bottom: 1px solid #808080;
        padding-bottom: 18px;
    }

    .hn-wrap-line {
        width: 90%;
        margin: 0 auto;
    }

    .hn-but {
        margin: 0 10px;
        color: #fff;
        width: 100px;
        height: 20px;
        text-align: center;
        background-color: #000;
        border: 1px solid rgba(33, 109, 188, 1);
        border-radius: 8px;
        outline: none;
    }

    .hn-bg-bl {
        background: rgba(33, 109, 188, 1);
    }

    .nh-flex-item {
        margin: 0 10px;
    }

    .wrap {
        width: 100%
    }

    .count-style {
        font-size: 50px;
    }

    .nh-center {
        margin: 20px 10px;
    }

    .nh-row {
        height: 180px;
    }

    .bg-chars {
        background-image: url('../../../assets/nh/shuju_bg_kuang.png');
        background-size: 100% 100%;
        padding: 14px;
    }

    .bg-chars-title {
        background-image: url('../../../assets/nh/biaoti_shuju.png');
        background-size: 100% 100%;
        padding: 14px;
        width: 177px;
        line-height: 1px;
        text-align: center;
        height: 0px;
        color: #fff;
        font-size: 0.5em;
    }

    .bg-map {
        background-image: url('../../../assets/nh/ditu_bg_kuang.png');
        background-size: 100% 100%;
    }

    .hn-w1 {
        padding-right: 2%;
        width: 90%;
    }

    .hn-w2 {
        width: 80%;
        padding-right: 1%;
    }
</style>
