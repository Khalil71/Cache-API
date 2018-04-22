const { expect } = require('chai');
const mongoose = require('mongoose');

const { dbURL } = require('../config/config');
const Cache = require('../api/Cache/Cache.Service');
const { cacheLimit } = require('../config/config');

describe('Cache Tests', () => {
  before(done => {
    mongoose.connect(dbURL);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error')); // eslint-disable-line
    db.once('open', () => {
      console.log('We are connected to database!'); // eslint-disable-line
      done();
    });
  });

  before(done => {
    mongoose.connection.db.dropCollection('caches', () => {
      console.log('Caches collection dropped'); // eslint-disable-line
      done();
    });
  });

  it('should create a new Cache with ttl and value', done => {
    const data = {
      key: 'someCache',
      ttl: 20,
      value: 'someValue'
    };
    const instance = new Cache(data);
    const Create = instance.addCache();
    Create.then(result => {
      expect(result.key).to.equal(data.key);
      expect(result.ttl).to.equal(data.ttl);
      expect(result.value).to.equal(data.value);
      done();
    });
  });

  it('should create a new Cache with ttl and a random value', done => {
    const data = {
      key: 'someKindOfCache',
      ttl: 50
    };
    const instance = new Cache(data);
    const Create = instance.addCache();
    Create.then(result => {
      expect(result.key).to.equal(data.key);
      expect(result.ttl).to.equal(data.ttl);
      done();
    });
  });

  it('should create a new Cache with ttl and a random value', done => {
    const data = {
      key: 'someCache1',
      ttl: 20
    };
    const instance = new Cache(data);
    const Create = instance.addCache();
    Create.then(result => {
      expect(result.key).to.equal(data.key);
      expect(result.ttl).to.equal(data.ttl);
      done();
    });
  });

  it('should create a new Cache with default ttl and a random value', done => {
    const data = {
      key: 'someKindOfCache1'
    };
    const instance = new Cache(data);
    const Create = instance.addCache();
    Create.then(result => {
      expect(result.key).to.equal(data.key);
      done();
    });
  });

  it('should create a new Cache with ttl and a value', done => {
    const data = {
      key: 'someCache2',
      ttl: 20,
      value: 'someOtherValue'
    };
    const instance = new Cache(data);
    const Create = instance.addCache();
    Create.then(result => {
      expect(result.key).to.equal(data.key);
      expect(result.ttl).to.equal(data.ttl);
      expect(result.value).to.equal(data.value);
      done();
    });
  });

  it('should create a new Cache with ttl and a value', done => {
    const data = {
      key: 'someKindOfCache2',
      ttl: 50,
      value: 'someOtherValue2'
    };
    const instance = new Cache(data);
    const Create = instance.addCache();
    Create.then(result => {
      expect(result.key).to.equal(data.key);
      expect(result.ttl).to.equal(data.ttl);
      expect(result.value).to.equal(data.value);
      done();
    });
  });

  it('should find only 5 collections', done => {
    const instance = new Cache();
    const Create = instance.getAll();
    Create.then(result => {
      expect(result.length).to.equal(cacheLimit);
      done();
    });
  });

  it('should update 3 collections', done => {
    const keys = ['someKindOfCache2', 'someCache2', 'someKindOfCache1'];
    const instance = new Cache();
    const Create = instance.updateExpiredInBulk(keys);
    Create.then(result => {
      expect(result.modifiedCount).to.equal(3);
      done();
    });
  });

  it('should find no cache', done => {
    const data = {
      key: 'someOtherCache'
    };
    const instance = new Cache(data);
    const Create = instance.findCache();
    Create.then(result => {
      expect(result).to.equal(null);
      done();
    });
  });

  it('should find cache with this key', done => {
    const data = {
      key: 'someKindOfCache'
    };
    const instance = new Cache(data);
    const Create = instance.findCache();
    Create.then(result => {
      expect(result.key).to.equal(data.key);
      done();
    });
  });

  it('should update current cache with this newKey', done => {
    const data = {
      key: 'someKindOfCache',
      newKey: 'someOtherCache'
    };
    const instance = new Cache(data);
    const Create = instance.updateOne();
    Create.then(result => {
      expect(result.key).to.equal(data.newKey);
      done();
    });
  });

  it('should update current cache with this key', done => {
    const data = { key: 'someOtherCache' };
    const instance = new Cache(data);
    const Create = instance.updateForFindCache();
    Create.then(result => {
      expect(result.key).to.equal(data.key);
      done();
    });
  });

  it('should update both current cache key and ttl', done => {
    const data = {
      key: 'someOtherCache',
      ttl: 40,
      newKey: 'otherCache',
      value: 'randomString'
    };
    const instance = new Cache(data);
    const Create = instance.updateOne();
    Create.then(result => {
      expect(result.key).to.equal(data.newKey);
      expect(result.ttl).to.equal(data.ttl);
      expect(result.value).to.equal(data.value);
      done();
    });
  });

  it('should not remove any cached doc', done => {
    const data = { key: 'nonExistant' };
    const instance = new Cache(data);
    const Create = instance.deleteOneCache();
    Create.then(result => {
      expect(result).to.equal(false);
      done();
    });
  });

  it('should check no data was removed', done => {
    const instance = new Cache();
    const Create = instance.getAll();
    Create.then(result => {
      expect(result.length).to.equal(5);
      done();
    });
  });

  it('should remove one cached doc', done => {
    const data = { key: 'otherCache' };
    const instance = new Cache(data);
    const Create = instance.deleteOneCache();
    Create.then(result => {
      expect(result).to.equal('Success!');
      done();
    });
  });

  it('should get 1 cached doc was removed', done => {
    const instance = new Cache();
    const Create = instance.getAll();
    Create.then(result => {
      expect(result.length).to.equal(4);
      done();
    });
  });

  it('should remove all docs', done => {
    const instance = new Cache();
    const Create = instance.deleteAllCache();
    Create.then(result => {
      expect(result).to.equal('Success!');
      done();
    });
  });

  it('should find collection empty', done => {
    const instance = new Cache();
    const Create = instance.getAll();
    Create.then(result => {
      expect(result.length).to.equal(0);
      done();
    });
  });

  after(done => {
    mongoose.connection.db.dropCollection('caches', () => {
      console.log('Caches collection dropped'); // eslint-disable-line
      done();
    });
  });
});
