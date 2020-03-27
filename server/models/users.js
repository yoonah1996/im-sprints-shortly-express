'use strict';

const crypto = require('crypto');


module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    'users',
    {
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING
    },
    {
      hooks: {
        afterValidate: (users, options) => {
          var shasum = crypto.createHash('sha1');
          shasum.update(users.password);
          users.password = shasum.digest('hex');
        }
      }
    }
  );

  // db.sync({ alter: true });

  users.associate = function(models) {
    // associations can be defined here
  };
  return users;
};
