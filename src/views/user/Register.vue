<template>
  <div class="register">
    <hm-header>注册</hm-header>
    <hm-logo></hm-logo>
    <van-form @submit="register">
      <van-field
        v-model="user.username"
        label="用户名"
        placeholder="请输入用户名"
        :rules="rules.username"
      />
      <van-field
        v-model="user.nickname"
        label="昵称"
        placeholder="请输入昵称"
        :rules="rules.nickname"
      />
      <van-field
        v-model="user.password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        :rules="rules.password"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          注册
        </van-button>
      </div>
      <p class="tips">
        已有账号？去<router-link to="/login">登录</router-link>
      </p>
    </van-form>
  </div>
</template>

<script>
export default {
  // 还能写三个路由的钩子函数
  // beforeRouterEnter()  beforeRouterUpdate()  beforeRouterLeave()
  data() {
    return {
      user: {
        username: '',
        nickname: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请填写用户名', trigger: 'onChange' },
          {
            pattern: /^\d{5,11}$/,
            message: '用户名长度为5-11位数字',
            trigger: 'onChange'
          }
        ],
        nickname: [
          { required: true, message: '请填写昵称', trigger: 'onChange' },
          {
            pattern: /^[\u4e00-\u9fa5]{2,6}$/,
            message: '昵称为2-6位的汉字',
            trigger: 'onChange'
          }
        ],
        password: [
          { required: true, message: '请填写密码', trigger: 'onChange' },
          {
            pattern: /^\d{3,9}$/,
            message: '密码长度为3-9位数字',
            trigger: 'onChange'
          }
        ]
      }
    }
  },
  methods: {
    async register() {
      const res = await this.$axios.post('/register', this.user)
      console.log(res.data)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.$router.push({
          name: 'login',
          params: this.user
        })
      } else {
        this.$toast.fail('注册失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.tips {
  text-align: right;
  padding: 0 15px;
  font-size: 16px;
  a {
    color: orangered;
  }
}
</style>
