import methodMap from './apiMap';
import AsInst from './axios';
import { Message } from 'element-ui';

/**
 * 网络请求插件
 */
class Http {}

Http.install = function(Vue) {

    /**
     * 全局请求接口
     * @param method 方法
     * @param opts 参数
     * @param toast 是否提示
     * @returns {string}
     */
    Vue.prototype.request = function(method, opts, toast, id = "") {
        let m = methodMap[method];

        // 如果 apiMap.js 中不存在请求方法
        if (!m) {
            closeLoading();
            console.log('url 错误', '返回结果：err = ', '无法请求，无效的请求！', '\n');
            return new Promise((resolve, reject) => {
                reject('url 错误' + '返回结果：err = ' + '无法请求，无效的请求！');
            });
        }

        // 如果缺少请求 method 方法
        if (typeof m.method === 'undefined') {
            console.log('method 错误', '缺少请求 method 方法', '\n');
            return new Promise((resolve, reject) => {
                reject('method 错误' + '缺少请求 method 方法');
            });
        }

        // 如果请求参数为空或者不为
        let optsType = typeof(opts);
        if (optsType === null || optsType !== 'object') {
            opts = {};
        }

        let headers = {};
        let headersType = typeof(m.code);
        if (headersType === 'String') {
            headers = { "code": m.code };
        }

        //如果有给 toast 参数则显示 loading 加载数据
        showLoading(toast);

        let params = {};
        let data = {};
        if (m.method == 'put' || m.method == 'post' || m.method == 'patch' || m.method == 'delete') {
            data = opts;
        } else {
            params = opts;
        }

        let config = {
            "method": m.method,
            "url": m.url + id,
            "headers": headers,
            "params": params,
            "data": data
        };

        return new Promise((resolve, reject) => {
            // this.$message.destroy()
            AsInst.request(config)
                .then((response) => {
                    closeLoading();
                    resolve(response.data);
                })
                .catch((error) => {
                    // errorHandler(error);
                    closeLoading();
                    reject(error);
                    if (this.$route.name == "login") {
                        if (error.response.data.statusCode != 200) {
                            this.identify();
                            this.form.isActivepic = true
                            this.$message.error(error.response.data.msg);
                        }
                    } else {
                        if (error.response.data.statusCode != 200) {
                            this.$message.destroy()
                            this.$message.error(error.response.data.msg);
                        }
                    }

                });
        });
    };

    /**
     * POST 请求 无提示
     * @param url 请求URL
     * @param data 请求数据
     * @param toast 是否显示 modal
     * @returns {Promise}
     */
    Vue.prototype.apiPost = function(url, data, toast = false) {
        showLoading(toast);

        return new Promise((resolve, reject) => {
            AsInst.post(url, data).then((response) => {
                closeLoading();
                resolve(response.data);
            }).catch((error) => {
                errorHandler(error);
                closeLoading();
                reject(error);
            });
        });
    };

    /**
     * GET 请求 无提示
     * @param url 请求URL
     * @param data 请求数据
     * @returns {Promise}
     */
    Vue.prototype.apiGet = function(url, data, toast = false) {
        showLoading(toast);

        return new Promise((resolve, reject) => {
            AsInst.get(url, {
                params: data
            }).then((response) => {
                closeLoading();
                resolve(response.data);
            }).catch((error) => {
                errorHandler(error);
                closeLoading();
                reject(error);
            });
        });
    };

    /**
     * put 请求 无提示
     * @param url 请求URL
     * @param data 请求数据
     * @returns {Promise}
     */
    Vue.prototype.apiPut = function(url, data, toast = false) {
        showLoading(toast);

        return new Promise((resolve, reject) => {
            AsInst.put(url, {
                params: data
            }).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                errorHandler(error);
                closeLoading();
                reject(error);
            });
        });
    };

    /**
     * delete 请求 无提示
     * @param url 请求URL
     * @param data 请求数据
     * @returns {Promise}
     */
    Vue.prototype.apiDelete = function(url, data, toast = false) {
        showLoading(toast);

        return new Promise((resolve, reject) => {
            AsInst.delete(url, {
                params: data
            }).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                errorHandler(error);
                closeLoading();
                reject(error);
            });
        });
    };

    /**
     * 错误请求处理
     */
    function errorHandler(error) {
        if (error.status === 200) {
            if (error.data && error.data.code === 2000) {
                this.$message.error(error.data.msg);
                console.log('自定义日志：', error);
            }
        } else if (error.status === 500) {
            Message.error('后端服务请求500错误,如一直出现错误,请联系我们');
            console.log('自定义日志：', error);
        } else {
            Message.error('服务请求出错');
            console.log('自定义日志：', error);
        }
    }

    /**
     * 显示等待窗
     */
    function showLoading(toast) {
        if (toast && typeof(toast) === 'boolean') {
            Vue.prototype.load = Vue.prototype.$loading('加载中...');
        } else if (toast && typeof(toast) === 'string') {
            Vue.prototype.load = Vue.prototype.$loading(toast);
        }
    }

    /**
     * 关闭等待窗
     */
    function closeLoading() {
        Vue.prototype.load.close();
    }
};

export default Http;