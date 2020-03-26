const { users } = require('../../models');

module.exports = {
  post: (req, res) => {
    // TODO : 유저가 로그인을 했을 때, 회원정보를 데이터베이스에서 확인하고, 회원의 id를 session에 담아주도록 구현하세요.
    /*
    1. 유저가 로그인 함
    2. 유저가 보낸 쿠키정보를 바탕으로 회원정보를 DB에서 확인
    3. 회원정보가 일치하면 회원의 id를 세션에 담아서 클라이언트에 전송
    */
   req.session.views++
   res.setHeader('Content-Type', 'text/html')
   res.write('<p>views: ' + req.session.views + '</p>')
   res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
   res.end()


    // let cookie = req.session.cookie;
    // console.log('this is typeof cookie : ', typeof cookie)

    // res.send(JSON.stringify(cookie));
  }
};
