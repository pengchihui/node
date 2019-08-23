<template>
    <div>
        <div class="flex but-topwrap">
            <div class="but-tile">{{title}}</div>
            <div class="but-inp">
                <Input v-if="value===''" :placeholder="`请输入${title}`" @input="input" :type="type" :disabled="disabled" />
                <Input v-else :value="value" @input="input" :disabled="disabled" />
            </div>
        </div>
    </div>
</template>
<script>
// skyk-input
export default {
  name: 'SkykInput',
  props: {
    title: String,
    name: String,
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    }
  },
  data () {
    return {}
  },
  computed: {},
  methods: {
    input (e) {
      let obj = {
        name: this.name,
        value: e
      }
      this.$emit('input', obj)
    }
  }
}
</script>
<style lang="less">
    .but-topwrap {
        * {
            color: #fff;
        }

        .but-tile {
            width: 10%;
            min-width: 68px;
            text-align: right;
            line-height: 55px;
            margin-right: 10px;
        }

        .but-inp {
            width: 90%
        }
    }

    .bg {
        background-color: rgba(13, 18, 44, 1);
        color: #fff;
    }

    .ivu-input {
        .bg;
        margin: 10px 0;
        border: 1px solid rgba(77, 77, 77, 1);
    }
</style>
