const express = require('express')

const api = require('./api')
const middleware = require('./middleware/middleware')

const port = process.env.PORT || 1221
const app = express()

app.use(middleware.cors)
app.get('/', api.index)
app.get('/presidents', api.listPresidents)
// app.get('./presidents:id', api.listPresidentById)
app.use(middleware.handleError)
app.use(middleware.notFound)

const server = app.listen(port, () =>
  console.log(`Server listening on port ${port}`)
)

if (require.main !== module) {
  module.exports = server
}
