<template>
  <div class="in-wrap">
    <!-- 公共头引入 -->
    <header id="header">
      <section class="container">
<!--        <h1 id="logo">-->
<!--          <a href="#" title="在线教育">-->
<!--            <img width="100px"  src="~/assets/img/logo.png" alt="在线教育">-->
<!--          </a>-->
<!--        </h1>-->
        <div class="h-r-nsl">
          <ul class="nav">
            <router-link to="/" tag="li" active-class="current" exact>
              <a style="font-size: 20px;font-weight: bolder;font-family: 'Adobe 黑体 Std R'">首页</a>
            </router-link>
            <router-link to="/course" tag="li" active-class="current">
              <a style="font-size: 20px;font-weight: bolder;font-family: 'Adobe 黑体 Std R'">课程</a>
            </router-link>
            <router-link to="/teacher" tag="li" active-class="current">
              <a style="font-size: 20px;font-weight: bolder;font-family: 'Adobe 黑体 Std R'">讲师</a>
            </router-link>
            <!--            <router-link to="/article" tag="li" active-class="current">-->
            <!--              <a>文章</a>-->
            <!--            </router-link>-->
            <!--            <router-link to="/qa" tag="li" active-class="current">-->
            <!--              <a>问答</a>-->
            <!--            </router-link>-->
          </ul>
          <!-- / nav -->
          <ul class="h-r-login">
            <li v-if="!loginInfo.id" id="no-login">
              <a href="/login" title="登录">
<!--                <em class="icon18 login-icon">&nbsp;</em>-->
                <span class="vam ml5" style="font-size: 20px;font-weight: bolder;font-family: 'Adobe 黑体 Std R'">登入</span>
              </a>
              ◀▶
              <a href="/register" title="注册">
                <span class="vam ml5" style="font-size: 20px;font-weight: bolder;font-family: 'Adobe 黑体 Std R'">注册</span>
              </a>
            </li>
            <li v-if="loginInfo.id" id="is-login-one" class="mr10">
              <a id="headerMsgCountId" href="#" title="消息">
<!--                <em class="icon18 news-icon">&nbsp;</em>-->
              </a>
              <q class="red-point" style="display: none">&nbsp;</q>
            </li>
            <li v-if="loginInfo.id" id="is-login-two" class="h-r-user">
              <a href="#" title>
                <img
                  :src="loginInfo.avatar"
                  width="30"
                  height="30"
                  class="vam picImg"
                  alt
                >
                <span id="userName" class="vam disIb">{{loginInfo.nickname}}</span>
              </a>
              <a href="javascript:void(0);" title="退出" @click="logout()" class="ml5">登出</a>
            </li>
            <!-- /未登录显示第1 li；登录后显示第2，3 li -->
          </ul>
<!--          <aside class="h-r-search">-->
<!--            <form action="#" method="post">-->
<!--              <label class="h-r-s-box">-->
<!--                <input type="text" placeholder="search" name="queryCourse.courseName" value>-->
<!--                <button type="submit" class="s-btn">-->
<!--                  <em class="icon18">&nbsp;</em>-->
<!--                </button>-->
<!--              </label>-->
<!--            </form>-->
<!--          </aside>-->
        </div>
        <aside class="mw-nav-btn">
          <div class="mw-nav-icon"></div>
        </aside>
        <div class="clear"></div>
      </section>
    </header>

    <!-- /公共头引入 -->
    <nuxt/>
  </div>
</template>
<script>
  import cookie from 'js-cookie'
  import login from "../api/login";
  import '~/assets/css/reset.css'
  import '~/assets/css/theme.css'
  import '~/assets/css/global.css'
  import '~/assets/css/web.css'
  import '~/assets/css/base.css'
  import '~/assets/css/activity_tab.css'
  import '~/assets/css/bottom_rec.css'
  import '~/assets/css/nice_select.css'
  import '~/assets/css/order.css'
  import '~/assets/css/swiper-3.3.1.min.css'
  import "~/assets/css/pages-weixinpay.css"

  export default {
    data() {
      return {
        token: '',
        loginInfo: {
          id: '',
          age: '',
          avatar: '',
          mobile: '',
          nickname: '',
          sex: ''
        }
      }
    },
    //判断路径请求的参数是否有token字段
    created() {
      this.token = this.$route.query.token
      console.log(this.token)
      //判断路径中是否有token
      if (this.token) {
        this.wechatLogin()
      }
      this.showInfo()
    },

    methods: {
      showInfo() {
        //debugger
        //查询处来的结果可能为null所以要判断一下
        var jsonStr = cookie.get('user');
        // alert(jsonStr);
        if (jsonStr) {
          this.loginInfo = JSON.parse(jsonStr)
        }
      },

      logout() {
        //debugger
        cookie.set('user', "", {domain: 'localhost'})
        cookie.set('token', "", {domain: 'localhost'})
        //跳转页面
        window.location.href = "/"
      },
      wechatLogin() {
        //吧token放入cookie中
        cookie.set("token", this.token, {domain: "localhost"})
        cookie.set("user","",{domain: "localhost"})
        //调用接口,这里是因为添加了拦截器,拦截了路径中包含token发送到后端
        login.getUserInfoByToken()
          .then(response => {
            this.loginInfo = response.data.data.user
            // cookie.set('token', response.data.data.token, {domain: 'localhost'})
            cookie.set("user",this.loginInfo,{domain: "localhost"})
          })
      }
    }
  }
</script>

