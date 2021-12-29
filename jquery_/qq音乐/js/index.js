$(
    function () {
        var $lyric;
        var $lyricContainer;
        var $progress;
        var $vProgress;
        var $musicPlay;
        var $audio;
        var $player;
        //设置a不可移动
        $(document).delegate("a", "mousedown", function () {
            // $(this).get(0).ondragstart = function () {
            //     return false;
            // };
            $(this).on("dragstart",function () {//ondragstart 是事件
                    return false
            })
        });
        //设置dot鼠标为手
        $(".progress_dot").css({
            cursor: "pointer"
        });
        //修改默认样式的scrollbar
        $("#content_list").mCustomScrollbar({
            //效果与设置html一样
            theme: "minimal-dark"
        });
        // $(".lyric_div").mCustomScrollbar({
        //     //效果与设置html一样
        //     theme: "minimal-dark"
        // });

        getPlayer();

        //加载歌曲列表
        function getPlayer() {
            //利用ajax方法动态创建音乐列表
            $.ajax({
                //资源定位，请求地址
                //如果不加/表示项目根目录（端口加+项目名），如果加/表示服务器根目录（端口）
                url: "js/musiclist.json",
                //希望结果返回的类型（xml,html,script,json,text,jsonp）
                dataType: "json",//json是数据传输格式
                //数据加载成功调用函数(参数data是返回的结果,这里是json对象)
                success: function (data) {
                    //把数据赋值给Player的musicList属性
                    $player.musicList = data;
                    // console.log(data);
                    //遍历获取到的数据创建每一条音乐
                    $.each(data, function (index, element) {
                        var $item = createMusic(index, element);
                        $("#content_list ul").append($item);
                    });
                    //加载第一首歌信息
                    initMusicInfo(data[0]);
                    initLyric(data[0]);
                },
                //数据加载失败调用函数
                error: function (e) {
                    alert(e);
                    // console.log(e);
                }
            });
        }

        //初始化歌曲信息
        function initMusicInfo(music) {
            $(".song_info_name_a").html(music.name);
            $(".song_info_singer_b").html(music.singer);
            $(".song_info_album_c").html(music.album);
            $(".song_info_pic>img").attr("src", music.cover);
            $(".progress_name").html(music.name + "/" + music.singer);
            $("#s2").html("/" + music.time);
            $(".mask_bg").css({
                background: "url('" + music.cover + "')",
                //必须设置background-size
                backgroundSize: "cover"
            });
            // $("audio").attr("src", music.link_url);
        }

        //初始化歌词
        function initLyric(music) {
            //传入歌词url路径
            $lyric = new Lyric(music.link_lrc);
            $lyricContainer = $(".song_lyric");
            $lyricContainer.children().remove();
            $lyric.loadLyric(function () {
                //创建歌词列表
                $.each($lyric.lyrics, function (index, element) {
                    //添加歌词
                    // var $item = $("<li>" + element + "<\li>");//注意斜杠啊啊啊!!!
                    var $item = $("<li>" + element + "</li>");
                    $lyricContainer.append($item);
                });
                // console.log($lyric.lyrics.length);
            });

        }

        // $(".lyric_div").delegate(".song_lyric", "click", function () {
        //     console.log($(".song_lyric").find("li").length);//100
        // });

        //创建一条歌曲目录的方法
        function createMusic(index, music) {
            // 创建一个jqury对象
            var $item = $("<li class=\"list_music\">\n" +
                "                        <div class=\"list_check\"><i></i></div>\n" +
                "                        <div class=\"list_number\">" + (index + 1) + "</div>\n" +
                "                        <div class=\"list_name\">" + music.name + "\n" +
                "                            <div class=\"list_menu\">\n" +
                "                                <a href=\"javascript:;\" title=\"播放\" class='list_menu_play'></a>\n" +
                "                                <a href=\"javascript:;\" title=\"添加\"></a>\n" +
                "                                <a href=\"javascript:;\" title=\"下载\"></a>\n" +
                "                                <a href=\"javascript:;\" title=\"分享\"></a>\n" +
                "                            </div>\n" +
                "                        </div>\n" +
                "                        <div class=\"list_singer\">" + music.singer + "</div>\n" +
                "                        <div class=\"list_time\">\n" +
                "                            <span>" + music.time + "</span>\n" +
                "                            <a href=\"javascript:;\" title=\"删除\" class='list_del'></a>\n" +
                "                        </div>\n" +
                "                    </li>");
            //get(0)表示获取第0个索引的DOM对象(可以用html的方法操作该对象而不是jquery的)
            $item.get(0).index = index;//给每个li的dom对象添加index和music属性并把参数赋值进去
            // $item.index= index;
            $item.get(0).music = music;//这里的index与music每一个dom都是独立的
            // $item.music = music;
            return $item;
        }

        //获取音频对象
        $audio = $("audio");
        $player = new Player($audio);//new的对象必须是放在全局中的否则获取不到

        initProgress();

        //初始化进度条
        function initProgress() {
            var $progressBar = $(".progress_bar");
            var $progressLine = $(".progress_line");
            var $progressDot = $(".progress_dot");
            $progress = new Progress($progressBar, $progressLine, $progressDot);
            $progress.progressClick(function (rate) {
                $player.musicSeekTo(rate);
            });
            $progress.progressMove(function (rate) {
                $player.musicSeekTo(rate);
            });
            var $voiceBar = $(".music_voice_bar");
            var $voiceLine = $(".music_voice_line");
            var $voiceDot = $(".music_voice_dot");
            $vProgress = new Progress($voiceBar, $voiceLine, $voiceDot);
            $vProgress.progressClick(function (rate) {
                $player.musicVoiceSeekTo(rate);
            });
            $vProgress.progressMove(function (rate) {
                $player.musicVoiceSeekTo(rate);
            });
            //监听时间的进度
            $player.musicTimeUpdate(
                //这里面的currentTime和musicDuration的值随意
                function (currentTime, musicDuration) {
                    //获取进度条百分比数值
                    var rate = currentTime / musicDuration * 100;
                    //同步进度条
                    $progress.setProgress(rate, function () {
                        //如果当前这首歌进度到100%时自动播放下一首歌
                        if (rate == 100) {
                            var number = $player.nexIndex();
                            //下一首歌重新设置比例为0
                            rate = 0;
                            $(".list_music").eq(number).find(".list_menu_play").trigger("click");
                        }
                    });//进度条不断回弹（同时调用两个回调函数）
                    //歌词同步
                    var index = $lyric.currentIndex(currentTime);
                    // console.log(currentTime, index);
                    var $item = $(".song_lyric li").eq(index);
                    $item.addClass("cur");
                    $item.siblings().removeClass("cur");
                    if (index <= 2) {
                        return;
                    }
                    //等于子元素一直往上移动
                    $(".song_lyric").css({
                        marginTop: (-(index - 2) * 35)
                    })
                }
            );
        }

        initEvent();

        //初始化监听事件
        function initEvent() {
            //监听鼠标移入移出歌曲菜单栏
            // $(".list_music").hover(function () {
            //     //移入显示子菜单,这里不能用children()因为这是子孙级
            //     // $(this).find(".list_menu").css("display","block");
            //     $(this).find(".list_menu").stop().fadeIn(100);
            //     $(this).find(".list_time>a").stop().fadeIn(100);
            //     //隐藏时长
            //     // $(this).find(".list_time>span").css("display","none");
            //     $(this).find(".list_time>span").stop().fadeOut(100);
            //     // $(this).siblings("list_check").css("opacity",1);
            //     $(this).children().css("opacity", 1);
            // }, function () {
            //     //移出隐藏子菜单
            //     // $(this).find(".list_menu").css("display","none");
            //     $(this).find(".list_menu").stop().fadeOut(100);
            //     $(this).find(".list_time>a").stop().fadeOut(100);
            //     // $(this).find(".list_time>span").css("display","inline-block");
            //     $(this).find(".list_time>span").stop().fadeIn(100);
            //     // $(this).siblings("list_check").css("opacity",0.5);
            //     //找到除类名叫list-check同级元素外的所有元素
            //     $(this).children(".list_check").siblings().css("opacity", 0.5);
            // });
            //动态生成的一条音乐用事件委托
            $("#content_list").delegate(".list_music", "mouseenter", function () {
                $(this).find(".list_time span").stop().fadeOut(0);
                $(this).find(".list_menu").stop().fadeIn(100);
                $(this).find(".list_time a").stop().fadeIn(0);
                // $(this).children().css("opacity", 1);
            });
            $("#content_list").delegate(".list_music", "mouseleave", function () {
                $(this).find(".list_time span").stop().fadeIn(0);
                $(this).find(".list_menu").stop().fadeOut(100);
                $(this).find(".list_time a").stop().fadeOut(0);
                // $(this).children(".list_check").siblings().css("opacity", 0.5);
            });
            var indexes = [];
            //监听复选框,由于动态添加歌曲要事件委托
            $("#content_list").delegate(".list_check", "click", function () {
                $(this).toggleClass("list_checked");
                var c_index = $(this).parents(".list_music").get(0).index;
                indexes.push(c_index);
            });
            //监听全选框
            $(".all_check").click(function () {
                if ($(this).attr("class").indexOf("all_checked") != -1) {
                    //如果是全选
                    $(this).removeClass("all_checked");
                    $(".list_check").removeClass("list_checked");
                } else if ($(this).attr("class").indexOf("all_check") != -1) {
                    //如果不是全选
                    $(this).addClass("all_checked");
                    $(".list_check").addClass("list_checked");
                }
            });
            //监听清空列表
            $(".clean_list").click(function () {
                $(".list_del").trigger("click");
            });
            //监听toolbar的删除按钮
            $(".del_m").click(function () {
                $.each(indexes, function (index, element) {
                    $(".list_music").eq(index).find(".list_del").trigger("click");
                });
                indexes = [];
            });

            $musicPlay = $(".music_play");
            //监听底部播放按钮
            // $musicPlay.click(function () {
            //     $(this).toggleClass("music_pause");
            // });
            //菜单栏中的播放按钮
            $("#content_list").delegate(".list_menu_play", "click", function () {
                var $item = $(this).parents(".list_music");//一行音乐
                // console.log(parents.get(0).index);
                // console.log(parents.get(0).music);
                $(this).toggleClass("list_menu_play2");
                //这里是parents不是parent,取消其他的播放图标
                $item.siblings().find(".list_menu_play").removeClass("list_menu_play2");
                //取消其他的高亮显示
                $item.siblings().find("div").css("color", "rgba(255,255,255,0.5)");
                //删除其他行的动态播放图
                $item.siblings().find(".list_number").removeClass("list_number2");
                if ($(this).attr("class").indexOf("list_menu_play2") != -1) {
                    //如果是暂停按钮,底栏
                    $musicPlay.addClass("music_pause");
                    //播放文字高亮
                    $item.find("div").css("color", "#fff")
                    //序号变动图
                    //  parents.find(".list_number").removeClass("list_number");
                    $item.find(".list_number").toggleClass("list_number2");
                } else {
                    //如果不是暂停,底栏
                    $musicPlay.removeClass("music_pause");
                    //暂停文字不高亮
                    $item.find("div").css("color", "rgba(255,255,255,0.5)")
                    //动图播放变序号
                    $item.find(".list_number").toggleClass("list_number2");
                    // parents.find(".list_number").addClass("list_number");
                }
                //播放音乐
                $player.playMusic($item.get(0).index, $item.get(0).music);
                //播放切换歌曲信息
                initMusicInfo($item.get(0).music);
                //播放切换歌词
                initLyric($item.get(0).music);
            });
            //监听喜欢按钮
            $(".music_fav").click(function () {
                $(this).toggleClass("music_faved");
            });
            //监听模式按钮
            // var i = 3;
            // $(".music_mode1").click(function () {
            //     if (i > 0) {
            //         $(this).toggleClass("music_mode" + i--);
            //     } else if (i == 0) {
            //         $(this).toggleClass("music_mode" + 2);
            //     }
            //
            // });

            //监听底部控制栏播放按钮
            $(".music_play").click(function () {
                $(this).toggleClass("music_pause");
                //判断有没有播放过音乐
                if ($player.currentIndex == -1) {
                    //没有播放过音乐默认播放第一首歌
                    $(".list_music").eq(0).find(".list_menu_play").trigger("click");//自动触发菜单栏播放键事件
                } else {
                    //如果播放过音乐
                    $(".list_music").eq($player.currentIndex).find(".list_menu_play").trigger("click");

                }
            });
            //监听底部控制栏上一首按钮
            $(".music_pre").click(function () {
                var preIndex = $player.preIndex();
                $(".list_music").eq(preIndex).find(".list_menu_play").trigger("click");
            });
            //监听底部控制栏下一首按钮
            $(".music_next").click(function () {
                var nxtIndex = $player.nexIndex();
                $(".list_music").eq(nxtIndex).find(".list_menu_play").trigger("click");
            });

            //监听删除按钮的点击
            $("#content_list").delegate(".list_del", "click", function () {
                //找到被点击的音乐
                var $item = $(this).parents(".list_music");
                //判断删除的是否是当前正在播放的
                if ($item.get(0).index == $player.currentIndex) {
                    //如果是播放下一首
                    $(".music_next").trigger("click");
                }
                $item.remove();
                //删除对应数组中的数据
                $player.changeMusic($item.get(0).index);//点击的li的index
                //重新排序,each中的element是dom对象
                $(".list_music").each(function (index, element) {
                    element.index = index;//让重排后的每一个li中的index属性对上函数中的index
                    $(element).find(".list_check").removeClass("list_checked");
                    $(element).find(".list_number").html(index + 1);
                })
            });
            //监听音量图标的点击
            $(".music_voice_icon").click(function () {
                //图标切换
                $(this).toggleClass("music_voice_icon2");
                var volume;
                //如果显示静音图标
                if ($(this).attr("class").indexOf("music_voice_icon2") != -1) {
                    volume = 0;
                    //变为没有声音
                    $player.musicVoiceSeekTo(volume);
                } else {
                    volume = 1;
                    //变为有声音
                    $player.musicVoiceSeekTo(volume);
                }
            });
            //监听登入按钮
            $(".login").click(function () {
                var $item = $("<div class=\"login_mask\">\n" +
                    "    <div class=\"login_table\">\n" +
                    "        <a href=\"javascript:;\"></a>\n" +
                    "        <form action=\"\">\n" +
                    "            <table>\n" +
                    "                <tr>\n" +
                    "                    <td>账号:</td>\n" +
                    "                    <td colspan=\"2\"><input type=\"text\" name=\"username\"></td>\n" +
                    "                </tr>\n" +
                    "                <tr>\n" +
                    "                    <td>密码:</td>\n" +
                    "                    <td colspan=\"2\"><input type=\"password\" name=\"password\"></td>\n" +
                    "                </tr>\n" +
                    "                <tr>\n" +
                    "                    <td></td>\n" +
                    "                    <td><input type=\"submit\" value=\"登录\" class='s_login'></td>\n" +
                    "                    <td><input type=\"submit\" value=\"注册\" class='s_login'></td>\n" +
                    "                </tr>\n" +
                    "            </table>\n" +
                    "        </form>\n" +
                    "    </div>\n" +
                    "</div>");
                $("body").append($item);
            });
            //监听登入界面的关闭按钮
            $(document).delegate(".login_table>a", "click", function () {
                $(this).parents(".login_mask").remove();
            })
        }
    }
);




