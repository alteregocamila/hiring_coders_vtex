// Including Libraries
const http = require('http')
const url = require('url')
const fs = require('fs')
const queryString = require('query-string')

//Defining address / url
const hostname = '127.0.0.1' //localhost
const port = 3000

//Implementing the business rule
const server = http.createServer((req, res) => {
  var answere
  const urlparse = url.parse(req.url, true)
  // Receive informations of user
  const params = queryString.parse(url.parse(req.url, true).search)

  // Create an User and Update an User
  if (urlparse.pathname == '/create-user') {
    // Salve informations in a doc txt
    fs.writeFile(
      'users/' + params.id + '.txt',
      JSON.stringify(params),
      function (err) {
        if (err) throw err
        console.log('Saved!')

        answere = 'User created successfully.'

        res.statusCode = 200
        res.setHeader('Content-Type', 'text/plain')
        res.end(answere)
      }
    )
  }
  // Select an User
  else if (urlparse.pathname == '/select-user') {
    fs.readFile('users/' + params.id + '.txt', function (err, data) {
      answere = data

      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.end(answere)
    })
  }

  // Remove an User
  else if (urlparse.pathname == '/remove-user') {
    fs.unlink('users/' + params.id + '.txt', function (err) {
      console.log('File deleted!')

      // Ternary Operator
      answere = err ? 'User not found.' : 'User removed successfully.'

      res.statusCode = 200
      res.setHeader('Content-Type', 'text/plain')
      res.end(answere)
    })
  }
})

//Execution
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})

//localhost:3000/create-user?name=camila&age=32&id=1
//localhost:3000/select-user?name=camila&id=1
//localhost:3000/remove-user?name=camila&id=1
