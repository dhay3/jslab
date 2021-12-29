//js匿名函数,第一个window表示形参,第二个表示传进去的实参,立即执行函数,为了不污染全局环境
//播放按钮的类
//工具封装类
(function (window) {
    //定义一个类
    function Player($audio) {
        return new Player.prototype.init($audio);
    }

    //修改类的原型
    Player.prototype = {
        constructor: Player,
        //定义一个空变量用于保存数据
        musicList: [],
        //属性化函数
        init: function ($audio) {
            this.$audio = $audio;//这里的this表示init类,给init类添加$audio和audio属性
            this.audio = $audio.get(0);//把jquery对象转成dom对象
        },
        currentIndex: -1,//用来存放当前索引
        //播放音乐(只有在new时才调用audio)
        playMusic: function (index, music) {
            //判断是不是同一首歌
            if (this.currentIndex == index) {//这里的this指的是类
                //同一首歌
                if (this.audio.paused) {//判断是否暂停
                    this.audio.play();//html才有play与pause方法
                } else {
                    this.audio.pause();
                }
            } else {
                //不是同一首歌
                this.$audio.attr("src", music.link_url);//设置src
                this.audio.play();
                this.currentIndex = index;
            }
        },
        //上一首的索引
        preIndex: function () {
            var index = 0;
            if (this.currentIndex == 0) {
                index = this.musicList.length - 1;
            } else {
                index = this.currentIndex - 1;
            }
            return index;
        },
        //下一首的索引
        nexIndex: function () {
            var index = 0;
            if (this.currentIndex == this.musicList.length - 1) {
                index = 0;
            } else {
                index = this.currentIndex + 1;
            }
            return index;

        },
        //删除对应jason文件中的音乐列表
        changeMusic: function (index) {
            //splice第一个参数是位置,第二个参数是删除几个(如果是0就表示不删除),第三个参数表示添加新的
            this.musicList.splice(index, 1);//删除数组中指定的对象
            //判断删除的是否是当前播放的前面的音乐
            if (index < this.currentIndex) {
                this.currentIndex--;
            }
        },
        // //获取当前播放音乐的总时间,只有原生的audio（dom）才有duration和currentTime
        // getMusicDuration:function () {
        //     return this.audio.duration;
        // },
        // //获取当前播放音乐的时间
        // getCurrentTime:function () {
        //     return this.audio.currentTime;
        // },
        musicTimeUpdate: function (callback) {
            var $this = this;
            this.$audio.on("timeupdate", function () {
                var currentTime = $this.audio.currentTime;//当前时间
                var musicDuration = $this.audio.duration;//总时长
                // console.log(currentTime,musicDuration);//得到的是秒
                var time = $this.formatTime(currentTime);
                // console.log(time[0] + ":" + time[1] + "/" + time[2] + ":" + time[3]);
                $("#s1").text(time[0] + ":" + time[1]);
                //传进去的callback是一个函数(即回调函数)
                callback(currentTime, musicDuration);//这里表示运行函数
            })
        },
        //格式化时间
        formatTime: function (currentTime) {
            var curMin = parseInt(currentTime / 60);
            var curSec = parseInt(currentTime % 60);
            if (curMin < 10) {
                curMin = "0" + curMin;
            }
            if (curSec < 10) {
                curSec = "0" + curSec;
            }
            // var endMin = parseInt(musicDuration / 60);
            // var endSec = parseInt(musicDuration % 60);
            // if (endMin < 10) {
            //     endMin = "0" + endMin;
            // }
            // if (endSec < 10) {
            //     endSec = "0" + endSec;
            // }
            var time = [curMin, curSec];
            // return min+":"+sec;//效果一样
            return time;
        },
        //设置进度条点击和拖拽的比率
        musicSeekTo: function (rate) {
            if (isNaN(rate))return;
            if (rate<0||rate>1)return;
            // if (rate==0){
            //
            // }
            // if (rate==1){
            //
            // }
            this.audio.currentTime=this.audio.duration*rate;
            // this.audio.play();
        },
        //设置音量的图标的点击和音量比例
        musicVoiceSeekTo:function (value) {
            if (isNaN(value))return;
            if (value<0||value>1)return;
            //volume取值范围0~1
            this.audio.volume =value;
        }
    };

    Player.prototype.init.prototype = Player.prototype;
    //把Player方法绑定给全局中的Player(把闭包中需要暴露给外界使用的东西,变成全局变量)
    window.Player = Player;
})(window);