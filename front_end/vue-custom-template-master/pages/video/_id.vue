<template>
  <div>
    <link rel="stylesheet" href="https://g.alicdn.com/de/prismplayer/2.9.3/skins/default/aliplayer-min.css" />
    <script type="text/javascript" charset="utf-8" src="https://g.alicdn.com/de/prismplayer/2.9.3/aliplayer-min.js"></script>
    <div class="prism-player" id="J_prismPlayer"></div>
  </div>
</template>


<script>
  import video from "../../api/video";

  export default {
    layout: 'video',
    asyncData({params, error}) {
      return video.getPlayAuth(params.id)
        .then(response => {
          return {
            playAuth: response.data.data.playAuth,
            videoId: params.id
          }
        })
    },
    //在页面渲染之后,即数据加载后
    mounted() {
      new Aliplayer({
          "id": "J_prismPlayer",
          "vid": this.videoId,
          "playauth": this.playAuth,
          "qualitySort": "asc",
          "format": "mp4",
          "mediaType": "video",
          "width": "100%",
          "height": "600px",
          "autoplay": false,
          "isLive": false,
          "rePlay": false,
          "playsinline": true,
          "preload": false,
          "controlBarVisibility": "hover",
          "useH5Prism": true
        }, function (player) {
          console.log("The video is created");
        }
      )
    }
  }
</script>

<style scoped>

</style>
