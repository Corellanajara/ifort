const assert = require('assert')
const Chiccocoin = require('../middleware/chiccocoin')

// Get enviroment in the .env
require('dotenv').config()

describe('Chiccocoin API', () => {
  describe('/getChain', () => {
    it('Deberia devolver una cadena con el bloque genesis', () => {
      const req = {}
      Chiccocoin.getChain(req, {}, () => {
        const chain = req.responseValue.chain
        assert.equal(chain.length, 1)
      })

    })
  })
  describe('/mine', () => {
    it('Deberia minar un bloque', () => {
      const req = {}
      Chiccocoin.mine(req, {}, () => {
        Chiccocoin.getChain(req, {}, () => {
          const chain = req.responseValue.chain
          assert.equal(chain.length, 2)
        })
      })
    })
  })
  describe('/transaction/new', () => {
    it('Deberia agregar una transaccion', () => {
      const req = {
        body: {
          sender: 'sender1',
          recipient: 'sender2',
          message: "Hola Mundo"
        }
      }
      Chiccocoin.newTransaction(req, {}, () =>{
        Chiccocoin.mine(req, {}, () => {
          Chiccocoin.getChain(req, {}, () => {
            const chain = req.responseValue.chain
            const transactions = chain.slice(-1)[0].transactions
            assert.equal(transactions[0].sender, 'sender1')
          })
        })
      })
    })
  })
})
