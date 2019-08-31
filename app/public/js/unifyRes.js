// 统一返回参数

/**
 * 成功响应
 * @returns {object}
 */
exports.resSuccess= (data, message, status) => {
    return {
        status: status || 0,
        message: message || '请求成功',
        data: data || []
    }
}

 /**
 * 失败响应
 * @returns {object}
 */
exports.resFail= (data, message, status) => {
    return {
        status: status || 1,
        message: message || '请求失败',
        data: data || []
    }
}