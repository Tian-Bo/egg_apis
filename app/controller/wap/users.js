'use strict';

const Controller = require('egg').Controller;

class UsersController extends Controller {





	// 注册
	async register() {
		const tel = this.ctx.request.body.tel
		const password = this.ctx.request.body.password

		if (tel == '') {
			return this.ctx.body = {
				status: 1,
				message: '请输入正确的手机号',
				data: []
			}
		}

		if (password == '') {
			return this.ctx.body = {
				status: 1,
				message: '请输入正确的密码',
				data: []
			}
		}

		let findData = await this.ctx.service.user.find('e_users', { 
			tel: tel
		})
		if (findData) {
			return this.ctx.body = {
				status: 1,
				message: '该手机已注册',
				data: []
			}
		} 
		
		let insertData = await this.ctx.service.user.insert('e_users', { 
			username: tel,
			tel: tel, 
			password: password
		})

		if (insertData) {
			return this.ctx.body = {
				status: 0,
				message: '注册成功',
				data: data
			}
		}
	}

	// 登陆
	async login() {
		const tel = this.ctx.request.body.tel
		const password = this.ctx.request.body.password

		if (tel == '') {
			return this.ctx.body = {
				status: 1,
				message: '手机号不能为空',
				data: []
			}
		}

		if (password == '') {
			return this.ctx.body = {
				status: 1,
				message: '密码不能为空',
				data: []
			}
		}

		const token = this.app.jwt.sign({ tel: tel, password: password }, this.app.config.jwt.secret, { expiresIn: '24h' })
		this.app.jwt.decode('token')
		this.ctx.body = {
			status: 0,
			message: 'ok',
			data: { token: token }
		}
	}


	// 获取用户所有信息
	async info() {
		// const tel = 18580557309
		// this.ctx.body = await this.ctx.service.user.find(tel);

		const token = this.app.jwt.sign({ tel: '123', password: 'password' }, this.app.config.jwt.secret, { expiresIn: '24h' })
		let abb = this.app.jwt.decode(token)
		this.ctx.body = token
	}
	// 获取用户所有信息
	async test() {
		const tel = 18580557309
		this.ctx.body = await this.ctx.service.user.find(tel);
	}

	// 获取用户所有信息
	async tianbo() {
		const tel = 18580557309
		this.ctx.body = await this.ctx.service.user.find(tel);
	}



	// 修改用户信息
	async infoModify() {
		const username = this.ctx.query.name
		this.ctx.body = await this.ctx.service.user.find(username);
	}


}

module.exports = UsersController;
