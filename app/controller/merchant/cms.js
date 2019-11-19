'use strict'

const Controller = require('../../core/base_controller')
const check = require('../../public/js/check')

class CmsController extends Controller {

    // TODO 发送短信
    async getCode() {
        const { ctx } = this;
        const { tel } = ctx.request.body

        // TO 验证参数格式
        if (!check.checkTel(tel)) {
            return ctx.body = this.fail('', '手机号格式错误')
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
                ctx.body = err
            } else {
                ctx.body = res
            }
        }
        ssender.send(smsType, 86, phoneNumbers[0], '【小泡泡】您的验证码是: '+ tool.toolRandomCode, '', '', callback)

    }
}

module.exports = CmsController
