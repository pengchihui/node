<template>
    <div class="user-avatar-dropdown">
        <Dropdown @on-click="handleClick">
            <Badge :dot="!!messageUnreadCount">
                <Avatar icon="ios-person"  />
            </Badge>
            <Icon :size="18" type="md-arrow-dropdown"></Icon>
            <DropdownMenu slot="list">
                <DropdownItem name="message">
                    个人设置
                </DropdownItem>
                <DropdownItem name="logout">退出登录</DropdownItem>
            </DropdownMenu>
        </Dropdown>


        <drag-drawer v-model="dragOff">
            <div>
                <Divider><div style="color: #fff;">平台账户管理</div></Divider>
                <skyk-input v-for="item in  dragList" disabled :title="item.title" :name="item.name" :value="item.value"></skyk-input>
               <!-- <div class="demo-drawer-footer" style="margin-top: 30px;">
                    <Button type="primary" long ghost @click="dragOff = false">确认</Button>
                </div> -->
            </div>
        </drag-drawer>
    </div>
</template>

<script>
    import DragDrawer from '_c/drag-drawer'
    import './user.less'
    import {
        mapActions
    } from 'vuex'
    export default {
        name: 'User',
        components: {
            DragDrawer
        },
        props: {
            userAvatar: {
                type: String,
                default: ''
            },
            messageUnreadCount: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                dragOff: false,
                dragList:[
                    {
                        name:'adminer_user',
                        title:'账户',
                        value:'',
                    },{
                        name:'adminer_name',
                        title:'昵称',
                        value:'',
                    },{
                        name:'adminer_time_out',
                        title:'注册时间',
                        value:'',
                    }
                ]
            }
        },
        mounted() {
          this.$http.post("index.php/pcset",{id:this.$store.state.user.userId}).then(e=>{
              e.adminer_time_out =  this.$at.dateFtt('yyyy-MM-dd',new Date(Number(e.adminer_time_out)*100))
              this.dragList.forEach(s=>{
                  s.value = e[s.name];
              })
          })  
        },
        methods: {
            ...mapActions([
                'handleLogOut'
            ]),
            logout() {
                this.$store.commit('setToken', '')
                this.$store.commit('setUserId', '')
                this.$store.commit('setAccess', [])
                this.$router.push({
                    name: 'login'
                })
            },
            message() {
               /* this.$router.push({
                    name: 'message_page'
                }) */
                this.dragOff=true
            },
            handleClick(name) {
                switch (name) {
                    case 'logout':
                        this.logout()
                        break
                    case 'message':
                        this.message()
                        break
                }
            }
        }
    }
</script>
