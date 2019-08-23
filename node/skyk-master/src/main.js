// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
import i18n from '@/locale'
import config from '@/config'
import importDirective from '@/directive'
import {
    directive as clickOutside
} from 'v-click-outside-x'
import installPlugin from '@/plugin'
import './index.less'
import '@/assets/icons/iconfont.css'
import TreeTable from 'tree-table-vue'
import VOrgTree from 'v-org-tree'
import 'v-org-tree/dist/v-org-tree.css'
import '../my-theme/index.less'
import SkykInput from '@/components/new-page/skyk-input.vue'
	import SkykUpload from "@/components/skykupload/skykupload.vue"
import VueDND from 'awe-dnd'
import axios from 'axios';
import http from '@/libs/http.js';
var instance = axios.create({
    baseURL: '',
    timeout: 5000,
    headers: {
        'sdsds': 'tonesdsd'
    }
});
import at from '@/libs/at.js'

import VueVideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
// 实际打包时应该不引入mock 13, 18, 44
/* eslint-disable */
if (process.env.NODE_ENV !== 'production') require('@/mock')

Vue.use(iView, {
    i18n: (key, value) => i18n.t(key, value)
})
Vue.use(VueDND)
Vue.use(TreeTable)
Vue.use(VOrgTree)
Vue.use(VueVideoPlayer)

Vue.component('skyk-input', SkykInput);
Vue.component('skyk-upload', SkykUpload);

/**
 * @description 注册admin内置插件
 */
installPlugin(Vue)
/**
 * @description 生产环境关掉提示
 */
Vue.config.productionTip = false
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config
Vue.prototype.$axios = instance
Vue.prototype.$http = http
Vue.prototype.$at = at.WU

/**
 * 注册指令
 */
importDirective(Vue)
Vue.directive('clickOutside', clickOutside)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    i18n,
    store,
    render: h => h(App)
})
