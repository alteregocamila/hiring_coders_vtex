const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args))

class Cielo {
  static purchase(params) {
    // return params //test
    return fetch('https://apisandbox.cieloecommerce.cielo.com.br/1/sales/', {
      method: 'post',
      body: JSON.stringify(params),
      headers: {
        'Content-Type': 'application/json',
        MerchantId: '1fe37463-53ad-4627-855d-b968bbd5ec20',
        MerchantKey: 'FUWKWRVMLSERQEJVJOIJWJZXEAXHSPEHDQMGJOGA'
        // Created at https://cadastrosandbox.cieloecommerce.cielo.com.br/
      }
    }).then(res => res.json())
    // .then(json => console.log(json))
  }

  static capture(paymentId) {
    return fetch(
      'https://apisandbox.cieloecommerce.cielo.com.br/1/sales/' +
        paymentId +
        '/capture',
      {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          MerchantId: '1fe37463-53ad-4627-855d-b968bbd5ec20',
          MerchantKey: 'FUWKWRVMLSERQEJVJOIJWJZXEAXHSPEHDQMGJOGA'
          // Created at https://cadastrosandbox.cieloecommerce.cielo.com.br/
        }
      }
    ).then(res => res.json())
    // .then(json => console.log(json))
  }

  static consult(paymentId) {
    return fetch(
      'https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/' +
        paymentId,
      {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          MerchantId: '1fe37463-53ad-4627-855d-b968bbd5ec20',
          MerchantKey: 'FUWKWRVMLSERQEJVJOIJWJZXEAXHSPEHDQMGJOGA'
          // Created at https://cadastrosandbox.cieloecommerce.cielo.com.br/
        }
      }
    ).then(res => res.json())
  }
}

module.exports = Cielo
