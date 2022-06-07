"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Including Libraries
const http = __importStar(require("http"));
const url = __importStar(require("url"));
const fs = __importStar(require("fs"));
const queryString = __importStar(require("query-string"));
// Defining port
const port = 5000;
const server = http.createServer((request, response) => {
    const urlparse = url.parse(request.url ? request.url : '', true);
    var answere;
    // Receive informations of user
    const params = queryString.parse(urlparse.search ? urlparse.search : '');
    // Create an User and Update an User
    if (urlparse.pathname == '/create-user') {
        // Salve informations in a doc txt
        fs.writeFile('users/' + params.id + '.txt', JSON.stringify(params), function (err) {
            if (err)
                throw err;
            console.log('Saved!');
            answere = 'User created successfully.';
            response.statusCode = 200;
            response.setHeader('Content-Type', 'text/plain');
            response.end(answere);
        });
    }
    // Select an User
    else if (urlparse.pathname == '/select-user') {
        fs.readFile('users/' + params.id + '.txt', function (err, data) {
            answere = data;
            response.statusCode = 200;
            response.setHeader('Content-Type', 'application/json');
            response.end(answere);
        });
    }
    // Remove an User
    else if (urlparse.pathname == '/remove-user') {
        fs.unlink('users/' + params.id + '.txt', function (err) {
            console.log('File deleted!');
            // Ternary Operator
            answere = err ? 'User not found.' : 'User removed successfully.';
            response.statusCode = 200;
            response.setHeader('Content-Type', 'text/plain');
            response.end(answere);
        });
    }
});
// Execution
server.listen(port, () => {
    console.log(`Server running on port ${port}/`);
});
// To run the application write on terminal: node dist/index.js or npm start
//localhost:5000/create-user?name=camila&age=32&id=1
//localhost:5000/select-user?name=camila&id=1
//localhost:5000/remove-user?name=camila&id=1
