const { scondsToMilli } = require('../config/config');
// const { randomString } = require('./generator');

module.exports = {
  getIds: arr => {
    const Ids = [];
    for (let i = 0; i < arr.length; i += 1) {
      if (Date.parse(arr[i].createdAt) + arr[i].ttl * scondsToMilli < Date.parse(new Date())) {
        Ids.push(arr[i].id);
      }
    }
    return Ids;
  }
  // ExpiredCacheFilter: arr => {
  //   const newCache = arr
  //     .filter(elm => Date.parse(elm.createdAt) + elm.ttl * scondsToMilli < Date.parse(new Date()))
  //     .map(elm => {
  //       elm.value = randomString();
  //       elm.createdAt = new Date();
  //       return elm;
  //     });
  //   return newCache;
  // }
};
