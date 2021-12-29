
    //显示评论区头像
    function showAvatar(){
      $(".feedbackItem").each(function(){
        var avatar = $(this).children(".feedbackCon").children("span:last").html();
        avatar = avatar ? avatar.replace("http://", "https://") : "https://pic.cnblogs.com/face/sample_face.gif";  //没有头像用默认头像
        //console.log( avatar );
        $('<img src="'+ avatar +'" class="avatar" />').prependTo( $(this).children(".feedbackCon") );
      });
    }

$(function(){ setTimeout(function(){ showAvatar(); }, 1000) });
$(document).on("click", ".pager a", function(){
  setTimeout(function(){ showAvatar(); }, 1000);
});
