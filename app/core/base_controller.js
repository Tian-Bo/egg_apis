// app/core/base_controller.js

const { Controller } = require('egg');
class BaseController extends Controller {
  get user() {
    return '';
  }

  /**
   * 成功响应
   * @returns {object}
   */
  success(data, message, status) {
    return {
        status: status || 0,
        message: message || '成功',
        data: data || []
    }
  }

  /**
  * 失败响应
  * @returns {object}
  */
  fail(data, message, status) {
    return {
        status: status || 1,
        message: message || '失败',
        data: data || []
    }
  }
}
module.exports = BaseController;
