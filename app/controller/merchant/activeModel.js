'use strict'

const Controller = require('egg').Controller
const unifyRes = require('../../public/js/unifyRes')

class ActiveModelController extends Controller {
    async getActiveModel() {
        // TO 获取用户信息
        let userInfo = await this.ctx.service.db.find('t_active_model')
        this.ctx.body = unifyRes.resSuccess(userInfo, '获取成功')
    }
}

module.exports = ActiveModelController