'use strict';

// mysql
exports.mysql = {
    enable: true,
    package: 'egg-mysql',
}

// token
exports.jwt = {
    enable: true,
    package: "egg-jwt",
};

// 跨越
exports.cors = {
    enable: true,
    package: 'egg-cors',
};

// config/plugin.js
exports.oss = {
    enable: true,
    package: 'egg-oss',
};

// 参数校验
exports.validate = {
    enable: true,
    package: 'egg-validate',
};
