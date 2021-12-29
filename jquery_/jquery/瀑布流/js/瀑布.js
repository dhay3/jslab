window.onload = function () {
    imgLocation("con", "d2");
};

//设置每一排显示多少张图片
function imgLocation(parent, content) {
    //获取父级标签
    var cparent = document.getElementById(parent);
    var ccontent = getChildElement(cparent, content);
    // console.log(ccontent);

    var offsetWidth = ccontent[0].offsetWidth;
    console.log("设定的宽度"+offsetWidth);
    var Width = document.documentElement.clientWidth;
    console.log("屏幕宽度"+Width);
    var num = Math.floor(Width / offsetWidth);
    console.log("一列图片数"+num);
    //设置最外层div容器的width属性
    cparent.style.cssText = "width:" + num * offsetWidth + "px;margin:0px auto";
    var divHeight = [];
    for (var i = 0; i < ccontent.length; i++) {
        if (i <=num) {
            //获取第一排所有元素的高度
            divHeight[i] = ccontent[i].offsetHeight;
            console.log("高度" + divHeight[i]);
        } else {
            //获取其他列中最小高度的元素
            var minHeight = Math.min.apply(null, divHeight);
            var locationNum = getMinHeightLocation(divHeight, minHeight);
            console.log("最小高度" + minHeight);
            ccontent[i].style.position = "absolute";
            //没有px不会生效
            ccontent[i].style.top = minHeight + "px";
            // ccontent[i].style.left=ccontent[0].offsetWidth;
            ccontent[i].style.left = ccontent[locationNum].offsetLeft+"px";
            divHeight[locationNum]=ccontent[i]+divHeight[locationNum];
        }

    }
}

//获取最小高度的所在列数,divHeight是height的集合,minHeight是集合中最小的高度
function getMinHeightLocation(divHeight, minHeight) {
    for (var i in divHeight) {
        if (divHeight[i] == minHeight) {
            return i;
        }
    }
}

//取出parent标签下的所有name属性是content的元素
function getChildElement(parent, content) {
    var allContent = [];
    var all = parent.getElementsByTagName("*");
    for (var i = 0; i < all.length; i++) {
        if (all[i].className == content) {
            allContent.push(all[i]);
        }
    }
    return allContent;
}