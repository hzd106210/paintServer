module.exports = () => {
  require('./goodsModel').create()
  require('./billModel').create()
  require('./billGoodsModel').create()
  require('./specificationsModel').create()
  require('./userModel').create()
}
