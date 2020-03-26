const { users } = require('../../models');

module.exports = {
  post: async function(req, res) {
    let userData = req.body;
    // TODO : 유저가 회원가입을 했을 때, 회원정보를 데이터베이스에 저장하도록 구현하세요.
    // console.log(userData);
    // await users.find  
    // await users.findOrCreate({where: {email: userData.email}, defaults: {username : userData.username, password : userData.password}})
    // .spread((user, created) => {
    //   console.log(created);
    //   console.log(user);
    // })
      // console.log(created);
  //     .then(data => {
  //       // console.log(data);
  //       res.status(200).json(data)
  //     })
  //     .catch(err => {
  //       res.status(400).json(err)
  //     })
  //   console.log(req.body);
  //   res.end();
  // }

  }
};
