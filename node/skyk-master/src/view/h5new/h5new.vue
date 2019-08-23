<template>
  <div class="h5-wrap">
    <div class="flex ">
      <Card class="h5-card">
        <div style="text-align:center">
          <div class="top">
            <Input placeholder="请输入楼盘名称" v-model="lists_name"></Input>
          </div>
          <Button @click="jump()" type="primary" class="h5-but">启用该模板</Button>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
// import hed from '@/view/h5new/h5edit.vue'

export default {
  data () {
    return {
      lists_name: ''
    }
  },
  computed: {},
  methods: {
    jump () {
      if (this.$at.isEmpty(this.lists_name)) {
        this.$Message.error('请输入楼盘名称')
        return
      }
      this.$http.post('index.php/H5select', { lists_name: this.lists_name }).then(e => {
        this.$router.push({ name: 'h5edit', params: { id: e } })
      })
    }
  }

}
</script>

<style lang="less">
  .h5-wrap {
    width: 100%;

    .flex {
      flex-wrap: wrap;
    }

    .h5-card {
      width: 210px;
      height: 200px;
      margin: 0.625rem;
      border: none;

      .top {
        height: 140px;
        line-height: 140px;
      }

      button {
        background-color: rgba(33, 109, 188, 1)
      }
    }
  }
</style>
