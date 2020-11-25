const cuid = require('cuid')
const { isURL } = require('validator')

const db = require('../db')

const President = db.model('President', {
  _id: { type: String, default: cuid },
  presidentName: { type: String, required: true},
  presidentElectedNumber: { type: String, required: true },
  vicePresident: { type: String, required: true},
  precededBy: { type: String, required: true},
  politicalParty: { type: String, required: true},
  dateOfBirth: { type: String, required: true},
  imgThumb: urlSchema({ required: true }),
  img: urlSchema({ required: true }),
  tags: { type: Array, required: true}
})

module.exports = {
  list,
  listAll,
  create,
  model: President
}

async function listAll (opts = {}) {
  const { offset = 0, limit = 25, sort = 1, tag} = opts
  const query = tag ? { tags: tag } : {}

  const presidents = await President.find(query)
      .sort(sort === 1 ? {_id: 1} : {_id: -1})
      .skip(offset)
      .limit(limit)

  return presidents
}

async function list (_id) {
  const president = await President.findById(_id)
  return president
}

async function create (fields) {
  const president = await new President(fields).save()
  return president
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


