# CAche APIs

## Getting Started

### Prerequisites

What you need to install

```
node.js
```

### Installing dependencies

```
$ npm i
```

To run the server

```
$ npm run start
```

### Testing

To run all tests

```
$ npm run test
```

## APIs

Server runs on http://localhost:3000/

### Get all caches

```
GET /
```

### Get one cache or create one if miss

params: (key[string]: required)

```
GET /:key
```

### Add/update cache

body: (key[string]: required) (newKey[string]) (ttl[number])

```
POST /
```

### Remove one cache

params: (key[string]: required)

```
DELETE /:key
```

### Remove all caches

```
DELETE /
```

## Author

* **Mohamed Hegab** - _Github link_ - [Khalil71](https://github.com/Khalil71)
