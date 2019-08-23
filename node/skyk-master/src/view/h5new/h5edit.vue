<template>
  <div class="hedit">
    <div class="caozuo flex">
      <Col span="2">
        <Button type="primary" @click="fanhui">返回</Button>
      </Col>
      <Col span="20">
        <div style="text-align: center; line-height:43px ;font-size: 1.8em;">微沙盘制作</div>
      </Col>
      <Col span="2">
        <div class="flex justify-between">
          <Button type="primary" @click="submit">保存</Button>
        </div>
      </Col>
    </div>
    <Divider id="skyk-divider">基础设置</Divider>
    <div class="basics bwidth flex">
      <div style="width: 300px;">
        <skyk-upload name="image" :start="onStart"></skyk-upload>
      </div>
      <div class="right">
        <Input v-model="pojo.lists_floor" placeholder="标题"/>
        <Input v-model="pojo.lists_content" placeholder="H5内容"/>
        <div class="flex">
          <div style="width: 99%;margin-right: 1%;">
            <Cascader :data="cdata" v-model="pojo.lists_city"></Cascader>
          </div>
          <Input v-model="pojo.lists_place" placeholder="请输入详细地址"/>
        </div>
        <div class="flex">
          <div style="width:39%;margin-right: 1%;">
            <Input v-model="pojo.lists_longitude" placeholder="经度"/>
          </div>
          <div style="width: 39%;margin-right: 1%;">
            <Input v-model="pojo.lists_latitude" placeholder="纬度"/>
          </div>
          <div class="jwd" style="width: 22%;">
            <button>经纬度网站</button>
          </div>
        </div>
      </div>
    </div>

    <Divider>音乐设置</Divider>
    <div class="music bwidth flex">
      <div class="right" style="margin: 0 auto;text-align: center;padding: 20px 0;">
        <Upload :action="action"
                accept=".mp3" :on-success="uploadMusic" :headers="uploadData">
          <Button icon="ios-cloud-upload-outline">上传音乐文件</Button>
        </Upload>
      </div>
    </div>
    <Divider>启动页</Divider>
    <div class="startUp ali-start">
      <skyk-upload title="点击上传模板(1280*2160)" name="start_shu" :start="onStart">
      </skyk-upload>
      <skyk-upload :width="300" :height="150" padding="40px" title="点击上传模板(2438*1536)" name="start_heng"
                   :start="onStart">
      </skyk-upload>
      <!--      <button style="margin: 0 auto;padding: 6px 10px;background: red;border: none;width: 20%;display: block;">删除</button>-->
    </div>
    <Divider>功能选择</Divider>
    <div class="gonnen bwidth">
      <CheckboxGroup v-model="pojo.social">
        <div class="flex " style="margin: 40px 0;">
          <Col span="4" v-if="index<7" :key="index" v-for="(item,index) in funList">
            <Checkbox :label="item.label">
              <span style="font-size: 16px;">{{item.name}}</span></Checkbox>
          </Col>
        </div>
        <div class="flex " style="margin: 40px 0;">
          <Col span="4" v-if="index>=7" :key="index" v-for="(item,index) in funList">
            <Checkbox :label="item.label">
              <span style="font-size: 16px;">{{item.name}}</span></Checkbox>
          </Col>
        </div>
      </CheckboxGroup>
    </div>
    <Divider>底部菜单</Divider>
    <div class="dibutab ">
      <Tabs value="0" class="bwidth-dibu">
        <TabPane v-for="(item,index) in tabList" :label="item.name" :name="item.label" :key="index">
          <div v-if="item.label == 0">
            <skyk-d :ref="item.name"></skyk-d>
          </div>
          <div v-else-if="item.label == 2">
            <skyk-apartment :ref="item.name"></skyk-apartment>
          </div>
          <div v-else-if="item.label == 4">
            <skyk-location :ref="item.name"></skyk-location>
          </div>
          <div v-else-if="item.label == 5">
            <skyk-room :ref="item.name"></skyk-room>
          </div>
          <div v-else>
            <skyk-room :ref="item.name" :label="Number(item.label)" @delClick="delClick" @input="onStart"
                       :nameimg="item.name"></skyk-room>
          </div>
        </TabPane>
      </Tabs>
    </div>

  </div>
</template>

<script>
import cdata from '../../libs/city.data.js'
import JsksDiyBut from '@/components/jsks-diy-but/jsks-diy-but.vue'
import SkykLocation from '@/components/new-page/skyk-location.vue'
import SkykRoom from '@/components/new-page/skyk-room.vue'
import SkykApartment from '@/components/new-page/skyk-apartment.vue'
import SkykD from '@/components/new-page/skyk-3d.vue'
import SkykUpload from '@/components/skykupload/skykupload.vue'

export default {
  name: 'h5edit',
  components: {
    JsksDiyBut,
    SkykLocation,
    SkykD,
    SkykRoom,
    SkykApartment,
    SkykUpload
  },
  data () {
    return {
      action: 'https://api.llppai.com/index.php/revise-file',
      funList: [{
        name: '3D沙盘',
        label: '0'
      },
      {
        name: '全景沙盘',
        label: '1'
      },
      {
        name: '户型鉴赏',
        label: '2'
      },
      {
        name: '园林漫游',
        label: '3'
      },
      {
        name: '区位优势',
        label: '4'
      },
      {
        name: '样板间',
        label: '5'
      },
      {
        name: '微楼书',
        label: '6'
      },
      {
        name: '项目说明',
        label: '7'
      },
      {
        name: '免责说明',
        label: '8'
      },
      {
        name: '版权说明',
        label: '9'
      },
      {
        name: '宣传视频',
        label: '10'
      }
      ],
      uploadData: {
        'token': this.$store.state.user.token, // 此处放置请求到的用户token
        'userId': this.$store.state.user.userId
      },
      pojo: {
        social: []
      },
      cdata: [],
      dList: [{
        name: '音乐名.mp3',
        url: 'http://www.xxx.com/img1.jpg'
      }]
    }
  },
  computed: {
    tabList () {
      let tep = []
      this.pojo.social.forEach(s => {
        tep.push(this.funList[s])
      })
      return tep
    },
    listid () {
      return this.$route.params.id
    }
  },
  mounted () {
    this.pojo.lists_id = this.$route.params.id
    sessionStorage.setItem('lists_id', this.pojo.lists_id)
    this.cdata = cdata
    this.init()
  },
  methods: {
    delClick (e) {
      e.forEach(s => {
        this.pojo[s] = ''
      })
    },
    onStart (e) {
      // this.pojo[e.name] = e.value;
      this.pojo[e.name] = e.name
      this.pojo[e.value] = e.value
      console.dir(e.name)
      console.dir(e.value)
    },
    fanhui () {
      this.$router.back(-1)
    },
    init () {
    },
    uploadMusic () {
      if (Number(e.code) === 1) {
        this.pojo.music = e.data
      } else {
        this.$Message.error('上传失败')
      }
    },
    uploadStart (e, s) {
      console.dir(e)
    },
    uploadStartErr () {
      console.log('错误')
    },
    submit () {
      console.dir(this.pojo)
      // this.$http.post('index.php/revise-lists', this.pojo).then(e => {
      //   console.dir(e)
      //     https://api.llppai.com/
      // })
      this.$http.post('https://api.llppai.com/', this.pojo).then(e => {
        console.dir(e)
      })
    }

  }
}
</script>

<style lang="less">
  .jwd button {
    background: #2d8cf0;
    color: #ffffff;
    margin: 10px 0;
    display: block;
    line-height: 30px;
    border: none;
    padding: 0 5px;
  }

  /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
  ::-webkit-scrollbar {
    width: 5px;
    height: 16px;
    background-color: #0d122c;
  }

  /*定义滚动条轨道 内阴影+圆角*/
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #F5F5F5;
  }

  /*定义滑块 内阴影+圆角*/
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
    background-color: #0d122c;
  }

  .ivu-upload-list {
    text-align: center;
    margin: 20px 0;
  }

  .room-imgs {
    min-width: max-content;

  }

  .room-img img {
    margin: 0 19%;
  }

  .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab {
    background: #0b0c22
  }

  .ivu-divider-inner-text {
    border: 1px solid rgba(0, 168, 184, 1);
  }

  .ivu-tabs-tab {
    border: 1px solid #2d8cf0;
  }

  /* #skyk-divider /deep/  .ivu-divider-inner-text{

    } */
  .hedit {
    background-color: #0b0c22 !important;

    .caozuo {
      line-height: 43px;
      width: 100%;
      height: 43px;
      background: rgba(13, 18, 44, 1);
      box-shadow: 0px 1px 2px 0px rgba(3, 4, 11, 0.4);
    }

    .bwidth-dibu {
      width: 90%;
      margin: 0 auto;
    }

    .ivu-divider-horizontal.ivu-divider-with-text-center:before,
    .ivu-divider-horizontal.ivu-divider-with-text-left:before,
    .ivu-divider-horizontal.ivu-divider-with-text-right:before,
    .ivu-divider-horizontal.ivu-divider-with-text-center:after,
    .ivu-divider-horizontal.ivu-divider-with-text-left:after,
    .ivu-divider-horizontal.ivu-divider-with-text-right:after {
      border-top: 1px solid #9A9A9A !important;
    }

    * {
      color: #fff !important;
    }

    .bwidthMax {
      margin: 20px 10px;
    }

    .bg {
      background-color: rgba(13, 18, 44, 1);
    }

    .ivu-tabs-bar {
      border: none;
    }

    .ivu-select-dropdown {
      .bg;
    }

    .ivu-cascader-menu-item:hover,
    .ivu-cascader-menu-item:hover * {
      color: #000 !important;
    }

    .ivu-upload-list:hover,
    .ivu-upload-list:hover * {
      .bg;
    }

    .ivu-cascader-menu .ivu-cascader-menu-item-active,
    .ivu-cascader-menu .ivu-cascader-menu-item-active * {
      color: #000 !important;

    }

    .ivu-input {
      .bg;
      margin: 10px 0;
      border: 1px solid rgba(77, 77, 77, 1);
    }

    .bwidth {
      width: 50%;
      margin: 0 auto;
    }

    .ivu-upload-drag {
      .bg;
    }

    .startUp {
      width: 50%;
      margin: 0 auto;

      p {
        color: #9A9A9A !important;
        margin-bottom: 20px;
        width: 100% !important;
      }

      .tmp1 {
        margin: 0 auto;
        height: auto !important;
      }

      .tmp1 .ivu-upload-drag {
        width: 150px;
        height: 300px;
      }

      .tmp2 .ivu-upload-drag {
        height: 137px;
        width: 250px;
      }
    }

    .basics {
      .left {
        background: url("../../assets/images/login-bg.jpg") no-repeat;
        background-size: 100% 100%;
        width: 200px;
        height: 200px;
      }

      .right {
        width: 100%;
        margin-left: 20px;
      }
    }

    .music {

      .left {
        width: 300px;
      }

      .right {
        button {
          background-color: rgba(13, 18, 44, 1);
        }
      }
    }
  }
</style>
