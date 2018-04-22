const { scondsToMilli } = require('../config/config');
// const { randomString } = require('./generator');

module.exports = {
  getKeys: arr => {
    const Keys = [];
    for (let i = 0; i < arr.length; i += 1) {
      if (Date.parse(arr[i].createdAt) + arr[i].ttl * scondsToMilli < Date.parse(new Date())) {
        Keys.push(arr[i].key);
      }
    }
    return Keys;
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
