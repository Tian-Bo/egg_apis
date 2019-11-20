'use strict';

module.exports = app => {
    const { router, controller, jwt } = app;
    // const gzip = app.middleware.gzip({ threshold: 1024 });
    
    // 中间件测试
    app.router.get('/needgzip', app.middleware.gzip, app.controller.merchant.users.info);

    // merchant
    // 用户模块
    router.post('/user/login', controller.merchant.users.login) // 登陆
    router.post('/user/register', controller.merchant.users.register) // 注册
    router.get('/user/info', jwt, controller.merchant.users.info) // 获取用户信息
    router.post('/user/edit/info', controller.merchant.users.editInfo)

    // 授权模块
    router.post('/user/code', controller.merchant.cms.getCode) // 获取验证码

    // 上传模块
    router.post('/upload/img', controller.merchant.upload.uploadImg) // 上传图片

    // 活动模块
    router.get('/active/model', controller.merchant.activeModel.activeModel) // 获取活动模型列表
































































































































































































































































































    
}
