'use strict'

const Controller = require('../../core/base_controller')
const check = require('../../public/js/check')

class UsersController extends Controller {

	// TODO 注册
	async register() {
        const { ctx, service } = this;
        const { tel, password } = ctx.request.body

        // TO 验证参数格式
        if (!check.checkTel(tel)) {
			return ctx.body = this.fail('', '手机号格式错误')
		}
		if (!check.checkPassword(password)) {
			return ctx.body = this.fail('', '密码格式错误')
		}

        // TO 验证是否注册
		let findData = await service.db.find('users', { 
			user_tel: tel
		})
		if (findData) {
            return ctx.body = this.fail('', '该手机已注册')
		} 
        
        // TO 验证通过,开始注册
		let insertData = await service.db.insert('users', { 
			user_name: tel,
			user_tel: tel, 
			user_password: password
        })
        
		if (insertData) {
			ctx.body = this.success('', '注册成功')
		}
	}

	// TODO 登陆
	async login() {
        const { ctx, service } = this;
        const { tel, password } = ctx.request.body

        // TO 验证参数格式
        if (!check.checkTel(tel)) {
			return ctx.body = this.fail('', '手机号格式错误')
		}
		if (!check.checkPassword(password)) {
			return ctx.body = this.fail('', '密码格式错误')
        }

        // TO 验证是否注册
        let findData = await service.db.find('users', { 
			user_tel: tel
		})
		if (!findData) {
            return ctx.body = this.fail('', '该手机未注册')
        }

        // 验证密码是否正确
        if (findData[0].user_password != password) {
            return ctx.body = this.fail('', '密码错误')
        }

        // TO 验证通过, 允许登陆
        const token = this.app.jwt.sign({ id: findData.user_id, tel: tel, password: password }, this.app.config.jwt.secret, { expiresIn: '24h' })
        let data = { 
            token: token,
            user_info: findData[0]
         }

		ctx.body = this.success(data, '登陆成功')
	}

	// TODO 获取用户信息
	async info() {
        const { app, ctx, service } = this;
        const { authorization } = ctx.request.header

        // TO 解析token, 获取用户信息
        let token = authorization.split('Bearer ')[1]
        let tokenInfo = app.jwt.decode(token)

        // TO 解析成功, 查询用户信息
        let userInfo = await service.db.find('users', { 
            user_tel: tokenInfo.tel
        })
        
        ctx.body = this.success(userInfo[0], '获取成功')
    }

    // TODO 修改用户信息
    async editInfo() {
        const { app, ctx, service } = this;
        const { authorization } = ctx.request.header

        // TO 解析token, 获取用户信息
        let token = authorization.split('Bearer ')[1]
        let tokenInfo = app.jwt.decode(token)
    }
    
}

module.exports = UsersController
