const Service = require('egg').Service;
class UserService extends Service {
	// 查
	async find(where) {
		const data = await this.app.mysql.select('e_users',  { where })
		if (data.length == 0) {
			return ''
		}
		return data
	}

	// 增
	async insert(where) {
		const data = await this.app.mysql.insert('e_users', { where })
		if (data.length == 0) {
			return ''
		}
		return data
	}
}

module.exports = UserService;