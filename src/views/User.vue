<template>
  <div class="user">
    <div class="header">
      <div class="avater">
        <img :src="base + user.head_img" alt="" />
      </div>
      <div class="info">
        <div class="name">
          <span v-if="user.gender === 1" class="iconfont iconxingbienan"></span>
          <span v-else class="iconfont iconxingbienv"></span>
          <span class="nickname">{{ user.nickname }}</span>
        </div>
        <div class="time">
          {{ user.create_date | time }}
        </div>
      </div>
      <div class="arrow">
        <span class="iconfont iconjiantou1"></span>
      </div>
    </div>
    <hm-navItem to="/follow">
      <template>我的关注</template>
      <template #content>关注的用户</template>
    </hm-navItem>
    <hm-navItem to="/follow">
      <template>我的跟帖</template>
      <template #content>跟帖/回复</template>
    </hm-navItem>
    <hm-navItem to="/follow">
      <template>我的收藏</template>
      <template #content>文章/视频</template>
    </hm-navItem>
    <hm-navItem>设置</hm-navItem>
    <div style="margin:15px">
      <van-button class="logout" type="primary" @click="logout" block
        >退出</van-button
      >
    </div>
  </div>
</template>

<script>
export default {
  async created() {
    // token的处理放在了axios拦截器中处理
    // const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    const res = await this.$axios.get(`/user/${userId}`)
    const { statusCode, data } = res.data
    if (statusCode === 200) {
      this.user = data
      console.log(this.user)
    }
    // 不用再考虑statusCode=401的情况了，再响应拦截处理器统一做了处理，处理token失效的情况
  },
  data() {
    return {
      user: {}
    }
  },
  methods: {
    async logout() {
      // 如果await promise报错，使用try...catch捕获异常
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '是否确认要退出？'
        })
      } catch {
        return console.log('取消退出')
      }
      // 说明点击了确认
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      this.$router.push('/login')
      this.$toast.success('退出成功')
    }
  },
  computed: {
    base() {
      return this.$axios.defaults.baseURL
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  height: 190px;
  display: flex;
  align-items: center;
  padding: 20px;
  border-bottom: 3px solid #ddd;
  .avater {
    width: 70px;
    height: 70px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .info {
    flex: 1;
    padding-left: 10px;
    font-size: 16px;
    .time {
      margin-top: 10px;
      color: #666;
    }
    .nickname {
      padding-left: 8px;
    }
  }
  .iconxingbienan {
    color: #7bbcec;
  }
  .iconxingbienv {
    color: pink;
  }
}
</style>
