'use strict'

const AV = require('leanengine');

const Comment = AV.Object.extend('Comments');
let commentApi = {};

commentApi.getCommentList = async (req, res) => {
    const article = req.query.articleId;
    const queryComments = () => {
        const targetArticle = AV.Object.createWithoutData('Article', article);
        const query = new AV.Object('Comments');
        query.ascending('createdAt');
        query.equalTo('relatedArticle', targetArticle);
        return query.find();
    }
    queryComments().then((data) => {
        if(data) {
            let arr = [];
            for (let comment in data){
                let result = {};
                result.objectId = comment.get('objectId');
                result.name = comment.get('name');
                result.comment = comment.get('comment');
                result.createdAt = comment.get('createdAt');
                arr.push(result);

            }
            res.status(200).send(arr);
        }
    }).catch(() => {
        res.status(500).send('获取文章失败')
    })
};

commentApi.submitComment = async(req, res) => {
    const comment = req.body.comment;
    const name = req.body.name;
    const article = AV.Object.createWithoutData('Article', req.body.ObjectId);
    if (!name.trim() || !comment.trim()){
        res.status(500).send('昵称与评论内容不可为空！');
    }

    let newComment = new Comment();
    newComment.set('name', name);
    newComment.set('comment', comment);
    newComment.set('relatedArticle', article);
    newComment.save()
        .then(() => {console.log('接受评论')})  //TODO: 如何在云端console中显示存储的评论ObjectId
        .catch((err) => {console.err('评论存储错误， 错误信息：' + err.message);
                        res.status(500), send('无法保存评论')});


};

module.exports = commentApi;