const tape = require('tape')
const request = require('request')
const testUtils = require('./test-utils')

// initial tests setup from file system for now till we persist from DB

tape('should show json only on / route', function (t) {
  testUtils.testLocalFileServer('./server.js', function (err, origin, cb) {
    if (err) return t.error(err)

    request(origin, function (err, req, body) {
      if (err) return t.error(err)

      t.equal(body, '{"text":"Hi, presidents!"}')

      cb(t.end)
    })
  })
})

tape('should accept query string params { limit, offset } and return 200 OK on the given /presidents route', function (t) {
  testUtils.testLocalFileServer('./server.js', function (err, origin, cb) {
    if (err) return t.error(err)

    request(origin + '/presidents?limit=10?offset=10', function (err, res) {
      if (err) return t.error(err)

      t.equal(res.statusCode, 200, 'the status code should be 200 OK')
      t.notEqual(res.statusCode, 404, 'the status code should not be 404')
      t.notEqual(res.statusCode, 403, 'the status code should not be 403')

      cb(t.end)
    })
  })
})

tape('should return 200 OK on the given /presidents route', function (t) {
  testUtils.testLocalFileServer('./server.js', function (err, origin, cb) {
    if (err) return t.error(err)

    request(origin + '/presidents', function (err, res) {
      if (err) return t.error(err)

      t.equal(res.statusCode, 200, 'the status code should be 200 OK')

      cb(t.end)
    })
  })
})

tape('should return 404 Not Found on incorrect route', function (t) {
  testUtils.testLocalFileServer('./server.js', function (err, origin, cb) {
    if (err) return t.error(err)

    request(origin + '/some-long-path-here', function (err, res) {
      if (err) return t.error(err)

      t.equal(res.statusCode, 404, 'the status code should be 404 Not Found')

      cb(t.end)
    })
  })
})
