<style lang="less">
    @import './login.less';
</style>

<template>
    <div class="login">
        <div class="login-con" style="background:rgba(28,25,93,0.13);border:1px solid rgba(184,181,247,1);border-radius:9px;padding: 20px;">
            <div style="width: 100%;text-align: center;color: #fff;font-size: 1.25rem;">登录</div>
            <div class="form-con">
                <login-form @on-success-valid="handleSubmit"></login-form>
                <p class="login-tip">输入任意用户名和密码即可</p>
            </div>
        </div>
    </div>
</template>

<script> 
import LoginForm from '_c/login-form'
import Vuex from 'vuex'
import { setToken, getToken } from '@/libs/util'
var qs = require('qs');
import {
  login,
  getUserInfo,
} from '@/api/user'
import {
  mapActions
} from 'vuex'
export default {
  components: {
    LoginForm
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    handleSubmit ({
      userName,
      password
    }) {
		/* 	 this.$store.commit('setToken', '123')
			this.$store.commit('setUserId', 'qwe')
			this.$router.push({
			   name: this.$config.homeName
			 }) */
    this.$http.post('index.php/gmlogin',{user:userName,pwd:password}).then(e=>{
        this.$Message.success("登录成功")
       setToken(e.token);
       this.$store.commit('setToken', e.token)
       this.$store.commit('setUserId', e.userId)
       this.$router.push({
          name: this.$config.homeName
        }) 
     })
    

     /* */
  /*   this.handleLogin({ 
        userName,
        password
      }).then(res => {
        this.getUserInfo().then(res => {
          this.$router.push({
            name: this.$config.homeName
          })
        })
      }) */
      
    }
  }
}
</script>

<style>

</style>
