<template>
  <div class="myComment">
    <!-- 占位符 -->
    <div class="placehold"></div>
    <hm-header>我的跟帖</hm-header>
    <div class="list">
      <van-pull-refresh
        v-model="refreshing"
        @refresh="onRefresh"
      >
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          :immediate-check="false"
          @load="onLoad"
        >
          <!-- immediate-check 默认初始化就会触发一次load事件,通过置为false来关闭 -->
          <div class="item" v-for="item in commentList" :key="item.id">
            <div class="time">
              {{ item.create_date | time('YYYY-MM-DD HH:mm') }}
            </div>
            <div class="comment" v-if="item.parent">
              <div class="name">回复：{{ item.parent.user.nickname }}</div>
              <div class="comment_content">{{ item.parent.content }}</div>
            </div>
            <div class="content">{{ item.content }}</div>
            <div class="origin">
              <span class="title">原文：{{ item.post.title }}</span>
              <span class="iconfont iconjiantou1"></span>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.getData()
  },
  data() {
    return {
      commentList: [],
      pageIndex: 1,
      pageSize: 5,
      // 代表加载状态，如果loading为true代表list组件正在加载数据，onload就不能够再触发
      // 当滚动到底部的时候触发onload的时候，自动会把loading改为true
      loading: false,
      // 代表是否结束，false时说明还有数据，true代表没有更多数据了
      finished: false,
      // 代表是否正在下拉刷新
      // 数据加载完成之后需要改为false
      refreshing: false
    }
  },
  methods: {
    async getData() {
      const res = await this.$axios.get('/user_comments', {
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      console.log(res.data)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        /* this.commentList = data */
        /* 覆盖修改为追加data */
        this.commentList = [...this.commentList, ...data]
        // 加载时loading会自动变为true，所以在数据加载结束的时候把loading变为false
        this.loading = false
        // 判断如果没有更多数据需要把finished改为true
        if (data.length < this.pageSize) {
          this.finished = true
        }
      }
    },
    //  异步更新数据
    onLoad() {
      setTimeout(() => {
        this.pageIndex++
        this.getData()
      }, 1000)
    },
    onRefresh() {
      setTimeout(() => {
        // 清空列表数据
        this.commentList = []
        this.finished = false
        // 重新加载数据
        // 将 loading 设置为 true，表示处于加载状态
        this.loading = true
        this.refreshing = false
        // 重新加载第一页数据
        this.pageIndex = 1
        this.getData()
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
.placehold {
  height: 50px;
  width: 100%;
}
.hm-header {
  display: flex;
  width: 100%;
  top: 0;
  position: fixed;
  background-color: #fff;
  height: 50px;
  line-height: 50px;
  text-align: center;
  border-bottom: 1px solid #ccc;
  z-index: 99;
}
.item {
  font-size: 16px;
  border-bottom: 1px solid #ccc;
  padding: 10px 20px;
  .time {
    color: #999;
  }
  .comment {
    background-color: #eee;
    padding: 10px;
    line-height: 26px;
    font-size: 14px;
    color: #666;
  }
  .content {
    margin: 10px 0;
  }
  .origin {
    font-size: 14px;
    color: #666;
    display: flex;
    justify-content: space-between;
    .title {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
