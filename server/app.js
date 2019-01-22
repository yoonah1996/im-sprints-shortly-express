const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const urls = require('./models').urls;
const clicks = require('./models').clicks;
const users = require('./models').users;

const utils = require('./modules/utils');

const app = express();
const port = 3001;

app.use(session({
  secret: '@codestates'
}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get('/', (req, res) => {            // function (req, res) { }
  res.status(200).send('Success')       // OK
})

/**
 * url : /user/signup
 * description : 유저 회원가입
 */

 /**
 * url : /user/signin
 * description : 유저 로그인
 */

 /**
 * url : /user/signout
 * description : 유저 로그 아웃
 */

  /**
 * url : /user/info
 * description : 유저 정보
 */
  
app.get('/links', (req, res) => {
  urls
    .findAll()
    .then(result => {
      if(result) {
        res.status(200).json(result)    // OK
      } else {
        res.sendStatus(204);            // No Content
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).send(error)       // Server error
    })
})

app.post('/links', (req, res) => {
  const { url } = req.body;             // const url = req.body.url

  if(!utils.isValidUrl(url)) {
    return res.sendStatus(400)          // Bad Request
  }

  utils.getUrlTitle(url, (err, title) => {
    if(err) {
      console.log(err)
      return res.sendStatus(400)
    }

    urls
      .create({
        url: url,
        baseUrl: req.headers.host,
        title: title
      })
      .then(result => {
        res.status(201).json(result)      // Created
      })
      .catch(error => {
        console.log(error)
        res.sendStatus(500)               // Server error
      })
  });
})

app.get('/*', (req, res) => {
  urls
    .findOne({
      where: {
          code: req.params[0]
      }
    })
    .then(result => {
      if(result) {
        result.updateAttributes({
          visits: result.visits + 1
        })
        res.redirect(result.url)
      } else {
        res.sendStatus(204)                 
      }
    })
    .catch(error => {
      console.log(error)
      res.sendStatus(500)                   
    })
})

app.set('port', port)
app.listen(app.get('port'));

module.exports = app;
