<template>
  <div class="myFollow">
    <hm-header>我的关注</hm-header>
    <div class="list">
      <div class="item" v-for="item in followList" :key="item.id">
        <div class="left">
          <img :src="$base + item.head_img" alt="" />
        </div>
        <div class="center">
          <p>{{ item.nickname }}</p>
          <p class="time">{{ item.create_date | time }}</p>
        </div>
        <div class="righ">
          <van-button
            round
            type="default"
            size="small"
            @click="unfollow(item.id)"
            >取消关注</van-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.getFollow()
  },
  data() {
    return {
      followList: []
    }
  },
  methods: {
    async getFollow() {
      const res = await this.$axios.get('/user_follows')
      // console.log('res', res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.followList = data
      }
    },
    async unfollow(id) {
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '是否确认取消关注该用户？'
        })
      } catch {
        return this.$toast.fail('取消关注失败')
      }
      const res = await this.$axios.get(`/user_unfollow/${id}`)
      console.log(res.data)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.fail(message)
        this.getFollow()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.list {
  .item {
    display: flex;
    align-items: center;
    padding: 0 20px;
    height: 80px;
    border-bottom: 1px solid #ccc;
    .left {
      img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
      }
    }
    .center {
      font-size: 18px;
      flex: 1;
      padding-left: 20px;
    }
    .time {
      font-size: 16px;
      color: #666;
      margin-top: 10px;
    }
    .van-button {
      background-color: #ddd;
    }
  }
}
</style>
