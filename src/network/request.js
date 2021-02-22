import axios from 'axios';

export function request(config) {
    const instance = axios.create({
        baseURL: 'https://api.shop.eduwork.cn',
        timeout: 5000
    })

    // 请求拦截
    instance.interceptors.request.use(config => {
        // 如果有一个借口需要认证才可以访问，就在这统一设置

        // 放行
        return config;
    }, err => {

    })

    // 响应拦截
    instance.interceptors.response.use(res => {
        return res;
    }, err => {
        // 如果有需要授权才可以访问的借口，统一去授权

        // 如果有错误，这里会去处理，比如显示错误信息

    })

    return instance(config);

}