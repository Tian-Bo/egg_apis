'use strict'

const Controller = require('egg').Controller
const check = require('../../public/js/check')
const unifyRes = require('../../public/js/unifyRes')
const tool = require('../../public/js/tool')

class UsersController extends Controller {

	// TODO 注册
	async register() {
		const tel = this.ctx.request.body.tel
        const password = this.ctx.request.body.password

        // TO 验证参数格式
        if (!check.checkTel(tel)) {
			return this.ctx.body = unifyRes.resFail('', '手机号格式错误')
		}
		if (!check.checkPassword(password)) {
			return this.ctx.body = unifyRes.resFail('', '密码格式错误')
		}

        // TO 验证是否注册
		let findData = await this.ctx.service.user.find('t_users', { 
			tel: tel
		})
		if (findData) {
            return this.ctx.body = unifyRes.resFail('', '该手机已注册')
		} 
        
        // TO 验证通过,开始注册
		let insertData = await this.ctx.service.user.insert('t_users', { 
			username: tel,
			tel: tel, 
			password: password
		})
		if (insertData) {
			return this.ctx.body = unifyRes.resSuccess('', '注册成功')
		}
	}

	// TODO 登陆
	async login() {
		const tel = this.ctx.request.body.tel
		const password = this.ctx.request.body.password

        // TO 验证参数格式
        if (!check.checkTel(tel)) {
			return this.ctx.body = unifyRes.resFail('', '手机号格式错误')
		}
		if (!check.checkPassword(password)) {
			return this.ctx.body = unifyRes.resFail('', '密码格式错误')
        }
        
        // TO 验证是否注册
        let findData = await this.ctx.service.user.find('t_users', { 
			tel: tel
		})
		if (!findData) {
            return this.ctx.body = unifyRes.resFail('', '该手机未注册')
        }
        if (findData[0].password != password) {
            return this.ctx.body = unifyRes.resFail('', '密码错误')
        }

        // TO 验证通过, 允许登陆
        const token = this.app.jwt.sign({ id: findData.id, tel: tel, password: password }, this.app.config.jwt.secret, { expiresIn: '24h' })
        let data = { token: token }
		return this.ctx.body = unifyRes.resSuccess(data, '登陆成功')
	}

	// TODO 获取用户所有信息
	async info() {
        const authorization = this.ctx.request.header.authorization

        // TO 解析token, 获取用户信息
        let token = authorization.split('Bearer ')[1]
        let tokenInfo = this.app.jwt.decode(token)

        // TO 解析成功, 查询用户信息
        let userInfo = await this.ctx.service.user.find('t_users', { 
            tel: tokenInfo.tel
		})
        this.ctx.body = unifyRes.resSuccess(userInfo[0], '获取成功')
    }
    
	// TODO 发送短信
	async getCode() {
        const tel = this.ctx.request.body.tel

        // TO 验证参数格式
        if (!check.checkTel(tel)) {
			return this.ctx.body = unifyRes.resFail('', '手机号格式错误')
		}
        
        // TO 短信配置
        let QcloudSms = require('qcloudsms_js') // 短信应用SDK AppID
        let appid = 1400250848  // SDK AppID是1400开头
        let appkey = '879c2d676836bb267356ad8ce1091c07' // 短信应用SDK AppKey
        let phoneNumbers = ['18580557309']  // 需要发送短信的手机号码
        let templateId = 409137  // 短信模板ID，需要在短信应用中申请 NOTE: 这里的模板ID`7839`只是一个示例，真实的模板ID需要在短信控制台中申请
        let smsSign = '小泡泡' // 签名 NOTE: 这里的签名只是示例，请使用真实的已申请的签名, 签名参数使用的是`签名内容`，而不是`签名ID`
        let smsType = 0 // Enum{0: 普通短信, 1: 营销短信}

        // TO 配置完毕, 发送验证码
        let qcloudsms = QcloudSms(appid, appkey) // 实例化QcloudSms
        let ssender = qcloudsms.SmsSingleSender()
        
        /**
         *  设置请求回调处理, 这里只是演示，用户需要自定义相应处理回调
         * @param {*} err 
         * @param {*} res 
         * @param {*} resData 
         */
        function callback(err, res, resData) {
            if (err) {
                this.ctx.body = err
            } else {
                this.ctx.body = res
            }
        }
        ssender.send(smsType, 86, phoneNumbers[0], '【小泡泡】您的验证码是: '+ tool.toolRandomCode, '', '', callback)

    }
}

module.exports = UsersController
