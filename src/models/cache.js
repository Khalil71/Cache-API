const mongoose = require('mongoose');

const { defaultTTL, cacheLimit } = require('../services/config');
const { randomString } = require('../services/generator');

mongoose.Promise = global.Promise;

const casheSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true
  },
  value: {
    type: String,
    unique: true,
    default: randomString
  },
  ttl: { type: Number, default: defaultTTL, required: true },
  createdAt: { type: Date, default: new Date() }
});
const Cache = mongoose.model('Cache', casheSchema);
casheSchema.pre('save', next => {
  Cache.count().then(result => {
    if (result >= cacheLimit) {
      Cache.find()
        .sort({ createdAt: 1 })
        .limit(1)
        .then(out => {
          Cache.remove({ _id: out[0].id }).then(() => next());
        });
    }
    return next();
  });
});
module.exports = Cache;
