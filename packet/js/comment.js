var le = $(".feedbackItem").length
for(var i = 0;i < le;i++){
  var src = $(".feedbackItem").eq(i).find(".feedbackCon").find("span").text()
  $(".feedbackCon").eq(i).prepend('<img class="comment-avatar" src="'+$.trim(src)+'">')
}
$("#commentbox_opt").nextAll().remove()
$("#btn_comment_submit").val("提交评论 (Ctrl + Enter)")