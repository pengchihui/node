import axios from 'axios';
var qs = require('qs')
import config from '@/config'
import iView from 'iview'
import store from '@/store'
import { setToken, getToken } from '@/libs/util'
import at from '@/libs/at.js'
export default {
    baseUrl: process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro,
    create() {
        return axios.create({
            baseURL: this.baseUrl,
            timeout: 5000,
            headers: {
                token:store.state.user.token,
                userId:store.state.user.userId
            }
        });
    },
    post(url,data){
        if(at.WU.isEmpty(data)){
            data = {}
        }else{
           data = qs.stringify(data)
        }
        return new Promise((resolve, reject) => {
             return this.create().post(url, data ).then(e=>{
                e = e.data;
                if(Number(e.code) == 1){
                    resolve(e.data)
                }else{
                    iView.Message.error(e.msg)
                    reject(e.msg)
                }
            }).catch(e=>{
                iView.Notice.error({title:'服务出错',desc:'请重试'})
                reject()
            });
        })
    },
     get(url){
        return new Promise((resolve, reject) => {
             return this.create().get(url).then(e=>{
                e = e.data;
                if(Number(e.code) == 1){
                    resolve(e.data)
                }else{
                    iView.Message.error(e.msg)
                    reject(e.msg)
                }
            });
        })
    }
}
