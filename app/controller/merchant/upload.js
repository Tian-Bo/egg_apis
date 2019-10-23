'use strict';

const Controller = require('egg').Controller;
const unifyRes = require('../../public/js/unifyRes')
const fs = require('fs');
const path = require('path');
const sendToWormhole = require('stream-wormhole');

class UploadController extends Controller {

    async uploadImg() {
        const ctx = this.ctx;
        const stream = await ctx.getFileStream();
        const fileName = stream.filename;
        if (!fileName) { //注意如果没有传入图片直接返回   
            return this.ctx.body = unifyRes.resFail('', '上传失败')
        }
        this.ctx.body = fileName
        
        let target  = path.join(this.config.baseDir, `app/public/comfiles/${stream.filename}`);
        const result = await new Promise((resolve, reject) => {
            const remoteFileStream = fs.createWriteStream(target);
            stream.pipe(remoteFileStream);
            let errFlag;
            remoteFileStream.on('error', err => {
                errFlag = true;
                sendToWormhole(stream);
                remoteFileStream.destroy();
                reject(err);
            });
            
            remoteFileStream.on('finish', async () => {
                if (errFlag) return;
                resolve({ fileName, name: stream.fields.name });
            });
          });
        return result;  
      }
}

module.exports = UploadController;