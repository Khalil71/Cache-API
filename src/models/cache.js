const mongoose = require('mongoose');

const { defaultTTL, cacheLimit } = require('../config/config');
const { randomString } = require('../services/generator');

mongoose.Promise = global.Promise;

const casheSchema = new mongoose.Schema({
  key: {
    type: String,
    unique: true,
    required: true
  },
  value: {
    type: String,
    default: randomString
  },
  ttl: { type: Number, default: defaultTTL, required: true },
  createdAt: { type: Date, default: new Date() }
});
const Cache = mongoose.model('Cache', casheSchema);

// In order to set a limit for the amount of docs in the Collection
// before each time a new Collection is saved we get the count of docs
// If it greater than or equal the amount set
// we find the oldest doc and then delete it
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
