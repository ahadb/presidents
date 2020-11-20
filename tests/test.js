const tape = require('tape')
const { MongoMemoryServer } = require('mongodb-memory-server')

const mongoServer = new MongoMemoryServer()
process.env.MONGO_URI = process.env.MONGO_URI || getMongoURISync()

const db = require('../db')
const port = process.env.PORT = process.env.PORT || require('get-port-sync')()
const server = require('../server')
const client = require('./client')({ endpoint: `http://localhost:${port}` })
const Presidents = require('../models/presidents')

const allPresidents = require('../models/presidents.json')

tape('setup', async function (t) {
  for (let i = 0; i < allPresidents.length; i++) {
    allPresidents[i].presidentName =
        allPresidents[i].presidentName ||
        allPresidents[i].alt_presidentName ||
        'test description'
    await Presidents.create(allPresidents[i])
  }
  t.end()
})

tape('should list all presidents', function (t) {
  client.listPresidents(function (err, presidents) {
    if (err) t.error('should not error')

    t.equal(presidents.length, 25, 'number of presidents should match')

    const president = presidents[16]

    t.equal(president._id, 'ckhqkgsav000g0lzr7wjh790z', 'id should match')
    t.equal(
        president.presidentName,
        'Calvin Coolidge',
        'president name should match'
    )

    t.end()
  })
})

tape('should list all presidents with limit', function (t) {
  client.listPresidents({ limit: 10 }, function (err, presidents) {
    if (err) t.error('should not error')

    t.equal(presidents.length, 10, 'number of presidents should match')

    const president = presidents[3]

    t.equal(president._id, 'ckhqkgs9l00030lzr70uhe7y5', 'id should match')

    t.equal(
        president.presidentName,
        'George W. Bush',
        'president name should match'
    )

    t.end()
  })
})

tape('should list all presidents with offset', function (t) {
  client.listPresidents({ offset: 2, limit: 3 }, function (err, presidents) {
    if (err) t.error('should not error')

    t.equal(presidents.length, 3, 'number of presidents should match')

    t.end()
  })
})

tape('should list presidents with ascending sort order', function (t) {
  client.listPresidents({sort: 1}, function (err, presidents) {
    if (err) t.error('should not error')

    const firstPresident = presidents[0]

    t.equal(firstPresident._id, 'ckhqkgs7600000lzr6gqfhfz9', 'id should match')

    // @todo: match president name

    t.end()
  })
})

tape('should list presidents with descending sort order', function (t) {
  client.listPresidents({ limit: 46, sort: -1 }, function (err, presidents) {
    if (err) t.error('should not error')

    const lastPresident = presidents[presidents.length - 1]

    t.equal(lastPresident._id, 'ckhqkgsfi00180lzre5l87l90', 'id should match')

    // @todo: match president name

    t.end()
  })
})

tape('should list 30 presidents in descending order', function (t) {
  client.listPresidents({ limit: 30, sort: -1 }, function (err, presidents) {
    if (err) t.error('should not error')

    const presidents30Dsc = presidents[0]

    t.equal(presidents30Dsc._id, 'ckhqkgs7600000lzr6gqfhfz9', 'id should match')

    // @todo: match president name

    t.end()
  })
})

tape('cleanup', function (t) {
  server.close()
  db.disconnect()
  mongoServer.stop()
  t.end()
})

function getMongoURISync () {
  let uri
  mongoServer.getConnectionString().then(_uri => {
    uri = _uri
  })
  require('deasync').loopWhile(() => !uri)
  return uri
}
