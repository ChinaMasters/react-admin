// node 模块中默认都有 module 对象

// var module = {
//   exports: {

//   }
// }

// exports = module.exports

// return module.exports

// const state = module.exports === exports

exports.name = 'lily'
exports = {}
exports.age = 18
module.exports.sex = 'male'
