module.exports = () => {
  require('./goods').create()
  require('./bill').create()
  require('./bill_goods').create()
  require('./specifications').create()
  require('./user').create()
}
