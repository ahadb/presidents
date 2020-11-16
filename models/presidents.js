const cuid = require('cuid')
const { isURL } = require('validator')
const fs = require('fs').promises
const path = require('path')


const db = require('../db')
const presidentsFile = path.join(__dirname, './presidents.json')

const President = db.model('President', {
  _id: { type: String, default: cuid },
  presidentElectedNumber: { type: String, required: true },
  vicePresident: { type: String, required: true},
  precededBy: { type: String, required: true},
  politicalParty: { type: String, required: true},
  dateOfBirth: { type: String, required: true},
  imgThumb: urlSchema({ required: true }),
  img: urlSchema({ required: true }),
})

module.exports = {
  list,
  listAll,
  create,
  model: President
}

function urlSchema (opts = {}) {
  const { required } = opts
  return {
    type: String,
    required: !!required,
    validate: {
      validator: isURL,
      message: props => `${props.value} is not a valid URL`
    }
  }
}

async function list (id) {
  const presidents = JSON.parse(await fs.readFile(presidentsFile))

  for (let i = 0; i < presidents.length; i++) {
    if (presidents[i]._id === id) return presidents[i]
  }

  return null
}

// @todo: change to read from DB
async function listAll (opts = {}) {
  const { offset = 0, limit = 25 } = opts

  const data = await fs.readFile(presidentsFile)
  return JSON.parse(data).slice(offset, offset + limit)
}

async function create (fields) {
  const president = await new President(fields).save()
  return president
}

