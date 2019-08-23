<template>
  <div>
    <div class="flex justify-between skyk-3d">
      <div class="topwrap">
        <div class="inpwrap">
          <Divider>菜单编辑</Divider>
          <skyk-input title="菜单命名" :name="menuName" @input="changeName"></skyk-input>
        </div>
        <div class="shu">
          <div class="flex">
            <div style="width: 40%;">
              <p style="text-align: center;">竖版 <br>请上传图片</p>
              <!--                          <Upload class="tmp1" accept="image/png,,image/jpeg" multiple type="drag" action="//jsonplaceholder.typicode.com/posts/">-->
              <!--                            <div style="padding: 20px 0;height:300px;">-->
              <!--                              <img src="../../assets/nh/imgyus.png" style="margin: 50px 0;" />-->
              <!--                            </div>-->
              <!--                          </Upload>-->
              <skyk-upload :width="200" :height="300" padding="100px" title="点击上传模板(2438*1536)" name="horizontal"
                           @start="onStart">
              </skyk-upload>
            </div>
            <div class="right" style="width: 60%;">
              <div>
              <div class="flex justify-center" v-for="(item,index) in option3D.horizontal.items" :key="index">
                <div class="flex but-topwrap">
                  <div class="but-tile">名称</div>
                  <div class="but-inp">
                    <Input v-model="item.bird_name" :placeholder="`请输入名称`" type="text" :disabled="false"/>
                  </div>
                </div>
                <div class="flex but-topwrap">
                  <div class="but-tile">链接</div>
                  <div class="but-inp">
                    <Input v-model="item.bird_link" :placeholder="`请输入链接`" type="text" :disabled="false"/>
                  </div>
                </div>
                <div class="but" style="margin-top: 10px;margin-left: 30px;">
                  <!--   -->
                  <Button @click="butdel(index, 'horizontal')" type="error">删除</Button>
                </div>
              </div>
            </div>
              <div class="addButton">
                <Button v-if="option3D.horizontal.items.length < 8" @click="butadd('horizontal')" type="primary">添加</Button>
              </div>
            </div>
          </div>
        </div>
        <div class="hen">
          <div class="flex">
            <div style="width: 40%;">
              <p style="text-align: center;">横版 <br>请上传图片</p>
              <!--                          <Upload class="tmp1" accept="image/png,,image/jpeg" multiple type="drag" action="//jsonplaceholder.typicode.com/posts/">-->
              <!--                            <div style="padding: 20px 0;height:300px;">-->
              <!--                              <img src="../../assets/nh/imgyus.png" style="margin: 50px 0;" />-->
              <!--                            </div>-->
              <!--                          </Upload>-->
              <skyk-upload :width="300" :height="200" padding="100px" title="点击上传模板(2438*1536)" name="vertical"
                           @start="onStart">
              </skyk-upload>
            </div>
            <div class="right" style="width: 60%;">
              <div>
                <div class="flex justify-center" v-for="(item,index) in option3D.vertical.items" :key="index">
                  <div class="flex but-topwrap">
                    <div class="but-tile">名称</div>
                    <div class="but-inp">
                      <Input v-model="item.bird_name" :placeholder="`请输入名称`" type="text" :disabled="false"/>
                    </div>
                  </div>
                  <div class="flex but-topwrap">
                    <div class="but-tile">链接</div>
                    <div class="but-inp">
                      <Input v-model="item.bird_link" :placeholder="`请输入链接`" type="text" :disabled="false"/>
                    </div>
                  </div>
                  <div class="but" style="margin-top: 10px;margin-left: 30px;">
                    <!--   -->
                    <Button @click="butdel(index, 'vertical')" type="error">删除</Button>
                  </div>
                </div>
              </div>
              <div class="addButton">
                <Button v-if="option3D.vertical.items.length < 8" @click="butadd('vertical')" type="primary">添加</Button>
              </div>
            </div>
          </div>
        </div>
        <div style="height: 100px;width: 100%;"></div>
      </div>
      <div class=" room-imgs">
        <Divider>沙盘示意图</Divider>
        <img src="../../assets/nh/img_3dshapan.png"/>
      </div>
    </div>
  </div>
</template>
<script>
import JsksDiyBut from '@/components/jsks-diy-but/jsks-diy-but.vue'

import draggable from 'vuedraggable'
// skyk-d
export default {
  name: 'SkykD',
  props: {
  },
  components: {
    JsksDiyBut
  },
  comments: {
    draggable
  },
  computed: {},
  mounted () {
  },
  data () {
    return {
      menuName: '',
      option3D: {
        horizontal: {
          img: '',
          items: [
            {
              bird_name: '',
              bird_link: ''
            }
          ]
        },
        vertical: {
          img: '',
          items: [
            {
              bird_name: '',
              bird_link: ''
            }
          ]
        }
      },
      buts: [],
      buttonOptions: [{
        trigger: '#button0', // 设置能触发拖动的元素的CSS选择器
        body: '#button0' // 设置需要移动的元素的CSS选择器
      },
      {
        trigger: '#button1', // 设置能触发拖动的元素的CSS选择器
        body: '#button1' // 设置需要移动的元素的CSS选择器
      },
      {
        trigger: '#button2', // 设置能触发拖动的元素的CSS选择器
        body: '#button2' // 设置需要移动的元素的CSS选择器
      },
      {
        trigger: '#button3', // 设置能触发拖动的元素的CSS选择器
        body: '#button3' // 设置需要移动的元素的CSS选择器
      },
      {
        trigger: '#button4', // 设置能触发拖动的元素的CSS选择器
        body: '#button4' // 设置需要移动的元素的CSS选择器
      },
      {
        trigger: '#button5', // 设置能触发拖动的元素的CSS选择器
        body: '#button5' // 设置需要移动的元素的CSS选择器
      },
      {
        trigger: '#button6', // 设置能触发拖动的元素的CSS选择器
        body: '#button6' // 设置需要移动的元素的CSS选择器
      },
      {
        trigger: '#button7', // 设置能触发拖动的元素的CSS选择器
        body: '#button7' // 设置需要移动的元素的CSS选择器
      }]
    }
  },
  methods: {
    onStart (data) {
      this.option3D[data.name].img = data.url
    },
    changeName (data) {
      this.threeDname = data.value
    },
    mousemove () {
      console.log('end')
    },
    butdel (index, type) {
      this.option3D[type].items.splice(index, 1)
    },
    // 按钮赋值
    // 添加列表
    butadd (type) {
      // if (this.$at.isEmpty(this.butObj.name)) {
      //   this.$Message.error('按钮名称不能为空')
      //   return
      // }
      // if (this.$at.isEmpty(this.butObj.url)) {
      //   this.$Message.error('链接不能为空')
      //   return
      // }
      // if (this.buts.length > 7) {
      //   this.$Message.error('添加失败,按钮最多为8个')
      //   return
      // }
      this.option3D[type].items.push({
        bird_name: '',
        bird_link: ''
      })
    },
    datadragEnd (evt) {
      console.log('tuoend')
      console.dir(evt)
    },
    getdata () {
      console.log('ing')
    }
  }
}
</script>
<style lang="less">
  .disable {
    pointer-events: none;
  }

  .shu {
    margin: 20px 0;
    border-bottom: 1px solid #9A9A9A;
  }

  .shupinw {
    /*width: 356px;*/
    height: 667px;
  }

  .skyk-3d {
    min-height: 600px;

    .tmp1-wrap {
      margin: 0 auto;
      .shupinw;

      .tmp1 {
        .shupinw;
      }
    }

    .topwrap {
      width: 70%;
    }
    .addButton{
      text-align: center;
    }

    .room-imgs {
      width: 23%;
      min-width: max-content;
    }
  }
</style>
