<template>
  <div class="content">

    <h3>欢迎来到PC的技术分享</h3>

    <div class="block">
      <el-avatar :size="60" :src="user.avatar"></el-avatar>
      <div>{{ user.username }}</div>
    </div>

    <div class="nav">
      <span><el-link href="/">主页</el-link></span>
      <el-divider direction="vertical"></el-divider>

      <span><el-link type="success" href="/blog/add">发布文章</el-link></span>
      <el-divider direction="vertical"></el-divider>

      <span v-show="!isLogin"><el-link type="primary" href="/login">登录</el-link></span>

      <span v-show="isLogin"><el-link type="danger" @click="logout">退出</el-link></span>
    </div>


  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      user: {
        username: '未登录',
        avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
      },
      isLogin: false
    }
  },
  created() {
    // SessionStorage存在用户信息
    if (this.$store.getters.getUser) {
      this.user.username = this.$store.getters.getUser.username;
      this.user.avatar = this.$store.getters.getUser.avatar;
      this.isLogin = true;
    }
  },
  methods: {
    logout() {
      console.log('退出登录');
      const _this = this;
      axios.get('/logout', {
        headers: {'Authorization': localStorage.getItem('token')}
      }).then(resp => {
        _this.$store.commit('REMOVE_INFO');
        _this.$router.push('/login');
      });
    }


  }
}
</script>

<style scoped>

.content {
  max-width: 960px;
  margin: 0 auto;
  text-align: center;
}

.nav {
  margin: 10px 0;
}
</style>