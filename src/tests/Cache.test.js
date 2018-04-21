const { expect } = require('chai');
const mongoose = require('mongoose');

const Cache = require('../api/Cache/Cache.Service');
const { cacheLimit } = require('../config/config');

describe('Cache Tests', () => {
  before(done => {
    mongoose.connect('mongodb://test:test@ds251179.mlab.com:51179/fashiontest');
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

  it('should create a new Cache', done => {
    const key = 'someCache';
    const ttl = 20;
    const instance = new Cache(key, ttl);
    const Create = instance.addCash();
    Create.then(result => {
      expect(result.key).to.equal(key);
      expect(result.ttl).to.equal(ttl);
      done();
    });
  });

  it('should create a new Cache', done => {
    const key = 'someKindOfCache';
    const ttl = 50;
    const instance = new Cache(key, ttl);
    const Create = instance.addCash();
    Create.then(result => {
      expect(result.key).to.equal(key);
      expect(result.ttl).to.equal(ttl);
      done();
    });
  });

  it('should create a new Cache', done => {
    const key = 'someCache1';
    const ttl = 20;
    const instance = new Cache(key, ttl);
    const Create = instance.addCash();
    Create.then(result => {
      expect(result.key).to.equal(key);
      expect(result.ttl).to.equal(ttl);
      done();
    });
  });

  it('should create a new Cache', done => {
    const key = 'someKindOfCache1';
    const ttl = 50;
    const instance = new Cache(key, ttl);
    const Create = instance.addCash();
    Create.then(result => {
      expect(result.key).to.equal(key);
      expect(result.ttl).to.equal(ttl);
      done();
    });
  });

  it('should create a new Cache', done => {
    const key = 'someCache2';
    const ttl = 20;
    const instance = new Cache(key, ttl);
    const Create = instance.addCash();
    Create.then(result => {
      expect(result.key).to.equal(key);
      expect(result.ttl).to.equal(ttl);
      done();
    });
  });

  it('should create a new Cache', done => {
    const key = 'someKindOfCache2';
    const ttl = 50;
    const instance = new Cache(key, ttl);
    const Create = instance.addCash();
    Create.then(result => {
      expect(result.key).to.equal(key);
      expect(result.ttl).to.equal(ttl);
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

  it('should find no cache', done => {
    const key = 'someOtherCache';
    const instance = new Cache(key);
    const Create = instance.findCash();
    Create.then(result => {
      expect(result).to.equal(null);
      done();
    });
  });

  it('should find cache with this key', done => {
    const key = 'someKindOfCache';
    const instance = new Cache(key);
    const Create = instance.findCash();
    Create.then(result => {
      expect(result.key).to.equal(key);
      done();
    });
  });

  it('should update current cache with this newKey', done => {
    const key = 'someKindOfCache';
    const newKey = 'someOtherCache';
    const instance = new Cache(key, null, newKey);
    const Create = instance.updateOne();
    Create.then(result => {
      expect(result.key).to.equal(newKey);
      done();
    });
  });

  it('should update current cache with this newKey', done => {
    const key = 'someOtherCache';
    const ttl = 30;
    const instance = new Cache(key, ttl);
    const Create = instance.updateOne();
    Create.then(result => {
      expect(result.ttl).to.equal(ttl);
      done();
    });
  });

  it('should update both current cache key and ttl', done => {
    const key = 'someOtherCache';
    const ttl = 40;
    const newKey = 'otherCache';
    const instance = new Cache(key, ttl, newKey);
    const Create = instance.updateOne();
    Create.then(result => {
      expect(result.key).to.equal(newKey);
      expect(result.ttl).to.equal(ttl);
      done();
    });
  });

  it('should not remove any cached doc', done => {
    const key = 'nonExistant';
    const instance = new Cache(key);
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
    const key = 'otherCache';
    const instance = new Cache(key);
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
});
