const getport = require('getport')
const { fork } = require('child_process')

module.exports = {
  testLocalFileServer
}

function testLocalFileServer (filename, cb) {
  getport(5000, function (err, port) {
    if (err) return cb(err)

    const server = fork(filename, { env: { PORT: port }, silent: true })
    server.stdout.once('data', function (msg) {
      cb(null, `http://localhost:${port}`, function (fn) {
        server.on('close', fn)
        server.kill()
      })
    })
  })
}
