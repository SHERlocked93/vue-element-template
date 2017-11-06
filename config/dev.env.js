const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"https://easy-mock.com/mock/59e6f5dd34be4b482ca23abe/pdspa"'
  // BASE_API: '"https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin"'
  BASE_API: '"https://easy-mock.com/mock/59ed5d6d70da825a6d4c86a1/hgmes"'
})
