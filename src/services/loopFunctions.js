const { scondsToMilli } = require('../config/config');

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
};
