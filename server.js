const express = require('express')
const fs = require("fs")
const path = require('path')
const morgan = require('morgan')

const api = require('./api')
const middleware = require('./middleware/middleware')
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

const port = process.env.PORT || 1337
const app = express()

app.use(morgan('combined', { stream: accessLogStream }))
app.use(middleware.cors)
app.get('/', api.index)
app.get('/presidents', api.listPresidents)
app.get('/presidents/:id', api.listPresident)
// app.get('./presidents:id', api.listPresidentById)
app.use(middleware.handleError)
app.use(middleware.notFound)

const server = app.listen(port, () =>
  console.log(`Server listening on port ${port}`)
)

if (require.main !== module) {
  module.exports = server
}
