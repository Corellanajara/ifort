const express = require('express')
const router = express.Router()
const { check } = require('express-validator/check')

const Chiccocoin = require('../middleware/chiccocoin')

const responseMiddleware = (req, res, next) => {
  return res.json(req.responseValue)
}
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Chicco Coin' })
})

router.post('/transactions/new', [
  check('sender', 'Sender debe ser un String').exists(),
  check('recipient', 'Sender debe ser un String').exists(),
  check('message', 'message debe ser String ').exists()
], Chiccocoin.newTransaction, responseMiddleware)

router.get('/mine', Chiccocoin.mine, responseMiddleware)

router.get('/chain', Chiccocoin.getChain, responseMiddleware)

router.post('/node/register', [
  check('node', 'Nodo debe ser String').exists()
], Chiccocoin.addNode, responseMiddleware)

module.exports = router
