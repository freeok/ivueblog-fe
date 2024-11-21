<template>
  <div class="blogs">

    <Header/>

    <div class="block">

      <el-timeline style="min-height: 800px;">
        <el-timeline-item :timestamp="blog.created" placement="top" v-for="blog in blogs">
          <el-card>
            <h4>
              <router-link :to="{name:'BlogDetail',params:{blogId:blog.id}}"
                           style="color:#409EFF;text-decoration-line: none;">
                {{ blog.title }}
              </router-link>
            </h4>
            <p>{{ blog.description }}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>

      <!--分页控件-->
      <el-pagination class="pagination"
                     background
                     layout="sizes,prev, pager, next,total,jumper"
                     :total="total"
                     :current-page="currentPage"
                     :page-size="pageSize"
                     :page-sizes="[5,10,20]"
                     @current-change="page"
                     @size-change="handleSizeChange">
      </el-pagination>
    </div>

    <div class="footer">
      Copyright © {{ `2020 - ${new Date().getFullYear()}` }} PC的技术分享 All Rights Reserved
      <a
          href="https://beian.miit.gov.cn/"
          target="_blank"
      >豫ICP备2022002173号-1</a>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'

export default {
  name: "Blogs",
  components: {Header},
  data() {
    return {
      blogs: {},
      total: 0,
      currentPage: 1,
      pageSize: 5
    }
  },
  created() {
    this.page(1);
  },
  methods: {
    // 每页条数变化时执行
    handleSizeChange(pageSize) {
      console.log('每页显示条数：' + pageSize)
      this.pageSize = pageSize;
      // 从第1页开始查
      this.page(1);
    },
    page(current) {
      // 开启加载动画
      this.$store.state.fullscreenLoading = true;

      const _this = this;
      axios({
        method: 'get',
        url: '/blog/list',
        params: {
          current: current,
          page: _this.pageSize
        }
      }).then(resp => {
        let data = resp.data.data;
        console.log(resp);

        _this.blogs = data.records;
        _this.total = data.total;
        _this.currentPage = data.current;
        _this.pageSize = data.size;

        console.log(_this.blogs);

        // 关闭加载动画
        this.$store.state.fullscreenLoading = false;
      });

    },
    send: function () {
      axios.post('/user/test', null, {
            headers: {
              "Authorization": localStorage.getItem("token")
            }
          }
      ).then(resp => {
        console.log(resp);
      })
    }
  }
}
</script>

<style scoped>
.blogs {

}

.pagination {
  text-align: center;
}

.footer {
  margin: 100px 0 20px 0;
  text-align: center;
  font-size: 12px;
}
</style>