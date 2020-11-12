const Presidents = require('./models/presidents')

module.exports = {
  listPresidents,
  index
}

async function listPresidents (req, res) {
  const { offset = 0, limit = 25 } = req.query

  try {
    res.json(await Presidents.listAll({
      offset: Number(offset),
      limit: Number(limit),
    }))
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

async function index (req, res) {
  res.json({ text: 'Hi, presidents!' })
}
