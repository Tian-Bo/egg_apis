'use strict'

const Controller = require('egg').Controller

class ActiveModelController extends Controller {
    
    // 活动所有活动模型
    async activeModel() {
        const { ctx } = this
        let model_id = ctx.request.query.model_id || ''
        ctx.body = model_id

        let sql = { type: model_id }
        if (model_id == '') {
            sql = ''
        }
        ctx.body = await ctx.service.db.find('t_active_model', sql)
    }

}

module.exports = ActiveModelController