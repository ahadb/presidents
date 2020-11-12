const db = require('../db')
const Presidents = require('../models/presidents')
const presidents = require('../models/presidents.json')

;(async function () {
  for (let i = 0; i < presidents.length; i++) {
    console.log(await Presidents.create(presidents[i]))
  }
  db.disconnect()
})()
