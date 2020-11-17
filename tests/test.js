const tape = require('tape')

const port = process.env.PORT = process.env.PORT || require('get-port-sync')()
const server = require('../server')
const client = require('./client')({ endpoint: `http://localhost:${port}` })

tape('should list all presidents', function (t) {
  client.listPresidents(function (err, presidents) {
    if (err) t.error('should not error')

    t.equal(presidents.length, 17, 'number of presidents should match')
    const president = presidents[16]

    // @todo: need to add id's for mongo
    t.notEqual(presidents._id, 'cdew3dsaszzwewefw2q0z1', 'should be no id yet')
    t.equal(
        president.precededBy,
        'Warren G. Harding',
        'preceeded by should match'
    )

    t.end()
  })
})

tape('should list all presidents with limit', function (t) {
  client.listPresidents({ limit: 10 }, function (err, presidents) {
    if (err) t.error('should not error')

    t.equal(presidents.length, 10, 'number of presidents should match')
    const president = presidents[3]

    // @todo: check id

    t.equal(
        president.precededBy,
        'Bill Clinton',
        'precededBy should match'
    )

    t.end()
  })
})

tape('should list all presidents with offset', function (t) {
  client.listPresidents({ offset: 2, limit: 3 }, function (err, presidents) {
    if (err) t.error('should not error')

    t.equal(presidents.length, 3, 'number of presidents should match')

    // @todo: check id

    t.end()
  })
})

tape('cleanup', function (t) {
  server.close()
  t.end()
})
