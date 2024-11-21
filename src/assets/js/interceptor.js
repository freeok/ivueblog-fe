/**
 * axios拦截器
 */

import Element from 'element-ui'
import store from '@/store'
import router from "@/router";

// 接口地址
axios.defaults.baseURL = process.env.NODE_ENV === 'production'
    ? 'http://124.221.158.211:8181' // 生产环境
    : 'http://localhost:8181'       // 开发环境

// http request 拦截器
axios.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(error)
    }
);

// http response 拦截器
axios.interceptors.response.use(resp => {

    let res = resp.data;

    console.log('==========response 拦截器==========');
    console.log(resp);
    console.log('==========response 拦截器==========');

    if (res.code === 200) {
        return resp;
    } else {
        console.log("状态码：" + res.code);

        Element.Message.error(resp.data.msg);

        return Promise.reject(resp.data.msg);
    }

}, error => {
    //console.log(error)

    if (error.response.data) {
        error.message = error.response.data.msg;
    }

    // 若请求的权限不足，则移除token和用户信息，并跳转到登录页面
    if (error.response.status === 401) {
        store.commit('REMOVE_INFO');
        router.push('/login');
    }

    Element.Message.error(error.message);
    return Promise.reject(error.message);

});