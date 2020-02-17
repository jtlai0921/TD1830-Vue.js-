var Time = {
    // 取得目前時間戳
    getUnix: function () {
        var date = new Date();
        return date.getTime();
    },
    // 取得今天0點0分0秒的時間戳
    getTodayUnix: function () {
        var date = new Date();
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date.getTime();
    },
    // 取得今年1月1日0點0分0秒的時間戳
    getYearUnix: function () {
        var date = new Date();
        date.setMonth(0);
        date.setDate(1);
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date.getTime();
    },
    // 取得標准年月日
    getLastDate: function(time) {
        var date = new Date(time);
        var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
        var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        return date.getFullYear() + '-' + month + "-" + day;
    },
    // 轉換時間
    getFormatTime: function(timestamp) {
        var now = this.getUnix();    //目前時間戳
        var today = this.getTodayUnix(); //今天0點時間戳
        var year = this.getYearUnix();   //今年0點時間戳
        var timer = (now - timestamp) / 1000;   // 轉為秒級時間戳
        var tip = '';

        if (timer <= 0) {
            tip = '剛剛';
        } else if (Math.floor(timer/60) <= 0) {
            tip = '剛剛';
        } else if (timer < 3600) {
            tip = Math.floor(timer/60) + '分鍾前';
        } else if (timer >= 3600 && (timestamp - today >= 0) ) {
            tip = Math.floor(timer/3600) + '小時前';
        } else if (timer/86400 <= 31) {
            tip = Math.ceil(timer/86400) + '天前';
        } else {
            tip = this.getLastDate(timestamp);
        }
        return tip;
    }
};

export default {
    bind: function (el, binding) {
        el.innerHTML = Time.getFormatTime(binding.value * 1000);
        el.__timeout__ = setInterval(function() {
            el.innerHTML = Time.getFormatTime(binding.value * 1000);
        }, 60000);
    },
    unbind: function (el) {
        clearInterval(el.__timeout__);
        delete el.__timeout__;
    }
}