<template>
  <div class="hm-header">
      <div class="left" @click="back">
          <i class="iconfont iconjiantou2"></i>
      </div>
      <div class="title"><slot></slot></div>
      <div class="extra"></div>
  </div>
</template>

<script>
export default {
  methods: {
    back() {
      // this.$router.go(-1)
      this.$router.back()
    }
  }

}
</script>

<style lang='less'>
  .hm-header{
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid #ccc;
      display: flex;
      text-align: center;
      .title{
          font-size: 20px;
          font-weight: 600;
          flex: 1;
      }
      .left,
      .extra{
          width: 50px;
      }
      .iconfont{
          font-size: 16px;
      }
  }
</style>
