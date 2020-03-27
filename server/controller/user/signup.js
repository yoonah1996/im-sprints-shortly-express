const { users } = require('../../models');
const Sequelize = require('sequelize');
const crypto = require('crypto');

module.exports = {
  post: async function(req, res) {
    let userData = req.body;

    await users
      .findAll({
        where: {
          email: userData.email
        }
      })
      .then(data => {
        if (data[0]) {
          res.status(409).send('Already exists user');
        } else {
          if (String(userData.password).length < 7) {
            res.status(409).send('Password should be longer than 8 characters');
          } else {
            users
              .create({
                username: userData.username,
                email: userData.email,
                password: userData.password
              })
              .then(data => res.status(200).send(data));
          }
        }
      });
  }
};

/* solution 2
    
    if(userData.password.length < 8){
      res.status(409).send('Password should be longer than 8 characters')

    } else {
      await users
        .findOrCreate({
          where: { 
            email: userData.email,
            password : { 
              [Sequelize.Op.gt] : 555555
            }
          },
          defaults: { username: userData.username, email:userData.email, password: userData.password }
        })
        .spread((searchCreate, boolean) => {
          if (boolean) {
            res.send(200, searchCreate);
          } else {
            res.status(409).send('Already exists user');
          }
        });
  }
}
};
    */
