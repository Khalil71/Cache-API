# Cache APIs

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

### To run the server

```
$ npm run start
```

### Testing

```
$ npm run test
```

## APIs

Server runs on http://localhost:3000/

### Note: the number to enter as ttl will be calculated as seconds e.g.(ttl: 10 => 10 seconds)

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

body: (key [string]: required) (newKey [string]) (ttl [number]) (value [string])

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

### configs

```
src/config/config.js
```

In this file you will be able to configure :-

```
defaultTTL: whcich is the default ttl time in seconds
```

```
stringGenLength: length of the random string generated
```

```
cacheLimit: how many docs are allowed in a Collection
```

```
scondsToMilli: The number to be multiplied to be added as ttl
```

## Author

* **Mohamed Hegab** - _Github link_ - [Khalil71](https://github.com/Khalil71)
