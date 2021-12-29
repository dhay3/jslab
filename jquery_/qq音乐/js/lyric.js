(function (window) {
    function Lyric(path) {
        return new Lyric.prototype.init(path);
    }

    Lyric.prototype = {
        constructor: Lyric,
        init: function (path) {
            this.path = path;
        },
        times: [],//存放时间
        lyrics: [],//存放歌词
        index: -1,
        //加载歌词
        loadLyric: function (callback) {
            var $this = this;
            $.ajax({
                url: $this.path,
                dataType: "text",
                success: function (data) {
                    // console.log(data);
                    $this.parseLyric(data);
                    //歌词解析完毕回调函数
                    callback();
                },
                error: function (e) {
                    alert(e);
                }
            });
        },
        //解析歌词
        parseLyric: function (data) {
            var $this = this;
            //清空上一首歌与歌词的内容
            $this.lyrics=[];
            $this.times=[];
            var array = data.split("\n");
            //定义正则对应[00:00.00]
            var timeReg = /\[(\d*:\d*\.\d*)\]/ //()表示子匹配返回正则和子匹配中的内容
            // 遍历取出每一条歌曲
            $.each(array, function (index, element) {
                //exec() 方法用于检索字符串中的正则表达式的匹配,返回一个数组
                var res = timeReg.exec(element);
                var lrc = element.split("\]")[1];
                //排除歌词为空的行
                if (lrc.length == 1) {
                    return true;
                }
                //取出一句歌词
                $this.lyrics.push(lrc);
                // console.log(res);
                if (res == null) {
                    return true;//相当于continue
                }
                var timeStr = res[1];    //取子匹配内容00:00.00
                var res2 = timeStr.split(":");
                var min = parseInt(res2[0]) * 60;
                var sec = parseFloat(res2[1]);//因为秒带毫秒所以专为float
                // var time = min + sec;
                var time = parseFloat(Number(min + sec).toFixed(2));
                // $this.times[index] = time;这里不能使用index的索引,数组的序号会有问题
                $this.times.push(time);
            });
            console.log($this.lyrics);
            console.log($this.times);
        },
        currentIndex: function (currentTime) {
            // console.log(currentTime);
            if (currentTime >= this.times[0]) {
                this.index++;
                this.times.shift();//移出数组中第一个
            }
            return this.index;
        }
    };
    Lyric.prototype.init.prototype = Lyric.prototype;
    window.Lyric = Lyric;
})(window);