<template>
    <div class="tab-wrap">
        <Card>
            <tables ref="tables" editable v-model="tableData" :columns="columns" @on-delete="handleDelete" />
            <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button>
        </Card>
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
                   <Button type="primary" long  ghost @click="value3 = false">确认</Button>
               </div>
           </div>
        </drag-drawer>
    </div>
</template>

<script>
    import Tables from '_c/tables'
    import DragDrawer from '_c/drag-drawer'
    import {baseApi} from '@/libs/util'
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
                dragOff: false,
                columns: [{
                        title: '楼盘编号',
                        key: 'lists_id',
                        align: 'center'
                    },
                    {
                        title: '楼盘主图',
                        key: 'lists_backimg',
                        align: 'center',
                        render: (h, params) => {
                            console.dir(params.row.lists_backimg)
                            return h('img', {
                                attrs: {
                                    src: baseApi()+params.row.lists_backimg
                                },
                                style: {
                                    width: '100px',
                                    height: '100px'
                                }
                            })
                        }
                    },
                    {
                        title: '楼盘名称',
                        key: 'lists_floor',
                        align: 'center',
                        editable: true
                    }, {
                        title: '城市',
                        key: 'lists_city',
                        align: 'center',
                        editable: true
                    },
                    {
                        title: '楼盘人气',
                        key: 'lists_sum',
                        align: 'center'
                    },
                     {
                        title: '经度',
                        key: 'lists_longitude',
                        align: 'center'
                    },
                     {
                        title: '纬度',
                        key: 'lists_latitude',
                        align: 'center'
                    },
                    {
                        title: '楼盘链接',
                        key: 'lists_link',
                        align: 'center'
                    },
                    {
                        title: '制作时间',
                        key: 'lists_creat',
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
                                                this.onclcik(0, params.row.lists_id,params.index)
                                                console.log(params.row.lists_id)
                                                console.log(params.index)
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
                                                this.onclcik(1, params.row.lists_id)
                                            }
                                        }
                                    }, '预览'),
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
                                                this.onclcik(2, params.row.lists_id)
                                            }
                                        }
                                    }, '设置账号'),
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
                                                this.onclcik(3, params.row.lists_id)
                                            }
                                        }
                                    }, '删除')
                                ])
                            }
                        ]
                    }
                ],
                tableData: []
            }
        },
        mounted() {
            this.$http.post("index.php/loupan").then(e=>{
                this.tableData =e.lists
            })
        },
        methods: {
            onclcik(mark, id,index) {
                console.log(mark)
                switch (mark) {
                    case 2:
                        this.dragOff = true;
                        break;
                        case 3:
                            this.delList(id,index);
                            break;
                    default:
                        break;
                }
            },
            delList(id,index){
                this.$Modal.confirm({
                    title:'确定要删除?',
                    loading:true,
                    onOk:()=>{
                        this.$http.post("index.php/pcmanageshan?id="+id,{lists_id:id}).then(e=>{
                            this.tableData.splice(id,1);
                            this.$Notice.success({title:'删除成功'})
                            this.$http.post("index.php/loupan").then(e=>{
                            this.tableData =e.lists
                          })
                        }).catch(e=>{
                            this.$Modal.remove()
                        })
                    },
                    onCancel:()=>{
                        
                    }
                })
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
    }
</script>

<style lang="less">
     .bg {
        background-color: rgba(13, 18, 44, 1);
    }
    .skyk-dtag {
        *{
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
        background: #0b0c22!important;
    }

    .tab-wrap .ivu-card-bordered {
        border: none;
        border-color: transparent;
    }

    .tab-wrap .ivu-table {
        background: none !important;
    }

    .tab-wrap .ivu-table {
        background: none !important;
    }

    .tab-wrap * {
        background: none !important;
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
</style>
