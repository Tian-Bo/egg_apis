'use strict';
const path = require('path');

module.exports = appInfo => {
    const config = exports = {};


    // jwt配置
    config.jwt = {
        secret: 'tianbo'
    };


    // stream
    config.multipart = {
        mode: 'file',
    };


    // oss 配置文件
    config.oss = {
        client: {
          accessKeyId: 'LTAI4FgrUYC97mLPThWqacBk',
          accessKeySecret: '0gyITkCZxNfP8LaQBvoX5hS2JrRjbO',
          bucket: 'hdgyun',
          endpoint: 'oss-cn-beijing.aliyuncs.com',
          timeout: '60s',
        },
    };


    // ajax 跨域配置
    config.security = {
        csrf: {
            enable: false
        }
    }
    config.cors = {
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
            user: 'xiaopaopao',
            // 密码
            password: 'wusuowei54345',
            // 数据库名
            database: 'xiaopaopao',
        },
        // 是否加载到 app 上，默认开启
        app: true,
        // 是否加载到 agent 上，默认关闭
        agent: false
    }


    // 统一错误处理
    config.onerror = {
        // 线上页面发生异常时，重定向到这个页面上
        all(err, ctx) {
            // 在此处定义针对所有响应类型的错误处理方法
            // 注意，定义了 config.all 之后，其他错误处理方法不会再生效
            ctx.body = JSON.stringify(err);
            // ctx.status = 500;
        }
    }

    config.notfound = {
        pageUrl: '/404.html',
    }


    // // 中间件配置
    config.middleware = [ 'errorHandler' ]
    // config.errorHandler = {
    //   match: '/api',
    // }
    // // 中间件配置
    // config.gzip = {
    //     threshold: 1024, // 小于 1k 的响应体不压缩
    // }

    // config.validate = {
        // convert: false,
        // validateRoot: false,
    // };

    config.middleware = [ 'gzip' ];

    // 配置 gzip 中间件的配置
    // config.gzip = {
    //     threshold: 1024, // 小于 1k 的响应体不压缩
    // };

    return config
}

// https
// exports.cluster = {
//     listen: {
//         https: {
//             key: '/app/public/2_apis.xiaopaopao.cn',
//             cert: '/app/public/1_apis.xiaopaopao.cn_bundle'
//         }
//     }
// }

