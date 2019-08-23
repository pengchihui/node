<template>
  <div class="but-wrap">
    <div class="but-wrap-item" v-if="mark <2">
      <div class="flex but-topwrap" v-if="mark == 0">
        <div class="but-tile">按钮</div>
        <div class="but-inp">
          <Input placeholder="请输入名称"/>
        </div>
      </div>
      <div :class="layout">
        <div class="bwidthMax but-shuimg" style="width: 100px;margin: 0 auto">
          <skyk-upload :width="90" :height="200" padding="50px" title="点击上传模板(2438*1536)" name="vertical"
                       @start="onStart">
          </skyk-upload>
          <p style="width: 100%;" v-html="sText"></p>
        </div>
        <div class="bwidthMax but-henimg" style="width: 100px;margin: 0 auto;">
          <skyk-upload :width="90" :height="100" padding="20px" title="点击上传模板(2438*1536)" name="vertical"
                       @start="onStart">
          </skyk-upload>
          <p style="width: 100%;" v-html="hText"></p>
        </div>
      </div>

      <div class="diybut-title" v-if="mark == 1">
        <p v-html="title"></p>
      </div>
    </div>
    <div v-if="mark == 2">
      <div class="gud-wrap flex justify-center">
        <div>
          <Upload class="tmp1" accept="image/png,,image/jpeg" multiple type="drag"
                  action="//jsonplaceholder.typicode.com/posts/">
            <div>

            </div>
          </Upload>
          <p style="width: 100%;text-align: center;" v-html="sText"></p>
        </div>
        <div>
          <Upload class="tmp2" accept="image/png,,image/jpeg" multiple type="drag"
                  action="//jsonplaceholder.typicode.com/posts/">
            <div>
            </div>
          </Upload>
          <p style="width: 100%;text-align: center;" v-html="hText"></p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'JsksDiyBut',
  props: {
    layout: {
      type: String,
      default: ''
    },
    mark: {
      type: Number,
      default: () => {
        return 0
      }
    },
    title: String
  },
  data () {
    return {}
  },
  computed: {
    sText () {
      if (this.layout === '') {
        return '竖版'
      } else {
        return '竖版 <br/> 1280*2160'
      }
    },
    hText () {
      if (this.layout === '') {
        return '横版'
      } else {
        return '横版 <br/> 1536*2438'
      }
    }

  },
  methods: {
    onStart (data) {
      console.log(data)
    }
  }
}
</script>
<style lang="less">
  .ivu-card {
    background: linear-gradient(#1b5aa2, #0d163a); /* 标准的语法 */
  }

  .ivu-upload {
    height: auto !important;
  }

  .ivu-upload-drag {
    /*height: 300px !important;*/
  }

  .mtop {
    margin-top: 10px;
  }

  .but-wrap {
    .but-wrap-item{
      .bwidthMax{
        margin: 0;
      }
    }
    .gud-wrap {
      .tmp1 {
        .mtop;

        div {
          width: 50px;
          height: 100px;
        }
      }

      .tmp2 {
        .mtop;

        img {
          width: 62px;
          height: 46px;
        }
      }
    }

    .diybut-title {
      margin: 30px 0;
      text-align: center;
    }

    .but-wrap-item {
      margin: 20px;
    }

    .but-topwrap {
      .but-tile {
        width: 60px;
        text-align: center;
        line-height: 55px;
        margin-right: 10px;
      }
    }

    .but-shuimg {
      width: 100px;
      /*margin-left: 70px !important;*/
      text-align: center;

      .ivu-upload .ivu-upload-drag {
        height: 200px !important;
      }
    }

    .but-henimg {
      text-align: center;
    }
  }
</style>
