<template>
    <div class="tab-wrap setup">
        <Tabs value="my" type="card">
            <TabPane label="我的账户" name="my">
                <div class="flex">
                    <div class="setup-width">
                        <Divider>账户设置</Divider>
                    </div>
                    <div style="margin-left: 1%;width: 48%;">
                        <Divider>项目分布</Divider>
                    </div>
                </div>
                <div class="flex">
                    <div class="setup-width">
                        <skyk-input :key="index" v-for="(item,index) in  dragList" 
                        :title="item.title" :name="item.name" @input="dragInput" :type="item.type"
                        ></skyk-input> 
                        <div class="flex justify-center" style="margin-top: 30px;;">
                            <Button ghost @click="dragNo">取消</Button>
                            <div style="width: 50px;"></div>
                            <Button type="primary" ghost @click="dragSubmit">确认</Button>
                        </div>
                    </div>
                    <div class="setup-width">
                        <skyk-input title="项目数量" name="name"></skyk-input>
                        <div class="flex">
                            <div style="margin-right: 10px;width: 10%;text-align: right;line-height: 55px;min-width: 68px;">选择城市</div>
                            <div style="width: 90%;">
                               <Cascader :data="cdata"></Cascader>
                            </div>
                        </div>
                        <div class="flex justify-center" style="margin-top: 30px;;">
                            <Button ghost>取消</Button>
                            <div style="width: 50px;"></div>
                            <Button type="primary" ghost>确认</Button>
                        </div>
                    </div>
                </div>
            </TabPane>
            <TabPane label="平台账户设置" name="pintai">
                <Card>
                    <tables ref="tables" editable v-model="tableData" :columns="columns" @on-delete="handleDelete" />
                    <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button>
                </Card>
            </TabPane>
        </Tabs>

        <drag-drawer v-model="dragOff">
            <div class="skyk-dtag">
                <Divider>楼盘信息</Divider>
                <skyk-input title="楼盘名" name="name"></skyk-input>
                <skyk-input title="电话" name="phone"></skyk-input>
                <div>
                    <Divider>账号信息</Divider>
                    <skyk-input title="账号" name="username"></skyk-input>
                    <skyk-input title="密码" name="pwd"></skyk-input>
                </div>
                <div class="demo-drawer-footer" style="margin-top: 30px;">
                    <Button type="primary" long ghost @click="dragOff = false">确认</Button>
                </div>

            </div>
        </drag-drawer>
    </div>
</template>

<script>
    import cdata from '../../libs/city.data.js'
    import Tables from '_c/tables'
    import DragDrawer from '_c/drag-drawer'

    import {
        getTableData
    } from '@/api/data'
    export default {
        name: 'tables_page',
        components: {
            Tables,
            DragDrawer
        },
        data() {
            return {
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
                        name:'adminer_pwd',
                        title:'密码',
                        type:'password',
                        value:'',
                    },{
                        name:'adminer_newpwd',
                        title:'新密码',
                        value:'',
                        type:'password',
                    },{
                        name:'adminer_newpwd_two',
                        title:'确认新密码',
                        type:'password',
                        value:'',
                    }
                ],
                dragPojo:{},
                cdata: cdata,
                dragOff: false,
                columns: [{
                        title: '账户排序',
                        key: 'id',
                        align: 'center'
                    },
                    {
                        title: '用户名',
                        key: 'name',
                        align: 'center',
                        editable: true
                    }, {
                        title: '注册时间',
                        key: 'city',
                        align: 'center',
                        editable: true
                    },
                    {
                        title: '类型',
                        key: 'popularity',
                        align: 'center'
                    },
                    {
                        title: '操作',
                        key: 'handle',
                        align: 'center',
                        button: [
                            (h, params, vm) => {
                                return h('div', [
                                    h('Button', {
                                        props: {
                                            size: 'small'
                                        },
                                        style: {
                                            marginRight: '5px'
                                        },
                                        class: 'but-hn',
                                        on: {
                                            click: () => {
                                                this.onclcik(0, params.id)
                                            }
                                        }
                                    }, '编辑'),
                                    h('Button', {
                                        props: {
                                            size: 'small'
                                        },
                                        style: {
                                            marginRight: '5px'
                                        },
                                        class: 'but-hn',
                                        on: {
                                            click: () => {
                                                this.onclcik(1, params.id)
                                            }
                                        }
                                    }, '删除')
                                ])
                            }
                        ]
                    }
                ],
                tableData: [{
                        id: 0,
                        name: '用户名',
                        city: '2019-02-21',
                        popularity: '合作商',
                    },
                    {
                            id: 0,
                            name: '用户名',
                            city: '2019-02-21',
                            popularity: '合作商',
                        },{
                        id: 0,
                        name: '用户名',
                        city: '2019-02-21',
                        popularity: '合作商',
                    },{
                        id: 0,
                        name: '用户名',
                        city: '2019-02-21',
                        popularity: '合作商',
                    },{
                        id: 0,
                        name: '用户名',
                        city: '2019-02-21',
                        popularity: '合作商',
                    },
                ]
            }
        },
        methods: {
            dragSubmit(){
                for (var i = 0; i < this.dragList.length; i++) {
                    let s = this.dragList[i]
                    if(this.$at.isEmpty(this.dragPojo[s.name])){
                        this.$at.toast('请输入'+s.title);
                        return;
                    }
                }
                if(this.dragPojo.adminer_newpwd != this.dragPojo.adminer_newpwd_two){
                    this.$at.toast('两次新密码不一致,请重新输入');
                       return;
                }
                this.dragPojo.id = this.$store.state.user.userId;
                console.dir(this.dragPojo)
                this.$http.post('index.php/pcset',this.dragPojo).then(e=>{
                    console.dir(e)
                })
            },
            dragInput(e){
                this.dragPojo[e.name] =e.value;
            },
            dragNo(){
                this.dragPojo={};
            },
            onclcik(index, item) {
                switch (index) {
                    case 2:
                        this.dragOff = true;
                        break;
                    default:
                        break;
                }
            },
            handleDelete(params) {
                console.log(params)
            },
            exportExcel() {
                this.$refs.tables.exportCsv({
                    filename: `table-${(new Date()).valueOf()}.csv`
                })
            }
        },
        mounted() {
            /* getTableData().then(res => {
                        console.dir(res)
                        this.tableData = res.data
                    }) */
        }
    }
</script>

<style lang="less">

    .setup {
        .setup-width {
            width: 50%
        }

        .ivu-input {
            .bg;
            margin: 10px 0;
            border: 1px solid rgba(77, 77, 77, 1);
        }
    }

    .bg {
        background-color: rgba(13, 18, 44, 1);
    }

    .skyk-dtag {
        * {
            color: #fff !important;
        }

        .ivu-input {
            .bg;
            margin: 10px 0;
            border: 1px solid rgba(77, 77, 77, 1);
        }

    }

    .ivu-drawer-content {
        background-color: #0D122C;
    }

    .tab-wrap .ivu-card {
        background: none !important;
    }

    .tab-wrap .ivu-card-bordered {
        border: none;
        border-color: transparent;
    }

    .tab-wrap .ivu-table {
        background: none !important;
    }

    .tab-wrap .ivu-table {
        background: none !important
    }

    .tab-wrap * {
        background: none!important;
        color: #FFFFFF;

    }

    .tab-wrap .ivu-table-wrapper {
        border: none;
    }

    .tab-wrap .but-hn {
        color: #00C6FF !important;
        border: none;
    }

    .tab-wrap .but-hn span {
        color: #00C6FF !important;
    }

    .tab-wrap .ivu-table-tbody .ivu-table-column-center {
        border-color: #9A9A9A !important;
    }
  .ivu-cascader-menu{
    background: #0b0c22!important;
  }
</style>
