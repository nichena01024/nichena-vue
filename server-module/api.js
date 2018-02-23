//服务端路由配置
//囊括所有支持的API

'use strict'

const router = require('express').Router();

//添加三个Class
const article = require('./modules/article');
//const user = require('./modules/user');
//const comment = require('./modules/comment');
//article, 包括获取列表，读取/提交文章
router.get('/getArticleList', article.getArticleList);
router.post('/submitArticle', article.submitArticle);

module.exports = router;