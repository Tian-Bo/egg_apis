// 工具函数

/**
 * 生成随机颜色值
 * @returns {String}
 */
exports.toolRandomColor = () => {
    const rgb = [];
    for (let i = 0; i < 3; ++i) {
        let color = Math.floor(Math.random() * 256).toString(16)
        color = color.length === 1 ? '0' + color : color
        rgb.push(color)
    }
    return '#' + rgb.join('')
}

/**
 * 生成随机四位验证码
 * @returns {String}
 */
exports.toolRandomCode = () => {
    return Math.random().toString(36).substring(3,7)
}