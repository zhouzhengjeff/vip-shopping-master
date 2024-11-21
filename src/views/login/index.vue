<template>
  <div class="login">
    <van-nav-bar left-arrow title="会员登录" @click-left="$router.go(-1)"/>
    <div class="container">
      <div class="title">
        <h3>手机号登录</h3>
        <p>未注册的手机号登录后将自动注册</p>
      </div>

      <div class="form">
        <div class="form-item">
          <input v-model="mobile" class="inp" maxlength="11" placeholder="请输入手机号码"
                 type="text">
        </div>
        <div class="form-item">
          <input v-model="picCode" class="inp" maxlength="5" placeholder="请输入图形验证码"
                 type="text">
          <img :src="picUrl" alt="" @click="getPicCode">
        </div>
        <div class="form-item">
          <input v-model="smsCode" class="inp" placeholder="请输入短信验证码" type="text">
          <button @click="getCode()">
            {{ second === totalSecond ? '获取验证码' : second + `秒后重新发送` }}
          </button>
        </div>
      </div>

      <div class="login-btn" @click="login">登录</div>
    </div>
  </div>
</template>

<script>
import { doLogin, getPicCode, getSmsCaptch } from '@/api/login'

export default {
  name: 'LoginPage',
  data () {
    return {
      picUrl: '',
      picKey: '',
      totalSecond: 5,
      second: 5,
      timer: null,
      mobile: '',
      picCode: '',
      smsCode: ''
    }
  },
  methods: {
    async getPicCode () {
      const res = await getPicCode()

      const {
        data: {
          base64,
          key
        }
      } = res

      this.picUrl = base64
      this.picKey = key

      // Toast('成功获取图形验证码')
      this.$toast('成功获取图形验证码')
    },

    validate () {
      if (!/^1[3-9]\d{9}$/.test(this.mobile)) {
        this.$toast('请输入正确的手机号')
        return false
      }
      if (!/^\w{4}$/.test(this.picCode)) {
        this.$toast('请输入正确的图形验证码')
        return false
      }
      return true
    },

    async getCode () {
      // 校验手机号码和图形验证码
      if (!this.validate()) {
        return
      }

      // 开启倒计时
      if (this.timer == null && this.totalSecond === this.second) {
        const data = {
          form: {
            mobile: this.mobile,
            captchaCode: this.picCode,
            captchaKey: this.picKey
          }
        }
        await getSmsCaptch(data)
        this.$toast('发送成功，请注意查收')
        this.timer = setInterval(() => {
          this.second--
          if (this.second <= 1) {
            clearInterval(this.timer)
            this.second = this.totalSecond
            this.timer = null
          }
        }, 1000)
        this.$toast('成功获取短信验证码')
      }
    },
    async login () {
      const data = {
        form: {
          isParty: false,
          mobile: this.mobile,
          partyData: {},
          smsCode: this.smsCode
        }
      }
      const res = await doLogin(data)
      this.$store.commit('user/setUserInfo', res.data)
      this.$router.push('/')
      this.$toast('登录成功')
    }
  },
  async created () {
    await this.getPicCode()
  },
  destroyed () {
    clearInterval(this.timer)
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;

    h3 {
      font-size: 26px;
      font-weight: normal;
    }

    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;

    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }

    img {
      width: 94px;
      height: 31px;
    }

    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg, #ecb53c, #ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, .1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
