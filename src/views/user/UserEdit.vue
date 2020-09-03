<template>
  <div class="userEdit">
    <hm-header>编辑资料</hm-header>
    <!-- 头像 -->
    <div class="avatar">
      <img :src="$axios.defaults.baseURL + user.head_img" alt="" />
      <!-- 上传头像 -->
      <van-uploader :after-read="afterRead" />
    </div>
    <!-- 导航 -->
    <hm-navItem @click="showNickname">
      <template>昵称</template>
      <template #content>{{ user.nickname }}</template>
    </hm-navItem>
    <hm-navItem @click="showPassword">
      <template>密码</template>
      <template #content>******</template>
    </hm-navItem>
    <hm-navItem @click="showGender">
      <template>性别</template>
      <template #content>{{ user.gender == 1 ? '男' : '女' }}</template>
    </hm-navItem>
    <van-dialog
      v-model="isShowNickname"
      title="编辑昵称"
      show-cancel-button
      @confirm="updataNickname"
    >
      <van-cell-group>
        <van-field v-model="nickname" placeholder="请输入昵称" ref="nickname" />
      </van-cell-group>
    </van-dialog>
    <van-dialog
      v-model="isShowPassword"
      title="修改密码"
      show-cancel-button
      @confirm="updataPassword"
    >
      <van-cell-group>
        <van-field v-model="password" placeholder="请输入密码" ref="password" />
      </van-cell-group>
    </van-dialog>
    <van-dialog
      v-model="isShowGender"
      title="修改性别"
      show-cancel-button
      @confirm="updataGender"
    >
      <van-radio-group v-model="gender">
        <van-cell-group>
          <van-cell title="男" clickable @click="gender = '1'">
            <template #right-icon>
              <van-radio name="1" />
            </template>
          </van-cell>
          <van-cell title="女" clickable @click="gender = '0'">
            <template #right-icon>
              <van-radio name="0" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-dialog>
    <div class="mask" v-if="isshowMask">
      <van-button @click="crop">裁剪</van-button>
      <van-button class="cancel" @click="cancel">取消</van-button>
      <vue-cropper
        ref="cropper"
        :img="img"
        autoCrop
        autoCropWidth="100"
        autoCropHeight="100"
        fixed
      ></vue-cropper>
    </div>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
export default {
  created() {
    this.getUserInfo()
  },
  data() {
    return {
      user: '',
      isShowNickname: false,
      nickname: '',
      isShowPassword: false,
      password: '',
      isShowGender: false,
      gender: 1,
      isshowMask: false,
      img: ''
    }
  },
  methods: {
    async getUserInfo() {
      const userId = localStorage.getItem('userId')
      const res = await this.$axios.get(`/user/${userId}`)
      // console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.user = data
      }
    },
    // 修改昵称模态框显示
    async showNickname() {
      this.isShowNickname = true
      this.nickname = this.user.nickname
      // 需要自定获取焦点 并且需要更新到最新的DOM获取文本框的节点
      // 等待dom的更新
      await this.$nextTick()
      this.$refs.nickname.focus()
    },
    // 确认修改昵称
    async updataNickname() {
      this.updateUser({ nickname: this.nickname })
    },
    // 修改密码模态框显示
    async showPassword() {
      this.isShowPassword = true
      this.password = this.user.password
      await this.$nextTick()
      this.$refs.password.focus()
    },
    // 确认密码修改
    async updataPassword() {
      this.updateUser({ password: this.password })
    },
    // 修改性别模态框显示
    showGender() {
      this.isShowGender = true
      this.gender = this.user.gender
    },
    // 确认修改性别
    async updataGender() {
      this.updateUser({ gender: this.gender })
    },
    // 封装编辑用户信息的axios请求
    async updateUser(data) {
      const userId = localStorage.getItem('userId')
      const res = await this.$axios.post(`/user_update/${userId}`, data)
      if (res.data.statusCode === 200) {
        this.getUserInfo()
        this.$toast.success('修改成功')
      }
    },
    // 校验上传图片格式
    isImg(name) {
      if (
        name.endsWith('.gif') ||
        name.endsWith('.png') ||
        name.endsWith('.jpg') ||
        name.endsWith('.jpeg')
      ) {
        return true
      } else {
        return false
      }
    },
    // 文件上传完毕触发after-read 回调函数
    async afterRead(file) {
      console.log(file)
      if (!this.isImg(file.file.name)) {
        return this.$toast.fail('上传正确格式的图片')
      }
      if (file.file.size >= 100 * 1024) {
        return this.$toast.fail('上传合适尺寸的图片')
      }
      this.isshowMask = true
      this.img = file.content
    },
    crop() {
      this.$refs.cropper.getCropBlob(async blob => {
        // do something
        console.log(blob)
        const fd = new FormData()
        fd.append('file', blob)
        const res = await this.$axios.post('/upload', fd)
        const { statusCode, data } = res.data
        if (statusCode === 200) {
          this.updateUser({ head_img: data.url })
        }
        // 隐藏裁剪框
        this.isshowMask = false
      })
    },
    cancel() {
      this.isshowMask = false
    }
  },
  components: {
    VueCropper
  }
}
</script>

<style lang="less" scoped>
.avatar {
  text-align: center;
  padding: 30px 0;
  position: relative;
  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  .van-uploader {
    position: absolute;
    left: 50%;
    top: 40px;
    transform: translate(-40%);
    width: 100px;
    height: 100px;
    opacity: 0;
  }
}
// 深度作用选择器三种写法：
// >>>  css的写法
// /deep/  less的写法
// ::v-deep  scss的写法
/deep/ .van-dialog__content {
  padding: 15px;
  .van-field {
    border: 1px solid #ccc;
  }
}
.mask {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 99;
  left: 0;
  top: 0;
  .van-button {
    position: fixed;
    top: 0;
    z-index: 1;
  }
  .cancel {
    right: 0;
  }
}
</style>
