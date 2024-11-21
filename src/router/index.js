import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/Login'
import Blogs from '@/views/Blogs'
import BlogEdit from '@/views/BlogEdit'
import BlogDetail from '@/views/BlogDetail'


Vue.use(VueRouter)

const routes = [
    // 主页
    {
        path: '/',
        name: 'Index',
        component: Blogs
    },
    // 登录页面
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    // 发布博客页面，需要权限
    {
        path: '/blog/add',
        name: 'BlogAdd',
        component: BlogEdit,
        meta: {
            // 添加该字段，表示进入这个路由是需要登录的
            requireAuth: true
        }
    },
    // 博客详情页面
    {
        path: '/blog/:blogId',
        name: 'BlogDetail',
        component: BlogDetail
    },
    // 编辑博客页面，需要权限
    {
        path: '/blog/:blogId/edit',
        name: 'BlogEdit',
        component: BlogEdit,
        meta: {
            // 添加该字段，表示进入这个路由是需要登录的
            requireAuth: true
        }
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
