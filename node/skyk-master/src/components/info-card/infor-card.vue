<template>
  <Card :shadow="shadow" class="info-card-wrapper" :padding="0">
    <div class="content-con">
      <div class="right-area" style="text-align: center;width: 100%;">
        <div>
          <slot></slot>
        </div>
      </div>
    </div>
  </Card>
</template>

<script>
import CommonIcon from '_c/common-icon'
export default {
  name: 'InforCard',
  components: {
    CommonIcon
  },
  props: {
    left: {
      type: Number,
      default: 36
    },
    color: {
      type: String,
      default: '#2d8cf0'
    },
    icon: {
      type: String,
      default: ''
    },
    iconSize: {
      type: Number,
      default: 20
    },
    shadow: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    leftWidth () {
      return `${this.left}%`
    },
    rightWidth () {
      return `${100 - this.left}%`
    }
  }
}
</script>

<style lang="less">
.common{
  float: left;
  height: 100%;
  display: table;
  text-align: center;
}
.size{
  width: 100%;
  height: 100%;
}
.middle-center{
  display: table-cell;
  vertical-align: middle;
}
.info-card-wrapper{
  background: url('../../assets/nh/top_shuju_bg.png') no-repeat ;
  background-size: 100% 100%;
  color: #fff;
  padding: 44px;
  .size;
  overflow: hidden;
  .ivu-card-body{
    .size;
  }
  .content-con{
    .size;
    position: relative;
    .left-area{
      .common;
      & > .icon{
        .middle-center;
      }
    }
    .right-area{
      .common;
      & > div{
        .middle-center;
      }
    }
  }
}
</style>
