'use strict';
const path = require('path');

module.exports = appInfo => {
    const config = exports = {};

    config.cluster = {
        listen: {
            port: 443,
            key: '/path/to/app/public/1_apis.xiaopaopao.cn_bundle',
            cert: '/path/to/app/public/2_apis.xiaopaopao.cn'
        }
    };
    // jwt配置
    config.jwt = {
        secret: '123456'
    };

    // ajax 跨域配置
    config.security = {
        csrf:{
            enable:false
        }
    }
    config.cors ={
        origin: '*',
        allowMethods: 'GET, HEAD, PUT, OPTIONS, POST, DELETE, PATCH'
    }

    // 用于cookie签名密钥，应更改为您自己的并保持安全
    config.keys = appInfo.name + '_1563969821490_813';

    // 数据库配置信息
    config.mysql = {
        // 单数据库信息配置
        client: {
        // host
        host: '129.28.206.237',
        // 端口号
        port: '3306',
        // 用户名
        user: 'tianbo',
        // 密码
        password: 'wusuowei',
        // 数据库名
        database: 'xiaopaopao',
        },
        // 是否加载到 app 上，默认开启
        app: true,
        // 是否加载到 agent 上，默认关闭
        agent: false
    }

    return config
}

// https
exports.cluster = {
    listen: {
        https:{
            key: '/app/public/2_apis.xiaopaopao.cn',
            cert: '/app/public/1_apis.xiaopaopao.cn_bundle'
        }
    }
}
