// app/middleware/error_handler.js
module.exports = () => {
    return async function errorHandler(ctx, next) {

		// 错误处理

        try {
			await next();
			if (ctx.status === 404 && !ctx.body) {
				if (ctx.acceptJSON) {
					return ctx.body = { 
						status: -2,
						data: '',
						message: err.message
					}
				} else {
					return ctx.body = { 
						status: -2,
						data: '接口不存在, 请检查请求方式和请求路径是否正确!',
						message: '请求错误!'
					}
				}
			}
        } catch (err) {
			
          	// 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
			ctx.app.emit('error', err, ctx);

			const status = err.status || 500;
			// 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
			// const error = status === 500 && ctx.app.config.env === 'prod'
			// 	? '服务器错误'
			// 	: err.message;
			if (status == 401) {
				return ctx.body = { 
					status: -1,
					data: err.message,
					message: '用户信息已过期!'
				}
			}
    
          	// 从 error 对象上读出各个属性，设置到响应中
			ctx.body = { 
				status: -3,
				data: err.message,
				message: '服务器错误!'
			}
			if (status === 422) {
				ctx.body.detail = { 
					status: -4,
					data: err.errors,
					message: '请求参数错误!'
				}
			}
			ctx.status = status;
        }
    };
};