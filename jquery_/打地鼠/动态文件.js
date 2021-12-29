t = 60;//t要设置为119因为setInterval是从零开始
score = 0;
$(function () {
    //监听游戏规则的点击
    $("#rule").click(function () {
        $("#rules").stop().fadeIn(100);
    });

    // 监听关闭按钮的点击
    $("#close").click(function () {
        $("#rules").stop().fadeOut(100);
    });

    //监听开始按钮的点击
    $("#start").click(function () {
        // $("#start").fadeOut(0);
        $(this).stop().fadeOut(500);
        //调用处理时间和结束界面弹出的函数
        time();
        //让地鼠不断随机出现
        interval = setInterval(miceOut, 1400);
        // $("#con").css("cursor","default");

    }).mouseover(function () {
        //悬浮到开始按钮鼠标从指针变成手
        this.style.cursor = "pointer";
    });

    //监听重新开始按钮的点击
    $("#restart").click(function () {
        $("#end").stop().fadeOut(400);
        $("#start").stop().fadeIn(400);
        //点击重新开始地鼠消失
        // $("img").stop().fadeOut(100);
        //重新设置时间为60
        $("#time").html(60);
        t = 60;
        //重新设置分数
        $("#score").html(0);
        score = 0;
    }).mouseover(
        function () {
            // $(this).style.cursor = "pointer";
            // $(this).css("cursor", "pointer,auto");
            //悬浮到重新开始按钮鼠标从指针变成手
            this.style.cursor = "pointer";
        }
    );

    //监听背景,鼠标变锤子
    $("#con").mouseover(function () {
        // $(this).style.cursor = "url(source/hammer.png)";
        // $(this).css("cursor", "url(source/hammer.png),auto");
        $(this).css({
            cursor: "url(source/hammer.png),auto"
        });
    }).click(function () {
        //鼠标点击效果
        $(this).css("cursor", "url(source/hammer1.png),auto");
        setTimeout(function () {
            $("#con").css("cursor", "url(source/hammer.png),auto");
        }, 100);

        //css是同步的,delay只对动画生效
        // $(this).css("cursor", "url(source/hammer1.png),auto")
        //     .delay(1000).css("cursor", "url(source/hammer.png),auto");
    });

    //监听地鼠,加分

    // $("#con").delegate("img", "mouseover", function () {
    //     console.log(1);
    // });
});


//处理时间和结束界面弹出的函数(进度条滚动,结束界面)
function time() {
    // console.log($("#time").html());
    // var time = $("#time").html();
    $("#time").html(t -= 1);
    // $("#time").html(t--);
    //不能用setInterval()
    var timeout = setTimeout(time, 1000);

    if (t == 0) {
        //当时间为0计时器关闭
        clearTimeout(timeout);
        //当时间为0地鼠出现函数关闭计时器
        clearInterval(interval);
        //当时间为0删除地鼠元素
        // $("img").remove();有效,可以监听到img
        // 出现重新开始按钮
        $("#end").stop().fadeIn(300);
    }
}

//地鼠出现函数
function miceOut() {
    //存放地鼠位置的数组
    var $position = [
        //多维数组存放属性,通过键值对,用大括号
        //大括号表示对象,内容表示对象的属性
        {left: 106, top: 80 + 10},
        {left: 216, top: 80 + 10},
        {left: 340, top: 80 + 10},
        {left: 86, top: 130 + 10},
        {left: 216, top: 130 + 10},
        {left: 340, top: 130 + 10},
        {left: 79, top: 200 + 10},
        {left: 216, top: 200 + 10},
        {left: 350, top: 200 + 10},
    ];
    //random()左闭右开[0,1)
    // console.log(Math.random());
    //[0,8)
    // console.log(Math.floor(Math.random() * 9));
    //生成一个随机数表示地鼠位置
    var miceNumber = Math.floor(Math.random() * 9);
    //生成一个随机数表示地鼠或炸弹(1表示地鼠,0表示炸弹)
    var picNumber = Math.round(Math.random() + 0.15);
    //生成一个随机对象(window.表示全局变量)
    var $mice = $("<img src='source/" + picNumber + ".png'>");
    // console.log($(mices));

    //设置位置
    $mice.css({
        position: "absolute",
        //获取位置数组中的随机值,让地鼠出现在随机位置
        left: $position[miceNumber].left,
        top: $position[miceNumber].top,
        // left: 106, top: 80,
        // left: 216, top: 80
        // left: 340, top: 80
        // left: 86, top: 130
        // left: 216, top: 130
        // left: 340, top: 130
        // left: 79, top: 200
        // left: 216, top: 200
        // left: 350, top: 200
    });
    // $("#con").append(function () {
    // $img.slideDown(1000);
    // });


    //地鼠出现后消失
    $mice.appendTo("#con").stop().animate({
        position: "absolute",
        // bottom: "200px"
        top: "-=20px"
    }, 1000);
    setTimeout(function () {
        $mice.remove();
    }, 1400);

    //监听地鼠
    var attr = $mice.attr("src");
    var flag = attr.indexOf("1") >= 0;
    // console.log($mice);
    // console.log(flag);
    // clickScore();
    // setTimeout(function () {
    //    $img.hide();
    // }, 1500);
    console.log($mice);
    $mice.one("click", function () {
        if (flag) {
            $("#score").html(score += 10);
        } else {
            $("#score").html(score -= 10);
        }
    });
}

// function clickScore() {
//     mices.click(function () {
//         var flag = parseInt(mices.attr("src").indexOf("1")) >= 0;
//         if (flag) {
//             console.log(1);
//             // alert(1);
//         } else {
//             console.log(2);
//         }
//     })
// }



