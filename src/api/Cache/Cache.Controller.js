const Cash = require('./Cache.service');
const { errResponse } = require('../../services/errors');
const valid = require('../../services/validation');

module.exports = {
  getOneCachedData: (req, res, next) => {
    if (!req.params.key || !valid.string.test(req.params.key)) {
      return next(errResponse('Key must be a string', 403));
    }
    const instance = new Cash(req.params.key);
    return instance
      .findCash()
      .then(data => {
        if (data != null) {
          console.log('Cache hit'); // eslint-disable-line
          return res.status(200).send(data);
        }
        console.log('Cache miss'); // eslint-disable-line
        return instance
          .addCash()
          .then(result => res.status(200).send(result))
          .catch(e => next(errResponse(e, 403)));
      })
      .catch(e => next(errResponse(e, 403)));
  },

  getAllCachedData: (req, res, next) => {
    const instance = new Cash();
    return instance
      .getAll()
      .then(data => res.status(200).send(data))
      .catch(e => next(errResponse(e, 403)));
  },

  createOrUpdateCache: (req, res, next) => {
    if (!req.body.key || !valid.string.test(req.body.key)) {
      return next(errResponse('key must be a string!', 403));
    }
    if (!req.body.ttl || !valid.number.test(req.body.ttl)) {
      return next(errResponse('ttl must be a number!', 403));
    }
    const instance = new Cash(req.body.key, req.body.ttl);
    return instance
      .updateOne()
      .then(data => {
        if (data === null) {
          return instance
            .addCash()
            .then(result => res.status(200).send(result))
            .catch(e => next(errResponse(e, 403)));
        }
        return res.status(200).send(data);
      })
      .catch(e => next(errResponse(e, 403)));
  },

  removeOneCache: (req, res, next) => {
    if (!req.params.key || !valid.string.test(req.params.key)) {
      return next(errResponse('key must be a string', 403));
    }
    const instance = new Cash(req.params.key);
    return instance
      .deleteOneCache()
      .then(data => {
        if (data === false) {
          return next(errResponse('Collection does not exist', 403));
        }
        return res.status(200).send({ message: data });
      })
      .catch(e => next(errResponse(e, 403)));
  },

  removeAll: (req, res, next) => {
    const instance = new Cash();
    return instance
      .deleteAllCache()
      .then(data => {
        if (data === false) {
          return next(errResponse('Collection already empty!', 403));
        }
        return res.status(200).send({ message: data });
      })
      .catch(e => next(errResponse(e, 403)));
  }
};
