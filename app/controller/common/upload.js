// 'use strict'

// const Controller = require('egg').Controller
// const unifyRes = require('../../public/js/unifyRes')



// class UploadController extends Controller {
//     async upload() {

//         const ctx = this.ctx;

//         return this.ctx.body
    
//         const stream = await ctx.getFileStream();
    
//         // 文件名:随机数+时间戳+原文件后缀
    
//         // path.extname(stream.filename).toLocaleLowerCase()为后缀名（.jpg,.png等）
    
//         const filename = Math.random().toString(36).substr(2) + new Date().getTime() + path.extname(stream.filename).toLocaleLowerCase();
    
//         // 图片存放在静态资源public/img文件夹下
    
//         const target = path.join(this.config.baseDir, 'app/public/img', filename);
    
//         // 生成一个文件写入 文件流
    
//         const writeStream = fs.createWriteStream(target);
    
//         try {
    
//             let result = await _that.ctx.service.home.upload(params);
    
//                     // 异步把文件流 写入
    
//                     this.ctx.body = {
    
//                         code: result.code,
    
//                         data: result.data,
    
//                         message: result.msg
    
//                     }
    
//         } catch (err) {
    
//             // 如果出现错误，关闭管道
    
//             await sendToWormhole(stream);
    
//             throw err;
    
//         }
    
//         this.ctx.body = {
    
//           code: 0,
    
//           data: filename,
    
//           msg: ''
    
//         };
    
//         // 前端使用：服务器地址+文件名
    
//         // http://localhost:7001/public/img/filename
// }

// module.exports = UploadController




'use strict'

const Controller = require('egg').Controller
const unifyRes = require('../../public/js/unifyRes')

const fs = require('fs');
const path = require('path');
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');

class uploadController extends Controller {
    async upload() {
        // TO 获取用户信息
        this.ctx.body = this.ctx
    }
}

module.exports = uploadController