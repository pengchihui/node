<template>
  <div class="skyk-Upload">
    <div class="bwidthMax " style="width: 100%">
      <p style="width: 100%;text-align: center;" v-if="title">{{ title }}</p>
      <!--            <div class="demo-upload-list" v-for="item in uploadList">-->
      <!--                    <img :src="item.url" />-->
      <!--                    <div>{{item.url}}</div>-->
      <!--                    <div class="demo-upload-list-cover">-->
      <!--                        &lt;!&ndash;<Icon type="ios-eye-outline" @click="handleView(item.name)"></Icon>&ndash;&gt;-->
      <!--                        <Icon type="ios-trash-outline" @click="handleRemove(item)"></Icon>-->
      <!--                    </div>-->
      <!--            </div>-->
      <!--          :before-upload="handleBeforeUpload"-->
      <Upload
        ref="upload"
        :show-upload-list="false"
        :on-success="uploadStart"
        :accept="accept"
        :data="params"
        :on-format-error="handleFormatError"
        :on-exceeded-size="handleMaxSize"
        :headers="uploadData"
        type="drag"
        action="https://api.llppai.com/index.php/revise-file"
        class="tmp1"
        :style="`width: ${width}px;height: ${height}px;`"
      >
        <div class="imgCover" v-if="img.value" style="">
          <img :src="'https://api.llppai.com/' + img.value"/>
          <div class="demo-upload-list-cover">
            <Icon type="ios-trash-outline" @click="handleRemove(img)"></Icon>
          </div>
        </div>
        <div :style="`padding:${padding} 0`" v-else>
          <img src="./imgyus.png"/>
        </div>
        <!--                <div :style="`padding:${padding} 0`" class="upmuban"><img src="./imgyus.png"/></div>-->
      </Upload>

      <!--<Upload ref="upload" class="tmp1" :style="`width: ${width}px;height: ${height}px;`"-->
      <!--:accept="accept" multiple type="drag"-->
      <!--action="https://api.llppai.com/index.php/revise-file" :on-success="uploadStart"-->
      <!--:headers="uploadData">-->

      <!--<div :style="`padding:${padding} 0`" class="upmuban"><img src="./imgyus.png"/></div>-->

      <!--</Upload>-->
      <!--<div v-for="(item,index) in images" class="uprongqi" :key="index">-->
      <!--&lt;!&ndash;<div style="width: 200px;height: 300px;background-size: 100% 100%;"&ndash;&gt;-->
      <!--&lt;!&ndash;:style="`background: url('https://api.llppai.com/'+{{item.value}}) no-repeat`"></div>&ndash;&gt;-->
      <!--<div class="demo-upload-list">-->
      <!--<img :src="'https://api.llppai.com/'+item.value" alt="">-->
      <!--</div>-->
      <!--</div>-->
    </div>
    <!-- <Upload action="https://api.llppai.com/index.php/revise-file"
        :default-file-list="dList"  class="skyk-Upload"  :accept="accept"  :on-success="uploadStart"
        :headers="uploadData"><Button icon="ios-cloud-upload-outline">上传图片</Button></Upload> -->
  </div>
</template>
<script>
import { baseApi } from '@/libs/util'

export default {
  name: 'SkykUpload',
  props: {
    name: String,
    dList: Array,
    title: String,
    accept: {
      type: String,
      default: 'image/png,,image/jpeg,,image/jpg'
    },
    width: {
      type: Number,
      default: 200
    },
    height: {
      type: Number,
      default: 300
    },
    padding: {
      type: String,
      default: '40%'
    }
  },
  data () {
    return {
      params: {
        lists_id: sessionStorage.getItem('lists_id')
      },
      img: {
        name: '',
        value: ''
      },
      uploadList: [],
      // images: [],
      uploadData: {
        token: this.$store.state.user.token,
        userId: this.$store.state.user.userId
      },
      visible: false
    }
  },
  mounted () {
    // console.log(this.$store.state.user.userId)
    // console.log(this.$store.state.user.token)
    // this.uploadList = this.$refs.upload.fileList;
  },
  methods: {
    uploadStart (e, s) {
      if (Number(e.code) === 1) {
        this.img = { name: this.name, value: e.data, url: baseApi() + e.data }
        this.uploadList.push(this.img)
        // console.dir(this.uploadList)
        this.$emit('start', this.img)
      } else {
        this.$Message.error('上传失败')
      }
    },
    handleRemove (index) {
      console.log(index)
      // 从 upload 实例删除数据
      // const fileList = this.$refs.upload.fileList;
      // this.uploadList.splice(fileList.indexOf(file), 1);
      // this.$emit('start', this.img);

      this.$Modal.remove()
      this.uploadList.splice(index, 1)
      this.$Notice.success({ title: '删除成功' })
    },
    handleFormatError (file) {
      this.$Notice.warning({
        title: '文件格式不正确',
        desc:
            '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
      })
    },
    handleMaxSize (file) {
      this.$Notice.warning({
        title: '超出文件大小限制',
        desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
      })
    }
    // handleBeforeUpload () {
    //     const check = this.uploadList.length < 5;
    //     if (!check) {
    //         this.$Notice.warning({
    //             title: '最多只能上传 5 张图片。'
    //         });
    //     }
    //     return check;
    // }
  }
}
</script>
<style lang="less">
  .imgCover > img {
    width: 100%;
    /*height:300px;*/
  }

  .ivu-upload-drag .skyk-Upload:before {
    content: "";
    height: 0;
    line-height: 0;
    display: block;
    visibility: hidden;
    clear: both;
  }

  .skyk-Upload {
    .ivu-upload .ivu-upload-drag {
      width: 100% !important;
      /*float: left;*/
      /*height: 100% !important;*/
    }
  }

  .uprongqi {
    width: 60%;
    float: right;
  }

  .demo-upload-list {
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
    margin-right: 4px;
  }

  .demo-upload-list img {
    width: 100%;
    height: 100%;
  }

  .demo-upload-list-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
  }

  .demo-upload-list:hover .demo-upload-list-cover {
    display: block;
  }

  .demo-upload-list-cover i {
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
</style>
