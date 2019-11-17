// app.js

module.exports = app => {
    // 在中间件最前面统计请求时间
    // app.config.coreMiddleware.unshift('report');
    app.validator.addRule('json', (rule, value) => {
      try {
        if (value < 111) {
          return '111'
        }
      } catch (err) {
        return 'must be json string';
      }
    });
    app.once('server', server => {
      // websocket
    });
    app.on('error', (err, ctx) => {
      // report error
    });
    app.on('request', ctx => {
      // log receive request
    });
    app.on('response', ctx => {
      // ctx.starttime is set by framework
      const used = Date.now() - ctx.starttime;
      // log total cost
    });
  };