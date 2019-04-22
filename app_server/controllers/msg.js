require ('es6-promise').polyfill();
require ('isomorphic-fetch');
('use strict');

const React = require('react');
const ReactDOMServer = require('react-dom/server');

// Transpile and add the React Component
require("@babel/register") ({
    presets: [ '@babel/preset-react' ]
});

// generate a header, footer and MsgBoard function that produces an element of custom React component
const Header = React.createFactory(require('../components/Header.jsx'));  
const Footer = React.createFactory(require('../components/Footer.jsx'));
const MsgBoard = React.createFactory(require('../components/MsgBoard.jsx'));

/* temp hard-coded data
const msgs = [
    { id: 1, name: 'Bill', msg: 'Hi All!' },
    { id: 2, name: 'Ann', msg: 'ICS 221 is fun!' },
    { id: 3, name: 'John', msg: 'Howdy!' },
    { id: 4, name: 'Barb', msg: 'Hi' },
    { id: 5, name: 'Frank', msg: 'Who\'s tired?' },
    { id: 6, name: 'Sarah', msg: 'I heart React' }
]; */

function handleHTTPErrors(response) {
  if (!response.ok) throw Error(response.status + ': ' + response.statusText);
  return response;
}
 // index handler
const renderIndex = (req, res, msgs) => {
    res.render('index', {
      title: 'ICS 221 Universal JS Msg Board',
      header: ReactDOMServer.renderToString(Header()),
      footer: ReactDOMServer.renderToString(Footer()),
      msgBoard: ReactDOMServer.renderToString(MsgBoard(
        { messages: msgs }
      )),
      //props: '<script>let messages=' + JSON.stringify(msgs.reverse()) + '</script>'
      props: '<script>let messages=' + JSON.stringify(msgs) + '</script>'
    });
  }
const getMessages = (req, res) => {
  fetch (`${process.env.API_URL}/msgs`)
  // fetch('http://localhost:3000/api/v1/msgs')
  // fetch('http://localhost:3003/msgs')  
  .then(response => handleHTTPErrors(response))
  .then(result => result.json())
  .then(result => {
    if (!(result instanceof Array)) {
      console.error('API lookup error');
      result = [];
    } else {
      renderIndex(req, res, result);
    }
})
  .catch(error => {
    console.log(error);
  });
//res.send("HELLO")
};
module.exports = { getMessages };
