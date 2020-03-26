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


/*
// 복수의 요소 검색
Project.findAll().then(projects => {
  // projects는 모든 Project 모델의 항목들을 배열로 받아온다
})

// 아래와 같이 사용하는 것도 가능하다
Project.all().then(projects => {
  // projects는 모든 Project 모델의 항목들을 배열로 받아온다
})

// 특성을 지정하여 검색하는 것도 가능하다 - 일부만 검색
Project.findAll({ where: { name: 'A Project' } }).then(projects => {
  // projects는 특정된 이름을 가진 Project 모델의 항목을 배열로 받아온다
})

// 특정 범위 내에서 검색
Project.findAll({ where: { id: [1,2,3] } }).then(projects => {
  // projects는 id 값이 1, 2 또는 3인 Projects의 항목들을 배열로 받아온다
  // 내부적으로는 SQL IN을 사용하여 이루어진다
})
*/