const Service = require('egg').Service;
class UserService extends Service {
	// 查
	async find(table, where) {
		const result = await this.app.mysql.select(table,  { where })
		if (result.length == 0) {
			return ''
		}
		return result
	}

	// 增
	async insert(table, where) {
		const result = await this.app.mysql.insert(table, where)
		return result
	}
}

module.exports = UserService;