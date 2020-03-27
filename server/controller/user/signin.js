const { users } = require('../../models');
const crypto = require('crypto');
let jwt = require("jsonwebtoken");
require('dotenv').config();

module.exports = {
  post: async function (req, res) {
    // TODO : 유저가 로그인을 했을 때, 회원정보를 데이터베이스에서 확인하고, 회원의 id를 session에 담아주도록 구현하세요.
    let userData = req.body;

    let token = jwt.sign({
      email: userData.email   // 토큰의 내용(payload)
    },
      process.env.PASSWORD,    // 비밀 키
      {
        expiresIn: '5m'    // 유효 시간은 5분
      })

    await users
      .findAll({
        where: {
          email: userData.email
        }
      })
      .then(data => {
        if (!data[0]) {
          res.status(404).send('unvalid email');
        } else {

          var shasum = crypto.createHash('sha1');
          shasum.update(userData.password);
          var hooPassword = shasum.digest('hex');

          if (data[0].password !== hooPassword) {
            res.status(404).send('unvalid password');
          } else {
            let idOnly = {};
            idOnly.id = data[0].id;
            res.cookie("user", token)
            res.status(200).send(idOnly);
          }
        }
      });
  }
};



/* 기존코드
    await users
      .findAll({
        where: {
          email: userData.email,
          password: userData.password
        }
      })
      .then(data => {
        let idOnly = {};
        idOnly.id = data[0].id;
        req.session.username = idOnly.id;
        req.session.save(function() {
          res.status(200).send(idOnly);
        });
      })
      .catch(err => res.status(404).send('unvalid user'));

*/
