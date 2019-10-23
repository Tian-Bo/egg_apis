'use strict';

module.exports = app => {
    const { router, controller, jwt } = app;

    // wap
    // 用户模块
    // router.post('/user/login', controller.wap.users.login) // 登陆
    // router.post('/user/register', controller.wap.users.register) // 注册
    // router.get('/user/info', jwt, controller.wap.users.info) // 获取用户信息

    // 授权模块
    // router.post('/user/code', controller.wap.users.getCode) // 获取验证码






    // merchant
    // 用户模块
    router.post('/user/login', controller.merchant.users.login) // 登陆
    router.post('/user/register', controller.merchant.users.register) // 注册
    router.get('/user/info', jwt, controller.merchant.users.info) // 获取用户信息

    // 授权模块
    router.post('/user/code', controller.merchant.users.getCode) // 获取验证码

    // 上传模块
    router.post('/upload/img', controller.merchant.upload.uploadImg) // 上传图片

































































































































































































































































































    
}
