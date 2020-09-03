<template>
  <div class="myStar">
    <hm-header>我的收藏</hm-header>
    <div class="list">
      <div class="item" v-for="item in starList" :key="item.id">
        <div class="info">
          <div class="title">
            {{item.title}}
          </div>
          <div class="user">
            <span>{{item.user.nickname}}</span>
            <span>{{item.comments.length}}跟帖</span>
          </div>
        </div>
        <div class="img">
          <img :src="$URL(item.cover[0].url)" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.getStarList()
  },
  data() {
    return {
      starList: []
    }
  },
  methods: {
    async getStarList() {
      const res = await this.$axios.get('/user_star')
      console.log(res.data)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.starList = data
      }
    }
  }
}
</script>

<style lang="less" scoped>
.item {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  display: flex;
  .info{
    flex: 1;
    font-size: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .user{
    font-size: 14px;
    color: #666;
    span{
      margin-right: 10px;
    }
  }
  .img {
    // border: 1px solid #ddd;
    img {
      width: 120px;
      height: 74px;
      // 作用和background-size类似，，设置图片的大小
      // cover的缺点：保证图片覆盖完整的大小， 缺点：会有一部分被截取掉
      // contain: 保证图片被完整的显示，会有留白
      object-fit: cover;
    }
  }
}
</style>
