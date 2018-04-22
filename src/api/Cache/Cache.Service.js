const CacheModel = require('../../models/cache');
const { randomString } = require('../../services/generator');
const { scondsToMilli } = require('../../config/config');
const { getKeys } = require('../../services/loopFunctions');

class Cache {
  constructor(data) {
    if (data) {
      this.key = data.key;
      this.ttl = data.ttl;
      this.newKey = data.newKey;
      this.value = data.value;
    }
  }

  getAll() {
    return CacheModel.find()
      .then(result => {
        if (result.length === 0) {
          return result;
        }
        const data = getKeys(result);
        if (data.length === 0) {
          return result;
        }
        return data;
      })
      .catch(e => e);
  }

  updateAllExpired(keys) {
    return CacheModel.update(
      { key: { $in: keys } },
      { $set: { value: randomString(), createdAt: new Date() } },
      { multi: true }
    )
      .then(result => result)
      .catch(e => e);
  }

  findCache() {
    return CacheModel.findOne({ key: this.key })
      .then(result => {
        // check if cache expired return true for the cache to be updated
        // else return cache
        if (
          result != null &&
          Date.parse(result.createdAt) + result.ttl * scondsToMilli < Date.parse(new Date())
        ) {
          return true;
        }
        return result;
      })
      .catch(e => e);
  }

  updateForFindCache() {
    const newCache = {};
    newCache.value = randomString();
    newCache.createdAt = new Date();
    return CacheModel.findOneAndUpdate({ key: this.key }, newCache, { new: true })
      .then(result => result)
      .catch(e => e);
  }

  addCache() {
    const newCache = {};
    if (this.ttl) {
      newCache.ttl = this.ttl;
    }
    if (this.value) {
      newCache.value = this.value;
    }
    newCache.key = this.key;
    const cash = new CacheModel(newCache);
    return cash
      .save()
      .then(result => result)
      .catch(e => e);
  }

  updateOne() {
    const newCache = {};
    if (this.ttl) {
      newCache.ttl = this.ttl;
    }
    if (this.newKey) {
      newCache.key = this.newKey;
    }
    if (this.value) {
      newCache.value = this.value;
    }
    // if cache is updated the ttl is automatically reset by setting createdAt to new Date()
    newCache.createdAt = new Date();
    return CacheModel.findOneAndUpdate({ key: this.key }, newCache, { new: true })
      .then(result => result)
      .catch(e => e);
  }

  deleteOneCache() {
    return CacheModel.remove({ key: this.key })
      .then(result => {
        if (result.n > 0) {
          return 'Success!';
        }
        return false;
      })
      .catch(() => 'Cannot delete cache');
  }

  deleteAllCache() {
    return CacheModel.remove()
      .then(result => {
        if (result.n > 0) {
          return 'Success!';
        }
        return false;
      })
      .catch(() => 'Cannot delete cache');
  }
}

module.exports = Cache;
