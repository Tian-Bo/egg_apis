// app/middleware/notfound_handler.js
module.exports = () => {
    return async function notFoundHandler(ctx, next) {
        await next();
        if (ctx.status === 404 && !ctx.body) {
            if (ctx.acceptJSON) {
                ctx.body = { error: 'Not Found' };
            } else {
                ctx.body = { error: '接口不存在, 请检查请求方式和请求路径是否正确!' };
            }
        }
    };
  };