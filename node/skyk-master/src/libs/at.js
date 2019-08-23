import iView from 'iview'
var WU = {
      isEmpty: function isEmpty(obj) {
        return obj == undefined || obj == null || obj == "undefined" || obj == "null" || typeof obj == "string" &&
            obj.trim() ==
            "";
    }, 
    isNotEmpty(obj){
    	return !WU.isEmpty(obj);
    },
     /**
     * 日期格式化
     * 使用 dateFtt("yyyy-MM-dd hh:mm:ss",e)
     * @param fmt 格式化
     * @param date 时间，可为空
     * @returns {*}
     */
    dateFtt: function dateFtt(fmt, date) {
        if (WU.isEmpty(date)) {
            date = new Date();
        }
        date = new Date(date);
        var o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "h+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] :
                ("00" + o[k])
                .substr(("" + o[k]).length));
        }
        return fmt;
    },
    isEmptyTo: function isEmpty(obj, res) {
        return WU.isEmpty(obj) ? res : obj;
    },
    toast(title,desc){
        iView.Notice.error({title:title,desc:desc})
    },
    // arr原始数组，name 根据分组的字段
    group: function(arr, name) {
        var map = {},
            dest = [];
        for (var i = 0; i < arr.length; i++) {
            var ai = arr[i];
            ai[name] = ai[name] == null ? '其他' : ai[name];
            if (!map[ai[name]]) {
                dest.push({
                    name: ai[name],
                    list: [ai]
                });
                map[ai[name]] = ai;
            } else {
                for (var j = 0; j < dest.length; j++) {
                    var dj = dest[j];
                    if (dj.name == ai[name]) {
                        dj.list.push(ai);
                        break;
                    }
                }
            }
        }
        return dest;
    },
}

export default {
    WU
}
