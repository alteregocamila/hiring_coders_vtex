var express = require('express')
var router = express.Router()
var cielo = require('../lib/cielo')

/* POST to creat a purchase */
router.post('/', function (req, res, next) {
  // res.send('Running...') //test
  // res.send(req.body) // test
  // res.send(cielo.purchase(req.body))
  cielo.purchase(req.body).then(result => {
    const paymentId = result.Payment.PaymentId
    // res.send(result)
    // console.log(result.Payment)
    cielo
      .capture(paymentId)
      .then(result => {
        if (result.Status == 2) {
          res.status(201).send({
            Status: 'Success',
            Message: 'Purchase made successfully',
            PurchaseId: paymentId
          })
        } else {
          res.status(402).send({
            Status: 'Failed',
            Message: 'Purchase didnot made successfully'
          })
        }
      })
      .catch(err => console.error(err))
  })
})

/* GET status of a purchase */
router.get('/:purchase_id/status', function (req, res, next) {
  // res.send('Running status...')
  cielo.consult(req.params.purchase_id).then(result => {
    console.log(result)
    let message = {}
    switch (result.Payment.Status) {
      case 1:
        message = { Status: 'Authorized' }
        break
      case 2:
        message = { Status: 'Payment Confirmed' }
        break
      case 3:
        message = { Status: 'Denied' }
        break
      case 10:
        message = { Status: 'Voided - Payment canceled' }
        break
      case 11:
        message = {
          Status:
            'Refunded - Payment canceled after 23:59 on the day of authorization'
        }
        break
      case 12:
        message = {
          Status: 'Pending - Awaiting return from the financial institution'
        }
        break
      case 13:
        message = {
          Status:
            'Aborted - Payment canceled due to processing failure or Antifraud action.'
        }
        break
      default:
        message = { Status: 'Payment failed' }
    }
    res.send(message)
  })
})

module.exports = router
