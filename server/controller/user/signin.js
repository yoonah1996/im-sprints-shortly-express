const { users } = require('../../models');

module.exports = {
  post: async function(req, res) {
    // TODO : 유저가 로그인을 했을 때, 회원정보를 데이터베이스에서 확인하고, 회원의 id를 session에 담아주도록 구현하세요.
    let userData = req.body;
    await users
      .findAll({ where: { email: userData.email } })
      .then(data => {
        let send = {};
        send.id = data[0].id;
        res.send(200, send);
      })
      .catch(err => res.send(404, 'unvalid user'));
  }
};
