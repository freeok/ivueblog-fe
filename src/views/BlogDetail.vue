<template>
  <div>

    <Header/>

    <div class="detail">
      <h2>{{ blog.title }}</h2>

      <el-link icon="el-icon-edit" v-show="ownBlog">
        <router-link :to="{name:'BlogEdit',params:{blogId:blog.id}}" style="text-decoration-line: none;">
          编辑
        </router-link>
      </el-link>

      <el-divider></el-divider>

      <div v-html="blog.content" class="markdown-body"></div>
    </div>

  </div>
</template>

<script>
import 'github-markdown-css'
import Header from '@/components/Header'

export default {
  name: "Blogs",
  props: {},
  components: {Header},
  data() {
    return {
      blog: {
        title: '标题',
        content: '内容',
      },
      ownBlog: false,


    }
  },
  created() {
    const _this = this;
    const blogId = this.$route.params.blogId;
    console.log(blogId);

    // 根据id获取文章
    axios.get('/blog/' + blogId).then(resp => {
      let blog = resp.data.data;
      console.log(blog);

      _this.blog.id = blog.id;
      _this.blog.title = blog.title;

      let MarkdownIt = require('markdown-it'),
          md = new MarkdownIt();

      _this.blog.content = md.render(blog.content);

      // 判断是不是自己的文章
      _this.ownBlog = (blog.userId === _this.$store.getters.getUser.id);

    });
  }
}
</script>

<style scoped>

.detail {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  width: 100%;
  min-height: 700px;
  padding: 20px 50px;
}

</style>