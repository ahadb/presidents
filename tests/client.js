const http = require('http')
const querystring = require('querystring')

module.exports = function ({ endpoint }) {
  endpoint = endpoint || 'http://localhost:1337'

  return {
    getPresident,
    listPresidents
  }

  function getPresident(id, cb) {
    const url = `${endpoint}/presidents/${id}`
    getJSON(url, cb)
  }

  function listPresidents(opts, cb) {
    if (typeof opts === 'function') {
      cb = opts
      opts = {}
    }

    const {offset = 0, limit = 25, tag} = opts
    const url = `${endpoint}/presidents?${querystring.stringify({
      offset,
      limit,
      tag
    })}`
    getJSON(url, cb)
  }

  function getJSON(url, cb) {
    http.get(url, res => parseJSON(res, cb)).on('error', err => cb(err))
  }


  function parseJSON(res, cb) {
    const {statusCode} = res
    const contentType = res.headers['content-type']

    let error
    if (statusCode !== 200) {
      error = new Error('Request Failed.\n' + `Status Code: ${statusCode}`)
    } else if (!/^application\/json/.test(contentType)) {
      error = new Error(
          'Invalid content-type.\n' +
          `Expected application/json but received ${contentType}`
      )
    }

    if (error) {
      res.resume()
      return cb(error)
    }

    res.setEncoding('utf8')
    let rawData = ''
    res
        .on('data', chunk => {
          rawData += chunk
        })
        .on('end', () => {
          try {
            const parsedData = JSON.parse(rawData)
            cb(null, parsedData)
          } catch (e) {
            console.error(e.message)
          }
        })
  }
}
