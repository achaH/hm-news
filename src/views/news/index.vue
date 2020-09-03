<template>
  <div class="index">
    <div class="header">
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="search">
        <div class="search_box">
          <span class="iconfont iconsearch"></span>
          <span>搜索新闻</span>
        </div>
      </div>
      <div class="user">
        <span class="iconfont iconwode"></span>
      </div>
    </div>
    <!-- tab栏效果 -->
    <van-tabs v-model="active" sticky swipeable>
      <van-tab :title="tab.name" v-for="tab in tabList" :key="tab.id">{{tab.name}}</van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  created() {
    this.getTabList()
  },
  data() {
    return {
      active: 0,
      tabList: [],
      newList: [],
      pageIndex: 1,
      pageSize: 10
    }
  },
  methods: {
    async getTabList() {
      const res = await this.$axios.get('/category')
      console.log(res.data)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.tabList = data
        // 发送请求获取第一个tab栏的数据
        this.getNewsList(this.tabList[0].id)
      }
    },
    async getNewsList(id) {
      const res = await this.$axios.get('/post', {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        category: id
      })
      console.log(res.data)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.newList = data
        console.log('news', this.newList)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  display: flex;
  height: 50px;
  line-height: 50px;
  background-color: #ff0000;
  color: #fff;
  text-align: center;
  .logo,
  .user {
    width: 70px;
  }
  .logo {
    span {
      font-size: 50px;
    }
  }
  .user {
    span {
      font-size: 24px;
    }
  }
  .search {
    flex: 1;
    .search_box {
      height: 34px;
      line-height: 34px;
      background-color: rgba(255, 255, 255, 0.5);
      margin-top: 8px;
      border-radius: 18px;
      font-size: 14px;
      span:first-child {
        margin-right: 6px;
      }
    }
  }
}
</style>
