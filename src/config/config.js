module.exports = {
  defaultTTL: 10,
  stringGenLength: 10,
  cacheLimit: 5,
  scondsToMilli: 1000,
  dbURL: `mongodb://${process.env.USER}:${process.env.PASS}@ds251179.mlab.com:51179/fashiontest`
};
