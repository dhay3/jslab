// JavaScript Document
$(document).ready(function () {
//var s=window.screen;
  var width = matrixBG.width = window.screen.width;
  var height = matrixBG.height = window.screen.height;
  var yPositions = Array(300).join(0).split('');
  var ctx = matrixBG.getContext('2d');
  var fonts1 = "ㄅㄆㄇㄈㄪㄉㄊㄋㄌㄍㄎㄫㄏㄐㄑㄬㄒㄓㄔㄕㄖㄗㄘㄙㄚㄛㄜㄝㄞㄟㄠㄡㄢㄣㄤㄥㄦㄧㄨㄩ";
  var fonts2 = "钅彡圭卌廾爫丷糹忄冖辶弋刂冫灬豕";
  var fonts = fonts1 + fonts2;
//var fonts="12345AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz67890";
//console.log( fonts );

  var draw = function () {
    ctx.fillStyle = 'rgba(0,0,0,.05)';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = '#0F0';
    ctx.font = '10pt Georgia';
//  ctx.font = '10pt Nano';
    yPositions.map(function (y, index) {
//	text = String.fromCharCode(30+Math.floor( Math.random()*95 ));
      var rand = Math.floor(Math.random() * fonts.length);
      var text = fonts.substr(rand, 1);
      x = (index * 10) + 10;
      matrixBG.getContext('2d').fillText(text, x, y);
      if (y > 100 + Math.random() * 1e4) {
        yPositions[index] = 0;
      } else {
        yPositions[index] = y + 10;
      }
    });
  };
  RunMatrix();

  function RunMatrix() {
    if (typeof Game_Interval != "undefined") clearInterval(Game_Interval);
    Game_Interval = setInterval(draw, 33);
  }

  function StopMatrix() {
    clearInterval(Game_Interval);
  }

  /**
   //setInterval(draw, 33);
   $("button#pause").click(function(){
StopMatrix();});
   $("button#play").click(function(){RunMatrix();});
   */
});