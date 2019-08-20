const Service = require('egg').Service;

class UserService extends Service {
  async find(username) {
    const user = await this.app.mysql.select('e_users', {
        where: { tel: username }
    });
    return {
      status: 0,
      message: 'ok',
      data: user
    };
  }
}

module.exports = UserService;