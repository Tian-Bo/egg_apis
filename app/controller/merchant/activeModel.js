'use strict'

const Controller = require('../../core/base_controller')

class ActiveModelController extends Controller {
    
    // 活动所有活动模型
    async info() {
        const { ctx } = this

        let model_id = ctx.request.query.model_id || ''

        let sql = { type: model_id }
        if (model_id == '') {
            sql = ''
        }

        const result = await ctx.service.db.find('active_model', sql)

        if (result) {
            return ctx.body = this.success(result, '获取成功')
		} 
    }

}

module.exports = ActiveModelController