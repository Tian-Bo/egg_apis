'use strict';

module.exports = app => {
    const { router, controller, jwt } = app;
    
    // 用户模块
    router.post('/user/login', controller.wap.users.login)
    router.post('/user/register', controller.wap.users.register)
    router.post('/user/code', controller.wap.users.getCode)
    router.get('/user/info', jwt, controller.wap.users.info)

































































































































































































































































































    
}
