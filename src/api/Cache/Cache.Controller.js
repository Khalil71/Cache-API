const Cache = require('./Cache.Service');
const { errResponse } = require('../../services/errors');
const valid = require('../../services/validation');

module.exports = {
  getOneCachedData: (req, res, next) => {
    if (!req.params.key || !valid.string.test(req.params.key)) {
      return next(errResponse('Key must be a string', 403));
    }
    const instance = new Cache(req.params);
    return instance
      .findCache()
      .then(data => {
        if (data === true) {
          console.log('Cache hit'); // eslint-disable-line
          return instance
            .updateForFindCache()
            .then(result => res.status(200).send(result))
            .catch(e => next(errResponse(e, 403)));
        }
        if (data !== true && data !== null) {
          console.log('Cache hit'); // eslint-disable-line
          return res.status(200).send(data);
        }
        console.log('Cache miss'); // eslint-disable-line
        return instance
          .addCache()
          .then(result => res.status(200).send(result))
          .catch(e => next(errResponse(e, 403)));
      })
      .catch(e => next(errResponse(e, 403)));
  },

  getAllCachedData: (req, res, next) => {
    const instance = new Cache();
    return instance
      .getAll()
      .then(data => {
        if (data.length === 0) {
          return res.status(200).send({ message: 'Collection empty!' });
        }
        if (data.value) {
          return res.status(200).send(data);
        }
        return instance
          .updateAllExpired(data)
          .then(() =>
            instance
              .getAll()
              .then(newData => res.status(200).send(newData))
              .catch(() => next(errResponse('Cannot recall cache')))
          )
          .catch(() => next(errResponse('Cannot update old Cache', 403)));
      })
      .catch(e => next(errResponse(e, 403)));
  },

  createOrUpdateCache: (req, res, next) => {
    if (!req.body.key || !valid.string.test(req.body.key)) {
      return next(errResponse('key must be a string!', 403));
    }
    if (req.body.newKey && !valid.string.test(req.body.newKey)) {
      return next(errResponse('newKey must be a string!', 403));
    }
    if (req.body.ttl && !valid.number.test(req.body.ttl)) {
      return next(errResponse('ttl must be a number!', 403));
    }
    if (req.body.value && !valid.string.test(req.body.value)) {
      return next(errResponse('value must be a string!', 403));
    }

    const instance = new Cache(req.body);
    return instance
      .updateOne()
      .then(data => {
        if (data === null) {
          return instance
            .addCache()
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
    const instance = new Cache(req.params);
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
    const instance = new Cache();
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
