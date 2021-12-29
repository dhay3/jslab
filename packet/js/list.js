var fixedIndexs = $('.fixedIndexs');
//获取标题
var h2 = $('#cnblogs_post_body h2');


function openorclose(a) {
  $("#indexs").slideToggle("fast");
  var text = $(a).text();
  if (text == '[-]') {
    $(a).text("[+]");
    return;
  }
  $(a).text("[-]");
}

//创建内容
function createIndexs() {
  var indexs_container = $('<div style="background:transparent;width:180px;padding:4px 10px;"></div>');
  var indexs_controller = $('<p style="text-align:right;margin:0;"><span style="float:left;">目录<a onclick="javascript:openorclose(this);" style="cursor: pointer">[-]</a></span><a href="#top" style="text-align: right">返回顶部</a></p>');
  //列表
  var indexs = $('<ol id="indexs" style="margin-left: 14px; padding-left: 14px; line-height: 160%; display: block;"></ol>');
  indexs_container.append(indexs_controller).append(indexs);
  $.each(h2, function (i, h) {
    //在内容前添加序号
    $(h).before('<a id="index_' + i + '"></a>');
    //添加内容
    indexs.append('<li style="list-style:decimal;color: white;"><a href="#index_' + i + '" id="active_' + i + '">' + $(h).text() + '</a></li>');
  });
  if (h2.length != 0) {
    fixedIndexs.append(indexs_container);
    //get home div right offset
    fixedIndexs.css('right', $("#home").offset().left + 32 + 'px');
  }
}

createIndexs();
$(window).scroll(function (event) {
  //clear all active
  $("#indexs li a").removeClass("active");
  //set active
  $.each(h2, function (i, h) {
    var next_active_top;
    i < (h2.length - 1) ? next_active_top = h2.eq(i + 1).offset().top : h2.last().offset().top;
    if ($(h).offset().top < $(window).scrollTop() + 30 && $(window).scrollTop() + 30 < next_active_top) {
      $("#active_" + i).addClass("active");
    }
    if (i + 1 == h2.length && $(window).scrollTop() + 30 > h2.last().offset().top) {
      $("#active_" + i).addClass("active");
    }
  });
  //auto display
  if ($(window).scrollTop() > $(window).height()) {
    fixedIndexs.slideDown(500);
    // fixedIndexs.show(500);
  } else {
    fixedIndexs.slideUp(500);
    // fixedIndexs.hide(500);
  }
});
$(window).resize(function (event) {
  fixedIndexs.hide();
  fixedIndexs.css('right', $("#home").offset().left + 32 + 'px');
  if ($(window).scrollTop() > $(window).height()) {
    fixedIndexs.show();
  }
})
