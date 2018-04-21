const { Router } = require('express');

const Cache = require('./Cache.Controller');

const router = new Router();

router.get('/:key', Cache.getOneCachedData);
router.get('/', Cache.getAllCachedData);
router.post('/', Cache.createOrUpdateCache);
router.delete('/:key', Cache.removeOneCache);
router.delete('/', Cache.removeAll);

module.exports = router;
