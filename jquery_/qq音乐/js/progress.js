//进度条类(时间进度条与声音进度条)
(function (window) {
    function Progress($progressBar, $progressLine, $progressDot) {
        return new Progress.prototype.init($progressBar, $progressLine, $progressDot);
    }

    Progress.prototype = {
        constructor: Progress,
        init: function ($progressBar, $progressLine, $progressDot) {
            this.$progressBar = $progressBar;
            this.$progressLine = $progressLine;
            this.$progressDot = $progressDot;
        },
        //是否拖动的变量，拖拽的时候为真
        isMove: false,
        // isClick:false,
        //event表示事件被触发时
        progressClick: function (callback) {
            var $this = this;//这个this指的是new出来的progress
            //监听背景的点击（当前点击位置-bar距离窗口左边的距离）=
            this.$progressBar.click(function (event) {
                event.stopPropagation();
                //获取背景距离窗口的默认位置
                var left = $(this).offset().left;//这个this指的是progressBar
                // console.log(left);
                //获取点击的位置
                var pageX = event.pageX;
                // console.log(pageX);
                //获取比例
                var rate = (pageX - left) / $(this).width();
                //设置前景的宽度
                $this.$progressLine.css("width", pageX - left);
                $this.$progressDot.css("left", pageX - left);
                //return会就近原则返回里面的函数而不是外面大的函数
                callback(rate);
            });
            // $this.$progressBar.mousedown(function () {
            //     $(document).off("mouseup");
            // });
            // $this.$progressBar.mouseup(function () {
            //     $(document).off("mouseup");
            // });
            // console.log("click2");
        },
        //鼠标拖拽
        progressMove: function (callback) {
            //一个mousedown,一个mouseup
            var $this = this;
            // if ($this.isClick);return;
            //监听鼠标点下
            var left = $this.$progressBar.offset().left;
            var pageX;
            this.$progressDot.mousedown(function () {
                // event.stopPropagation();
                // left = $(this).offset().left;
                $this.isMove = true;
                //监听鼠标移动
                $(".footer").mousemove(function (event) {
                    // event.stopPropagation();
                    pageX = event.pageX;
                    //判断进度条的0p和100p
                    // if (pageX-left>=0&&pageX-left<=$this.$progressBar.width()){
                    //     $this.$progressLine.css("width", pageX - left);
                    //     $this.$progressDot.css("left", pageX - left);
                    // }
                    if (pageX - left <= 0) {
                        pageX = left;
                    } else if (pageX - left >= $this.$progressBar.width()) {
                        pageX = left + $this.$progressBar.width();
                    }
                    $this.$progressLine.css("width", pageX - left);
                    $this.$progressDot.css("left", pageX - left);
                });
            });
            //无法解决！！！
            //监听鼠标抬起(每次都会调用up,因为监听了document,click中的callback与这里的callback冲突了)
            $(".footer").mouseup(function (event) {
                //必须再获取一次pageX,因为点击了documnet就会调用mouseup但是pagex还是move中的所以一直会回退
                // pageX = event.pageX;
                //鼠标抬起删除mousemove方法
                $(this).off("mousemove");
                $this.isMove = false;
                // var rate;
                var rate=(pageX - left) / $this.$progressBar.width();
                callback(rate);
            });
        },
        //歌曲自动播放设置进度条
        setProgress: function (value, callback) {
            //移动的时候不调用,防止移动与自动播放两个回调函数同时使用
            if (this.isMove) return;
            //自动播放如果超出0p或100p时
            if (value < 0 || value > 100) return;
            this.$progressLine.css({
                width: value + "%"
            });
            this.$progressDot.css({
                left: value + "%"
            });
            callback(value);
        }
    };
    Progress.prototype.init.prototype = Progress.prototype;
    window.Progress = Progress;
})(window);