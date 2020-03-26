const { users } = require('../../models');

module.exports = {
  get: async function(req, res) {
    // TODO : 유저의 session을 이용하여, 데이터베이스에 있는 정보?를 제공하도록 구현하세요.

    await users
      .findAll({ where: { id: req.session.username } })
      .then(data => {
        console.log('this is session.username : ', req.session.username);
        res.status(200).send(data[0]);
      })
      .catch(err => res.status(401).send('need user session'));
  }
};
