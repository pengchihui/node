<template>
  <div>
    <div class="flex justify-between">
      <div class="room-top">
        <Divider>菜单编辑</Divider>
        <div style="width: 100%;">
          <skyk-input title="菜单命名" :name="menuName" @input="changeMenuName"></skyk-input>
          <div v-if="nameimg === '园林漫游' || nameimg === '全景沙盘'">
            <div v-for="(item, index) in zcList" :key="index">
              <div class="flex">
                <div style="width: 90%;">
                  <div class="flex but-topwrap">
                    <div class="but-tile">子菜单命名</div>
                    <div class="but-inp">
                      <Input v-model="item.name" :placeholder="`请输入名称`" type="text" :disabled="false"/>
                    </div>
                  </div>
                </div>
                <div style="margin-top: 0.625rem;margin-left: 10px;">
                  <Button @click="delClick(index)" type="error">删除</Button>
                </div>
              </div>
              <div class="flex">
                <div style="width: 90%;">
                  <div class="flex but-topwrap">
                    <div class="but-tile">链接</div>
                    <div class="but-inp">
                      <Input v-model="item.link" :placeholder="`请输入链接`" type="text" :disabled="false"/>
                    </div>
                  </div>
                </div>
                <!--<div style="margin-top: 0.625rem;margin-left: 10px;">-->
                  <!--<Button @click="delClick(index)" type="error">删除</Button>-->
                <!--</div>-->
              </div>
            </div>
            <div style="height: 30px;"></div>
            <div class="room-jia" @click="roorAdd">
              <Icon type="ios-add" size="46"/>
              <div>添加子菜单</div>
            </div>
          </div>

          <div v-if="nameimg == '宣传视频'">
            <div style="height: 20px;"></div>
            <video-player class="video-player vjs-custom-skin"
                          ref="videoPlayer" :playsinline="true" :options="playerOptions"></video-player>
            <div class="" style="margin-top: 50px;" @click="roorAdd">
              <Upload accept="video/mp4" multiple type="drag"
                      action="https://api.llppai.com/index.php/revise-file" :on-success="uploadStart"
                      :headers="uploadData">
                <Icon type="ios-add" size="46"/>
                <div>上传视频 (再次上传即覆盖)</div>
              </Upload>
            </div>
          </div>

          <div v-if="nameimg.indexOf('说明') > -1">
            <div style="height: 20px;"></div>
            <div class="">
              <jsks-diy-but v-for="item in 2" layout="flex justify-center align-end " :mark="1"></jsks-diy-but>
            </div>
          </div>
        </div>
      </div>
      <div class="room-top room-img">
        <Divider>{{ nameimg }}示意图</Divider>
        <img v-show="nameimg == '全景沙盘'" src="../../assets/nh/img_quanjing.png"/>
        <img v-show="nameimg == '园林漫游'" src="../../assets/nh/img_yuanlin.png"/>
        <img v-show="nameimg == '样板'" src="../../assets/nh/img_yangban.png"/>
        <img v-show="nameimg == '微楼书'" src="../../assets/nh/img_weiloushu.png"/>
        <img v-show="nameimg == '项目说明'" src="../../assets/nh/img_shuoming.png"/>
        <img v-show="nameimg == '免责说明'" src="../../assets/nh/img_shuoming.png"/>
        <img v-show="nameimg == '版权说明'" src="../../assets/nh/img_shuoming.png"/>
        <img v-show="nameimg == '宣传视频'" src="../../assets/nh/img_shiping.png"/>
      </div>
    </div>
  </div>
</template>
<script>
import JsksDiyBut from '@/components/jsks-diy-but/jsks-diy-but.vue'

// skyk-
export default {
  name: 'SkykRoom',
  components: {
    JsksDiyBut
  },
  props: {
    nameimg: {
      type: String,
      default: '样板'
    },
    label: Number
  },
  data () {
    return {
      menuName: '',
      uploadData: {
        token: '51b5b375a0620a1da9023aa60819a51cc3315cb2', // 此处放置请求到的用户token
        userId: '3'
      },
      nameList: [
        [],
        ['sand_name', 'sand_link'], [],
        ['garden_name', 'garden_link'], [],
        ['model_room_name', 'model_room_link']
      ],
      zcList: [
        {
          name: '',
          link: ''
        }
      ],
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
        autoplay: false, // 如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: 'video/mp4',
            src: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm' // url地址
          }
        ],
        poster: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1986179278,1118313821&fm=27&gp=0.jpg', // 你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true // 全屏按钮
        }
      }
    }
  },
  mounted () {
    console.log(this.nameList[this.label])
  },
  methods: {
    changeMenuName (data) {
      this.menuName = data.value
    },
    delClick (index) {
      this.zcList.splice(index, 1)
      index++
      this.$emit('delClick', [this.nameList[this.label][0] + index, this.nameList[this.label][1] + index])
    },
    roorAdd () {
      this.zcList.push({
        name: '',
        link: ''
      })
    },
    input (e) {
      this.$emit('input', e)
    },
    uploadStart (e, s) {
      if (Number(e.code) == 1) {
        this.playerOptions.sources.src = e.data
        this.$emit('start', { name: 'video', value: e.data })
      } else {
        this.$Message.error('上传失败')
      }
    }

  }
}
</script>
<style lang="less">
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

  .room-img {
    margin-left: 100px;

    img {
      margin-left: 28%;
    }
  }
</style>
