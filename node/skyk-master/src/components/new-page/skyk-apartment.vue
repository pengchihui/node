<template>
  <div>
    <div class="flex justify-between skyk-apart">
      <div class="" style="width: 80%;">
        <Divider>菜单编辑</Divider>
        <div>
          <skyk-input title="菜单命名" name="name"></skyk-input>
          <div class="">
            <div style="height: 20px;"></div>
            <div class="align-center justify-center" style="width: 100%;margin-bottom: 20px;">
              <skyk-upload padding="100px" title="点击上传模板(2438*1536)" name="start_heng"
                           :start="onStart">
              </skyk-upload>
              <div style="text-align: center;">背景图片图片尺寸手机版1280*2160 <br/>ipad版1536*2438</div>
            </div>
          </div>
        </div>
        <Row>
          <i-col class-name="bcol btop" span="3">按钮组</i-col>
          <i-col class-name="bcol-item" :span="7" v-for="(item, index) in apartment.btns" :key="index">
            <div class="flex but-topwrap">
              <div class="but-tile">户型</div>
              <div class="but-inp">
                <Input v-model="item.name" :placeholder="`请输入户型`" type="text" :disabled="false"/>
              </div>
            </div>
            <div class="flex but-topwrap">
              <div class="but-tile">添加链接</div>
              <div class="but-inp">
                <Input v-model="item.link" :placeholder="`请输入链接`" type="text" :disabled="false"/>
              </div>
            </div>
          </i-col>
        </Row>
        <Row>
          <i-col class-name="bcol btop" span="3">顶部图片</i-col>
          <i-col class-name="bcol" span="7" v-for="(item, index) in apartment.imgs.top" :key="index">
            <jsks-diy-but layout="flex justify-center align-end " :mark="1"></jsks-diy-but>
          </i-col>
        </Row>

        <Row>
          <i-col class-name="bcol btop" span="3">底部图片</i-col>
          <i-col class-name="bcol" span="7" v-for="(item, index) in apartment.imgs.bottom" :key="index">
            <jsks-diy-but layout="flex justify-center align-end " :mark="1"></jsks-diy-but>
          </i-col>
        </Row>

        <Row>
          <i-col class-name="bcol btop hcol" span="3">户型图片</i-col>
          <i-col class-name="bcol" span="7" v-for="(item, index) in apartment.imgs.center" :key="index">
            <jsks-diy-but layout="flex justify-center align-end " :mark="1"></jsks-diy-but>
          </i-col>
        </Row>
      </div>
      <div class=" room-imgs">
        <Divider>户型示意图</Divider>
        <img src="../../assets/nh/img_huxing.png"/>
      </div>
    </div>
  </div>
</template>
<script>
// skyk-apartment
import JsksDiyBut from '@/components/jsks-diy-but/jsks-diy-but.vue'

export default {
  name: 'SkykApartment',
  components: {
    JsksDiyBut
  },
  props: {},
  data () {
    return {
      apartment: {
        btns: [
          {
            name: '',
            link: ''
          },
          {
            name: '',
            link: ''
          },
          {
            name: '',
            link: ''
          }
        ],
        imgs: {
          top: [
            {
              imgV: '',
              imgH: ''
            },
            {
              imgV: '',
              imgH: ''
            },
            {
              imgV: '',
              imgH: ''
            }
          ],
          bottom: [
            {
              imgV: '',
              imgH: ''
            },
            {
              imgV: '',
              imgH: ''
            },
            {
              imgV: '',
              imgH: ''
            }
          ],
          center: [
            {
              imgV: '',
              imgH: ''
            },
            {
              imgV: '',
              imgH: ''
            },
            {
              imgV: '',
              imgH: ''
            }
          ]
        }
      }
    }
  },
  computed: {},
  methods: {
    onStart (data) {
      console.log(data)
    }
  }
}
</script>
<style lang="less">
  .skyk-apart {
    .but-wrap .but-shuimg {
      margin-left: 0px !important;
    }

    .hcol {
      border-bottom: 1px solid #9A9A9A;
    }

    .bcol {
      border: 1px solid #9A9A9A;
    }

    .bcol-item {
      border: 1px solid #9A9A9A;
      border-bottom: none;
    }

    .btop {
      border: none;
      border-top: 1px solid #9A9A9A;
      text-align: right;
      padding: 12px;
    }

    .but-inp {
      padding-right: 10px;
    }

    .but-tile {
      min-width: 60px;
    }

    .bg-wrap {
      background-color: rgba(18, 19, 58, 1);
    }

    .room-top {
      width: 100%;

      .room-jia {
        width: 84px;
        height: 84px;
        margin: 0 auto;
        border: 1px solid rgba(230, 230, 230, 1);
        border-radius: 2px;
        text-align: center;
        line-height: 28px;
      }

    }

    .room-imgs {
      margin-left: 100px;

      img {
      }
    }
  }

</style>
