<template>
  <div class="main">
    <div class="title">
      <a class="active" href="/login">登录</a>
      <span>·</span>
      <a href="/register">注册</a>
    </div>

    <div class="sign-up-container">
      <el-form ref="userForm" :model="user">

        <el-form-item class="input-prepend restyle" prop="mobile"
                      :rules="[{ required: true, message: '请输入手机号码', trigger: 'blur' },{validator: checkPhone, trigger: 'blur'}]">
          <div>
            <el-input type="text" placeholder="手机号" v-model="user.mobile"/>
            <i class="iconfont icon-phone"/>
          </div>
        </el-form-item>

        <el-form-item class="input-prepend" prop="password"
                      :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]">
          <div>
            <el-input type="password" placeholder="密码" v-model="user.password"/>
            <i class="iconfont icon-password"/>
          </div>
        </el-form-item>

        <div class="btn">
          <input type="button" class="sign-in-button" value="登录" @click="submitLogin()">
        </div>
      </el-form>
      <!-- 更多登录方式 -->
      <div class="more-sign">
        <h6>快捷登入</h6>
        <ul>
          <li><a id="weixin" class="weixin" target="_self"
                 href="http://localhost:8080/api/ucenter/wx/login"><i class="iconfont icon-weixin"/></a>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
  import '~/assets/css/sign.css'
  import '~/assets/css/iconfont.css'
  import cookie from 'js-cookie'
  import login from "../../api/login";

  export default {
    //如果不是default的layout就需要指定
    layout: 'sign',

    data() {
      return {
        //封装用户信息
        user: {
          mobile: '',
          password: ''
        },
      }
    },

    methods: {
      //登入
      submitLogin() {
        login.submitLogin(this.user)
          .then(response => {
            if (response.data.success) {
              //将cookie设置为在domain中共享
              //登入成功将token存在cookie中、也可以放在localStorage中
              cookie.set('token', response.data.data.token, {domain: 'localhost'})
              //登录成功根据token获取用户信息
              //所有请求被拦截,请求头中添加token
              login.getUserInfoByToken()
                .then(response => {
                  //将用户信息记录cookie
                  cookie.set('user', response.data.data.user, {domain: 'localhost'})
                  console.log(this.loginInfo)
                  //跳转页面
                  window.location.href = "/";
                  //也可以通过vue的方式跳转
                  // this.$router.push({path:"/"})
                })
            }
          })
      },

      checkPhone(rule, value, callback) {
        //debugger
        if (!(/^1[34578]\d{9}$/.test(value))) {
          return callback(new Error('手机号码格式不正确'))
        }
        return callback()
      }
    }
  }
</script>
<style>
  .el-form-item__error {
    z-index: 9999999;
  }
</style>
