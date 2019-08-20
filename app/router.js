'use strict';

module.exports = app => {
    const { router, controller, jwt } = app;
    
    router.get('/user', jwt, controller.home.info)
    router.get('/login', controller.home.login)
    router.get('/index', controller.home.index)
}
