'use strict';

const AV = require('leanengine');

Date.prototype.Format = function(fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
        "S": this.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ?
                (o[k]) :
                (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;

}

let articleApi = {}
//获取下n篇文章列表
//要求：提供params：目前文章数，列表数
articleApi.getArticleList = async(req, res) => {
    const currentListSize = req.query.listsize || 0;
    const requestedSize = req.query.reqsize || 10;
    const getList = (currentListSize, requestedSize) => {
        const query = new AV.Query('Article');
        query.descending('createdAt');
        query.skip(currentListSize);
        query.limit(requestedSize);
        return query.find();
    }
    getList(currentListSize, requestedSize)
        .then((data) => {
        let arr = [];
        for (let item in data){
            let result = {};
            result.objectId = item.get('objectId');
            result.title = item.get('title');
            result.abstract = item.get('abstract');
            result.createdAt = item.get('createdAt').Format('yyyy-MM-dd hh:mm:ss');
            arr.push(result);
        }
        let response = {}
        response.data = arr;
        response.updateListSize = parseInt(currentListSize) + arr.length;
        res.send(response);
    })
        .catch((err) => {
        console.error('客户端试图获取文章列表失败，错误信息：' + err.message);
        res.status(502).send('err: failed to get article list');
    })
};
//提交文档
var articleObject = AV.Object.extend('Article');
articleApi.submitArticle = async (req, res) => {
    let _post = {
        title: req.body.title,
        content: req.body.content,
        abstract: req.body.abstract,
        img: req.body.img_url
    };
    if(!_post.title.trim() || !_post.content.trim()){
        res.status(400).send("no blank title or content allowed!")
    }

    let post = new articleObject();
    post.set('title', _post.title);
    post.set('content', _post.content);
    post.set('abstract', _post.abstract);
    post.set('img_url', _post.img);

    post.save()
        .then(() => {
        console.log('存储文章，标题： ' + post.get('title'));
        res.status(200).send('Successfully submitted');
    })
        .catch((err) => {
        console.error('存储文章ID = '+ post.get('ObjectId') + '时发生错误，错误内容： ' + err.message);
        res.status(502).send('error when save this article');
    });
}



module.exports = articleApi;