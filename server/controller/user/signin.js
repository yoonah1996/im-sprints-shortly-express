const { users } = require('../../models');

module.exports = {
    post: async function(req, res) {
      // TODO : 유저가 로그인을 했을 때, 회원정보를 데이터베이스에서 확인하고, 회원의 id를 session에 담아주도록 구현하세요.
      let userData = req.body;

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
          req.session.save(function () {
            res.status(200).send(idOnly);
          });
        })
        .catch(err => res.status(404).send('unvalid user'));
    }
  };