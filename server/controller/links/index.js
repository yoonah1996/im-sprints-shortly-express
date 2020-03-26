const utils = require('../../modules/utils');

const { urls } = require('../../models');

module.exports = {
  get: (req, res) => {
    urls
      .findAll()
      .then(result => {
        if (result) {
          res.status(200).json(result);
        } else {
          res.sendStatus(204);
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).send(error);
      });
  },
  post: (req, res) => {
    const { url } = req.body;

    if (!utils.isValidUrl(url)) {
      return res.sendStatus(400);
    }
    //isValidUrl :URL이 유효하면 true이고, 그렇지 않으면 false입니다
    //getUrlTitle :원본 파일의 제목
    utils.getUrlTitle(url, (err, title) => {
      if (err) {
        console.log(err);
        return res.sendStatus(400);
      }
      //findOrCreate - 특정 요소를 검색하거나, 존재하지 않으면 새로 생성
      urls
        .findOrCreate({
          where: {
            url: url
          },
          defaults: {
            baseUrl: req.headers.host,
            title: title
          }
        })
        //where에 함께 전달되는 defaults 옵션은 검색 결과가 존재하지 않을 경우 새로 생성되는 요소가 갖는 기본값입니다.
        .then(([result, created]) => {
          if (!created) {
            return res.status(201).json('Already exists');
          }
          res.status(201).json(result); // Created
        })
        .catch(error => {
          console.log(error);
          res.sendStatus(500); // Server error
        });
    });
  }
};
