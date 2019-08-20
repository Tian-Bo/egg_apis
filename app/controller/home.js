'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
    async info() {
        let username = this.ctx.query.name
        this.ctx.body =  await this.ctx.service.user.find(username);
    }
    async login() {
        // let username = this.ctx.query.name
        // this.ctx.body =  await this.ctx.service.user.find(username);
        const token = this.app.jwt.sign({ foo: '简简单单' }, this.app.config.jwt.secret, {expiresIn: '24h'});
        this.ctx.body =  token
    }
    async index() {
        // let username = this.ctx.query.name
        // this.ctx.body =  await this.ctx.service.user.find(username);
        const token = this.app.jwt.sign({ foo: '简简单单' }, this.app.config.jwt.secret, {expiresIn: '24h'});
        this.ctx.body =  token
    }
}

module.exports = HomeController;
