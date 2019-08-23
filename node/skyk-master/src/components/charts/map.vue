<template>
    <div ref="dom" class="charts chart-bar"></div>
</template>

<script>
    import echarts from 'echarts'
    import tdTheme from './theme.json'
    import '../../../node_modules/echarts/map/js/china.js'
    // import hunan from '../../../node_modules/echarts/map/js/hunan.js'
    var provinces = ['shanghai', 'hebei', 'shanxi', 'neimenggu', 'liaoning', 'jilin', 'heilongjiang', 'jiangsu',
        'zhejiang', 'anhui', 'fujian', 'jiangxi', 'shandong', 'henan', 'hubei', 'hunan', 'guangdong', 'guangxi',
        'hainan', 'sichuan', 'guizhou', 'yunnan', 'xizang', 'shanxi1', 'gansu', 'qinghai', 'ningxia', 'xinjiang',
        'beijing', 'tianjin', 'chongqing', 'xianggang', 'aomen'
    ];

    var mapList = {
        '上海': 'shanghai',
        '河北': 'hebei',
        '山西': 'shanxi',
        '内蒙古': 'neimenggu',
        '辽宁': 'liaoning',
        '吉林': 'jilin',
        '黑龙江': 'heilongjiang',
        '江苏': 'jiangsu',
        '浙江': 'zhejiang',
        '安徽': 'anhui',
        '福建': 'fujian',
        '江西': 'jiangxi',
        '山东': 'shandong',
        '河南': 'henan',
        '湖北': 'hubei',
        '湖南': 'hunan',
        '广东': 'guangdong',
        '广西': 'guangxi',
        '海南': 'hainan',
        '四川': 'sichuan',
        '贵州': 'guizhou',
        '云南': 'yunnan',
        '西藏': 'xizang',
        '陕西': 'shanxi1',
        '甘肃': 'gansu',
        '青海': 'qinghai',
        '宁夏': 'ningxia',
        '新疆': 'xinjiang',
        '北京': 'beijing',
        '天津': 'tianjin',
        '重庆': 'chongqing',
        '香港': 'xianggang',
        '澳门': 'aomen',
    }
    var provincesText = ['上海', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北',
        '湖南', '广东', '广西', '海南', '四川', '贵州', '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆', '北京', '天津', '重庆', '香港', '澳门'
    ];

    import {
        on,
        off
    } from '@/libs/tools'
    echarts.registerTheme('tdTheme', tdTheme)
    export default {
        name: 'ChartMap',
        props: {
            text: String,
            subtext: String
        },
        data() {
            return {
                dom: null
            }
        },
        methods: {
            // 展示对应的省
            showProvince(pName, Chinese_) {
                if (typeof(pName) == "undefined") {
                        this.initMap(null);
                } else {
                    import('../../../node_modules/echarts/map/js/province/' + pName + '.js').then(() => {
                        this.initMap(Chinese_);
                    })
                }

            },
            loadBdScript(scriptId, url, callback) {
                var script = document.createElement("script");
                script.type = "text/javascript";
                if (script.readyState) { //IE
                    script.onreadystatechange = function() {
                        if (script.readyState === "loaded" || script.readyState === "complete") {
                            script.onreadystatechange = null;
                            callback();
                        }
                    };
                } else { // Others
                    script.onload = function() {
                        callback();
                    };
                }
                script.src = url;
                script.ref = scriptId;
                document.getElementsByTagName("head")[0].appendChild(script);
            },
            resize() {
                this.dom.resize()
            },
            initMap(name) {
                name = name === null ? 'china' : name;
                let option = { // 进行相关配置
                    backgroundColor: '',
                    tooltip: {
                      trigger: 'item',
                      // formatter:function (params) {
                      //   var res = '';
                      //   res+=params['provincesText'].length+'</br>';
                      //   res+='用户数' +' : '+params['provincesText'].value2+'</br>';
                      //   return res;
                      // }
                    }, // 鼠标移到图里面的浮动提示框
                    dataRange: {
                        show: false,
                        min: 0,
                        max: 1000,
                        text: ['High', 'Low'],
                        realtime: true,
                        calculable: true,
                        color: ['orangered', 'yellow', 'lightskyblue']
                    },
                    animation:true,
                    geo: { // 这个是重点配置区
                        map: name, // 表示中国地图
                        zoom: 1.1,
                        selectedMode: 'single',
                        roam: true,
                        label: {
                            normal: {
                                show: true, // 是否显示对应地名
                                textStyle: {
                                    color: '#fff',
                                }
                            },
                          emphasis: {
                            show: true,//对应的鼠标悬浮效果
                            textStyle:{color:"#fff"}
                          }
                        },
                        itemStyle: {
                            normal: {
                                borderColor: '#ddd',
                                areaColor:'#216dbc'
                            },
                            emphasis: {
                                areaColor: null,
                                shadowOffsetX: 0,
                                shadowOffsetY: 0,
                                shadowBlur: 20,
                                borderWidth: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)',
                                color: "#57a3f3"
                            }
                        }
                    },
                }
                this.dom = echarts.init(this.$refs.dom, 'tdTheme')
                this.dom.setOption(option)
                this.dom.off('click')
                this.dom.on('click', (e) => {
                    this.dom.clear();
                    this.showProvince(mapList[e.name], e.name);
                })
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.initMap(null);
            })
        },
        beforeDestroy() {
            off(window, 'resize', this.resize)
        }
    }
</script>
