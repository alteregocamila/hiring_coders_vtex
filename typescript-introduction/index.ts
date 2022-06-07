// Including Libraries
import * as http from 'http';
import * as url from 'url';
import * as fs from 'fs';
import * as queryString from 'query-string';

// Defining port
const port = 5000;

const server = http.createServer((request: http.IncomingMessage, response: http.ServerResponse) => {
  const urlparse = url.parse(request.url ? request.url : '', true);

  var answere;

  // Receive informations of user
  const params = queryString.parse(urlparse.search ? urlparse.search : '');

  // Create an User and Update an User
  if (urlparse.pathname == '/create-user') {
    // Salve informations in a doc txt
    fs.writeFile(
      'users/' + params.id + '.txt',
      JSON.stringify(params),
      function (err: any) {
        if (err) throw err
        console.log('Saved!')

        answere = 'User created successfully.'

        response.statusCode = 200
        response.setHeader('Content-Type', 'text/plain')
        response.end(answere)
      }
    )
  }
    // Select an User
    else if (urlparse.pathname == '/select-user') {
      fs.readFile('users/' + params.id + '.txt', function (err: any, data) {
        answere = data
  
        response.statusCode = 200
        response.setHeader('Content-Type', 'application/json')
        response.end(answere)
      })
    }
    // Remove an User
    else if (urlparse.pathname == '/remove-user') {
      fs.unlink('users/' + params.id + '.txt', function (err: any) {
        console.log('File deleted!')
  
        // Ternary Operator
        answere = err ? 'User not found.' : 'User removed successfully.'
  
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/plain')
        response.end(answere)
      })
    }
});

// Execution
server.listen( port, () => {
  console.log(`Server running on port ${port}/`);
})

// To run the application write on terminal: node dist/index.js or npm start
//localhost:5000/create-user?name=camila&age=32&id=1
//localhost:5000/select-user?name=camila&id=1
//localhost:5000/remove-user?name=camila&id=1