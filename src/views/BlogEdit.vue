<template>
  <div>

    <Header/>

    <div class="blogEdit">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="50px" class="demo-ruleForm">

        <el-form-item label="标题" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>

        <el-form-item label="摘要" prop="description">
          <el-input v-model="ruleForm.description"></el-input>
        </el-form-item>

        <el-form-item label="内容" prop="content">
          <mavon-editor v-model="ruleForm.content"></mavon-editor>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">发布文章</el-button>
          <!--          <el-button @click="resetForm('ruleForm')">重置</el-button>-->
        </el-form-item>

      </el-form>
    </div>


  </div>
</template>

<script>
import Header from '@/components/Header'

export default {
  name: "BlogEdit",
  components: {Header},
  data() {
    return {
      ruleForm: {
        userId: '',
        title: '',
        description: '',
        content: '',
      },
      rules: {
        title: [
          {required: true, message: '请输入标题', trigger: 'blur'},
        ],
        description: [
          {required: true, message: '请输入摘要', trigger: 'blur'}
        ],
        content: [
          {required: true, message: '请输入内容', trigger: 'blur'}
        ]
      }
    };
  },

  created() {
    let blogId = this.$route.params.blogId;
    const _this = this;

    // 有传来的参数，说明是编辑操作
    if (blogId) {
      // 根据id获取文章
      axios.get('/blog/' + blogId).then(resp => {
        let blog = resp.data.data;
        console.log(blog);

        _this.ruleForm.id = blog.id;
        _this.ruleForm.title = blog.title;
        _this.ruleForm.description = blog.description;
        _this.ruleForm.content = blog.content;
      });
    }
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.ruleForm.userId = this.$store.getters.getUser.id;

          console.log(this.ruleForm)
          const _this = this;

          let blogId = this.$route.params.blogId;
          // 若有路由传参，则说明是编辑操作
          if (blogId) {
            console.log('==============================编辑请求==============================');
            axios.put('/blog/edit', {
              id: blogId,
              userId: _this.$store.getters.getUser.id,
              title: _this.ruleForm.title,
              description: _this.ruleForm.description,
              content: _this.ruleForm.content,
            }, {
              headers: {'Authorization': localStorage.getItem('token')}
            }).then(resp => {
              console.log(resp);

              this.$alert('编辑成功', '信息', {
                confirmButtonText: '确定',
                callback: action => {
                  _this.$router.push("/");
                }
              });

            });

          } else {// 发布操作
            console.log('==============================发布请求==============================');
            // 发布文章
            axios.post('/blog/add', this.ruleForm, {
              headers: {
                'Authorization': localStorage.getItem('token')
              }
            }).then(resp => {
              console.log(resp);

              this.$alert('发布成功', '信息', {
                confirmButtonText: '确定',
                callback: action => {
                  _this.$router.push("/");
                }
              });

            });
          }


        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }


}
</script>

<style scoped>
.blogEdit {

}
</style>