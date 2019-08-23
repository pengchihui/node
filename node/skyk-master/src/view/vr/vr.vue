<template>
    <div ref="homePage" class="homePage">
        <iframe src="http://www.baidu.com" style="width: 100%;height: 100%;" ></iframe>
        <!-- <object data=""></object> -->
    </div>
</template>

<script>
export default {
  data () {
    return {
      clientHeight: ''
    }
  },
  methods: {
    hei () {
      // 获取浏览器可视区域高度
      this.clientHeight = `${document.documentElement.clientHeight}` // document.body.clientWidth;
      // console.log(self.clientHeight);
      window.onresize = function temp () {
        this.clientHeight = `${document.documentElement.clientHeight}`
      }
    }
  },
  mounted () {
    // 获取浏览器可视区域高度
    this.clientHeight = `${document.documentElement.clientHeight}` // document.body.clientWidth;
    // console.log(self.clientHeight);
    window.onresize = function temp () {
      this.clientHeight = `${document.documentElement.clientHeight}`
    }
  },
  watch: {
    // 如果 `clientHeight` 发生改变，这个函数就会运行
    clientHeight () {
      this.changeFixed(this.clientHeight)
    }
  },
  methods: {
    changeFixed (clientHeight) { // 动态修改样式
      // 获取浏览器可视区域高度
      this.clientHeight = `${document.documentElement.clientHeight}` // document.body.clientWidth;
      // console.log(self.clientHeight);
      window.onresize = function temp () {
        this.clientHeight = `${document.documentElement.clientHeight}`
      }
      this.$refs.homePage.style.height = clientHeight - 100 + 'px'
    }
  }
}
</script>
<style>
</style>
