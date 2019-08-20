'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async info() {
    // let username = this.ctx.query.name
    // this.ctx.body =  await this.ctx.service.user.find(username);
    this.ctx.body = this.app.jwt.sign('userToken', this.app.secret, {expiresIn: '1h'}) 
    // this.ctx.body = '000'
  }
}

module.exports = HomeController;
