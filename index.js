/**
 * Server index file to define servable routes
 * route-specific functions inside of lib/requestHelper.js
 */
require("dotenv").config();
const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const util = require('./lib/requestHelper');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(`${__dirname}/public`));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// testing slack auth
app.get('/slackauth', (req, res) => {
  const url = `https://slack.com/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=chat:write:bot&redirect_uri=${process.env.REDIRECT_URI}`;
  res.redirect(url);
});

// app.get('/oauthsuccess', (req, res) => {

// })
app.get("/auth/redirect", (req, res) => {
  var options = {
    uri:
      "https://slack.com/api/oauth.access?code=" +
      req.query.code +
      "&client_id=" +
      process.env.CLIENT_ID +
      "&client_secret=" +
      process.env.CLIENT_SECRET +
      "&redirect_uri=" +
      process.env.REDIRECT_URI,
    method: "GET"
  };
  request(options, (error, response, body) => {
    var JSONresponse = JSON.parse(body);
    if (!JSONresponse.ok) {
      console.log(JSONresponse);
      res
        .send("Error encountered: \n" + JSON.stringify(JSONresponse))
        .status(200)
        .end();
    } else {
      console.log(JSONresponse);
      res.send("Success!");
    }
  });
});
// testing request helper
app.get('/home', util.getHome);

// testing database
app.get('/user', util.getUsers);
app.post('/user', util.addUser);



app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})

// deploy test comment