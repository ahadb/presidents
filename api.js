const Presidents = require('./models/presidents')

module.exports = {
  listPresident,
  listPresidents,
  index
}

async function listPresident (req, res) {
  const { id } = req.params

  try {
    const president = await Presidents.list(id)
    res.json(president)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

async function listPresidents (req, res) {
  const { offset = 0, limit = 25, sort = 1 } = req.query

  try {
    res.json(await Presidents.listAll({
      offset: Number(offset),
      limit: Number(limit),
      sort: Number(sort)
    }))
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

async function index (req, res) {
  res.json({ text: 'Hi, presidents!' })
}
