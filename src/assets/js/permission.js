/**
 * 路由拦截器
 */

import router from '@/router'

// 路由判断登录，根据路由配置文件的参数
router.beforeEach((to, from, next) => {

    // 判断该路由是否需要登录权限
    if (to.matched.some(record => record.meta.requireAuth)) {

        const token = localStorage.getItem('token');
        console.log(`路由拦截获取的token：${token}`);

        // 判断当前的token是否存在
        if (token) {
            if (to.path === '/login') {

            } else {
                next();
            }
        } else {
            next({
                path: '/login'
            });
        }

    } else {// 无需权限，直接放行
        next();
    }

});
