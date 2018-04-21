const CasheModel = require('../../models/cache');
const { randomString } = require('../../services/generator');
const { scondsToMilli } = require('../../services/config');

class Cache {
  constructor(key, ttl) {
    this.key = key;
    this.ttl = ttl;
  }

  getAll() {
    return CasheModel.find()
      .then(result => result)
      .catch(e => e);
  }

  findCash() {
    return CasheModel.findOne({ key: this.key })
      .then(result => {
        if (
          result != null &&
          Date.parse(result.createdAt) + result.ttl * scondsToMilli < Date.parse(new Date())
        ) {
          return CasheModel.findOneAndUpdate(
            { _id: result.id },
            { value: randomString(), createdAt: new Date() }
          )
            .then(data => data)
            .catch(e => e);
        }
        return result;
      })
      .catch(e => e);
  }

  addCash() {
    const newCache = {};
    if (this.ttl) {
      newCache.ttl = this.ttl;
    }
    newCache.key = this.key;
    const cash = new CasheModel(newCache);
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
    newCache.key = this.key;
    newCache.createdAt = new Date();
    return CasheModel.findOneAndUpdate({ key: this.key }, newCache, { new: true })
      .then(result => result)
      .catch(e => e);
  }

  findOne() {
    return CasheModel.findOne({ key: this.key })
      .then(result => result)
      .catch(e => e);
  }

  deleteOneCache() {
    return CasheModel.remove({ key: this.key })
      .then(result => {
        if (result.n > 0) {
          return 'Success!';
        }
        return false;
      })
      .catch(() => 'Cannot delete cache');
  }

  deleteAllCache() {
    return CasheModel.remove()
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
