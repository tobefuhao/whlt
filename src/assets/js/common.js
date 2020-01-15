let commonJs = {
    getDpr() {
        let isIPhone = window.navigator.appVersion.match(/iphone/gi);
        let devicePixelRatio = window.devicePixelRatio;
        let itemHeight = 0;
        //   console.log(devicePixelRatio);
        if (isIPhone) {
            // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
            if (devicePixelRatio >= 3) {
                itemHeight = 170;
            } else if (devicePixelRatio >= 2) {
                itemHeight = 95;
            } else {
                itemHeight = 44;
            }
        } else {
            // 其他设备下，仍旧使用1倍的方案
            itemHeight = 44;
        }
        return itemHeight;
    },
    getTime(time) {
        let now = new Date().getTime();
        let y = new Date(parseInt(time) * 1000).getFullYear();
        let m = new Date(parseInt(time) * 1000).getMonth() + 1;
        let d = new Date(parseInt(time) * 1000).getDate();
        let miu = now - time * 1000;
        let day = Math.floor(miu / 1000 / 60 / 60 / 24);
        let hour = Math.floor((miu / 1000 / 60 / 60) % 24);
        let min = Math.floor((miu / 1000 / 60) % 60);
        let second = Math.floor((miu / 1000) % 60);
        if (day != 0) {
            if (day == 1) {
                return "昨天";
            } else if (day == 2) {
                return "前天";
            } else {
                if (d > 0 && d < 10) {
                    d = "0" + String(d);
                }
                if (m > 0 && m < 10) {
                    m = "0" + String(m);
                }
                return y + "-" + m + "-" + d;
            }
        } else if (hour != 0) {
            return hour + "小时前";
        } else if (min != 0) {
            return min + "分钟前";
        } else {
            return second + "秒前";
        }
    },
    checkPhone(tel) {
        if (!(/^1[3456789]\d{9}$/.test(tel))) {
            return false;
        } else {
            return true;
        }
    }
};
export default commonJs;
