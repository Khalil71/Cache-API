const { Router } = require('express');

const CacheRoutes = require('../api/Cache/index');

const router = new Router();

// Cache Routes
router.use('/', CacheRoutes);

module.exports = router;
