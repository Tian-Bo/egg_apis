'use strict';

const Controller = require('egg').Controller
const check = require('../../public/js/check')
const unifyRes = require('../../public/js/unifyRes')

class UsersController extends Controller {

	// 注册
	async register() {
		const tel = this.ctx.request.body.tel
        const password = this.ctx.request.body.password

        if (!check.checkTel(tel)) {
			return this.ctx.body = unifyRes.resFail('', '手机号格式错误')
		}
		if (!check.checkPassword(password)) {
			return this.ctx.body = unifyRes.resFail('', '密码格式错误')
		}

		let findData = await this.ctx.service.user.find('e_users', { 
			tel: tel
		})
		if (findData) {
            return this.ctx.body = unifyRes.resFail('', '该手机已注册')
		} 
		
		let insertData = await this.ctx.service.user.insert('e_users', { 
			username: tel,
			tel: tel, 
			password: password
		})
		if (insertData) {
			return this.ctx.body = unifyRes.resSuccess('', '注册成功')
		}
	}

	// 登陆
	async login() {
		const tel = this.ctx.request.body.tel
		const password = this.ctx.request.body.password

        if (!check.checkTel(tel)) {
			return this.ctx.body = unifyRes.resFail('', '手机号格式错误')
		}
		if (!check.checkPassword(password)) {
			return this.ctx.body = unifyRes.resFail('', '密码格式错误')
        }
        
        let findData = await this.ctx.service.user.find('e_users', { 
			tel: tel
		})
		if (!findData) {
            return this.ctx.body = unifyRes.resFail('', '该手机未注册')
        }
        if (findData[0].password != password) {
            return this.ctx.body = unifyRes.resFail('', '密码错误')
        }

        const token = this.app.jwt.sign({ id: findData.id, tel: tel, password: password }, this.app.config.jwt.secret, { expiresIn: '24h' })
        let data = { token: token }
		return this.ctx.body = unifyRes.resSuccess(data, '登陆成功')
	}

	// 获取用户所有信息
	async info() {
        const authorization = this.ctx.request.header.authorization
        let token = authorization.split('Bearer ')[1]
        let tokenInfo = this.app.jwt.decode(token)
        let userInfo = await this.ctx.service.user.find('e_users', { 
            tel: tokenInfo.tel
		})
		this.ctx.body = userInfo
    }
}

module.exports = UsersController;
