const { users } = require('../../models');

module.exports = {
  post: async function(req, res) {
    let userData = req.body;

    await users
      .findOrCreate({
        where: { email: userData.email },
        defaults: { username: userData.username, password: userData.password }
      })
      .spread((searchCreate, boolean) => {
        if (boolean) {
          res.send(200, searchCreate);
        } else {
          res.send(409, 'Already exists user');
        }
      });
  }
};
