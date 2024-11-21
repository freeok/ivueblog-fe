import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: '',
        userInfo: JSON.parse(sessionStorage.getItem("userInfo")),

        fullscreenLoading: false
    },
    mutations: {
        // setter

        // 设置token
        SET_TOKEN: (state, token) => {
            state.token = token;
            localStorage.setItem("token", token);
        },

        // 设置用户信息
        SET_USERINFO: (state, userInfo) => {
            state.userInfo = userInfo;
            // 关闭浏览器后失效，sessionStorage不能存对象，需要序列化
            sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
        },

        // 移除token和用户信息
        REMOVE_INFO: (state) => {
            state.token = '';
            state.userInfo = {};
            localStorage.removeItem("token");
            sessionStorage.removeItem("userInfo");
        }

    },
    getters: {
        // getter
        getUser: state => {
            return state.userInfo;
        }
    },
    actions: {},
    modules: {}
})
