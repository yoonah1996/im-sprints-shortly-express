const { users } = require('../../models');
let jwt = require("jsonwebtoken");
require('dotenv').config();
module.exports = {
  get: async function (req, res) {
    // TODO : 유저의 session을 이용하여, 데이터베이스에 있는 정보?를 제공하도록 구현하세요
    try {
      let token = req.cookies.user;
      let decoded = jwt.verify(token, process.env.PASSWORD);
      if (decoded) {
        await users
          .findAll({ where: { email: decoded.email } })
          .then(data => {
            console.log(data[0]);
            res.status(200).send(data[0]);
          })
          .catch(err => res.status(401).send('need user session'));
      }
    } catch (err) {
      res.status(401).send('need user session');
    }
  }
};

