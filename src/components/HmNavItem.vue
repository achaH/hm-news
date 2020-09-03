<template>
  <div class="nav-item" @click="clickFn">
    <div class="title"><slot></slot></div>
    <div class="content"><slot name='content'></slot></div>
    <div class="arrow">
      <span class="iconfont iconjiantou1"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    to: String
  },
  methods: {
    clickFn() {
      this.$router.push(this.to)
      this.$emit('click')
    }
  }
}
</script>

<style lang='less' scoped>
  .nav-item{
    font-size: 16px;
    display: flex;
    height: 70px;
    align-items: center;
    border-bottom: 1px solid #ccc;
    margin-left: 10px;
    padding-right: 10px;
    .content{
      flex: 1;
      text-align: right;
      color: #666;
    }
  }
</style>
