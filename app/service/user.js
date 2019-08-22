const Service = require('egg').Service;

class UserService extends Service {
  async find(tel) {
    const data = await this.app.mysql.select('e_users', {
        where: { tel: tel }
    });
    return {
      status: 0,
      message: 'ok',
      data: data
    }
  }
}

module.exports = UserService;