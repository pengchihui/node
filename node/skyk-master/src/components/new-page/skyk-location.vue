<template>
  <div class="skyk-location">
    <div class="dibutab-top">
      <Divider>子菜单选择</Divider>
      <CheckboxGroup v-model="pojo.zsocial">
        <div class="flex " style="margin: 40px 0;">
          <i-col span="6" v-if="index<7" :key="index" v-for="(item,index) in zfunList">
            <Checkbox :label="item.label">
              <span style="font-size: 16px;">{{item.name}}</span></Checkbox>
          </i-col>
        </div>
      </CheckboxGroup>
    </div>
    <div class="flex">
      <div class="dibutab-one">
        <Divider>子菜单编辑</Divider>
        <div class="flex">
          <div class="zcd-title">子菜单命名</div>
          <div class="zcd-inp">
            <Input v-model="pojo.zcdmm" placeholder="请输入子菜单命名"/>
          </div>
        </div>
        <div class="flex but-wrap">
          <div v-for="item in 2" :key="item">
            <jsks-diy-but></jsks-diy-but>
          </div>
        </div>
        <div class="flex but-wrap">
          <div v-for="item in 2" :key="item">
            <jsks-diy-but></jsks-diy-but>
          </div>
        </div>
        <Divider></Divider>
        <div class="dibutab-one-bg ">
          <div class="flex justify-center">
            <div style="width: 300px;">
              <jsks-diy-but title="背景图片尺寸手机版1280*2160<br/>ipad版1536*2438" :mark="1"></jsks-diy-but>
            </div>
            <div style="width: 300px;">
              <jsks-diy-but title="LOGO图片尺寸手机版1280*2160<br/>ipad版1536*2438" :mark="1"></jsks-diy-but>
            </div>
          </div>
        </div>
      </div>
      <div class="dibutab-two">
        <Divider>区位示意图</Divider>
        <img src="../../assets/nh/img_quwei1.png"/>
        <img src="../../assets/nh/img_quwei2.png"/>
      </div>
    </div>

  </div>
</template>
<script>
import JsksDiyBut from '@/components/jsks-diy-but/jsks-diy-but.vue'

export default {
  name: 'SkykLocation',
  components: {
    JsksDiyBut
  },
  props: {},
  data () {
    return {
      pojo: {},
      zfunList: [{
        name: '品牌区位',
        label: '0'
      }, {
        name: '全国区位',
        label: '1'
      }, {
        name: '城市区位',
        label: '2'
      }, {
        name: '项目区位',
        label: '3'
      }]
    }
  },
  computed: {},
  methods: {}
}
</script>

<style lang="less">
  .skyk-location {

  }

  .dibutab {
    .bwidth-dibu {
      width: 80%;
      margin: 0 auto;

      .dibutab-one-bg {
        width: 50%;
        margin: 0 auto;
      }

      .dibutab-one {
        width: 70%;
      }

      .dibutab-two {
        width: 30%;
        margin-left: 70px;

        img {
          min-width: max-content;
          padding: 10px
        }
      }
    }

    .zcd-title {
      width: 100px;
      line-height: 55px;
      font-size: 18px;
      margin-right: 19px;
    }

    .zcd-inp {
      width: 88%
    }
  }
</style>
