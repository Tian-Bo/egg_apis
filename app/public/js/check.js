// 统一请求参数验证


/**
 * 验证昵称
 * @hint 由1到12位（字母，数字，下划线，减号）
 * @param val 昵称
 * @returns {boolean}
 */
exports.checkName = (val) => {
	let reg = /^[a-zA-Z0-9_-]{1,12}$/
	return reg.test(val)
}
 
/**
 * 验证手机号
 * @param val 手机号
 * @returns {boolean}
 */
exports.checkTel = (val) => {
    let reg = /^1[23456789][0-9]{9}$/
	return reg.test(val)
}

/**
 * 验证密码
 * @hint 必须且只含有数字和字母，可以拥有英文符号，8-16位
 * @param val 密码
 * @returns {boolean}
 */
exports.checkPassword = (val) => {
    let reg = /(?=.{6,16})(?=.*\d)(?=.*[a-z])[\x20-\x7f]*/i
	return reg.test(val)
}

/**
 * 验证验证码
 * @hint 必须是四位纯数字验证码
 * @param val 验证码输入input
 * @returns {boolean}
 */
exports.checkVerification= (val) => {
    let reg = /^[0-9]{4}$/
	return reg.test(val)
}

/**
 * 验证身份证号
 * @param val 身份证号
 * @returns {boolean}
 */
exports.checkCardNo = (str) => {
	let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
	return reg.test(val)
}