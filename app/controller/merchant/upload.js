'use strict';

const Controller = require('../../core/base_controller')
const path = require('path');
const fs = require('mz/fs');

class UploadController extends Controller {

    // 上传单个文件到oss
    async uploadImg() {
        const { ctx } = this
        let arr = []
        for (const file of ctx.request.files) {
            let result
            try {
                const filename = Date.now() + '' + Number.parseInt(Math.random() * 10000) + path.basename(file.filename);
                result = await ctx.oss.put(filename, file.filepath)
            } finally {
                // 需要删除临时文件
                await fs.unlink(file.filepath)
            }
            arr.push(result.url)
        }
        if (arr.length == 1) {
            arr = arr[0]
        }
        
        ctx.body = this.success(arr, '上传成功')

    }
}

module.exports = UploadController;