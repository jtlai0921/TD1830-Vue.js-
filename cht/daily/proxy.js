const http = require('http');
const request = require('request');

const hostname = '127.0.0.1';
const port = 8010;
const imgPort = 8011;

// 建立一個 API 代理服務
const apiServer = http.createServer((req, res) => {
    const url = 'http://news-at.zhihu.com/api/4' + req.url;
    const options = {
        url: url
    };

    function callback (error, response, body) {
        if (!error && response.statusCode === 200) {
            // 設定解碼型態，否則中文會顯示為亂碼
            res.setHeader('Content-Type', 'text/plain;charset=UTF-8');
            // 設定所有域容許跨域
            res.setHeader('Access-Control-Allow-Origin', '*');
            // 傳回代理後的內容
            res.end(body);
        }
    }
    request.get(options, callback);
});
// 監聽 8010 通訊埠
apiServer.listen(port, hostname, () => {
    console.log(`接口代理執行在 http://${hostname}:${port}/`);
});
// 建立一個圖片代理服務
const imgServer = http.createServer((req, res) => {
    const url = req.url.split('/img/')[1];
    const options = {
        url: url,
        encoding: null
    };

    function callback (error, response, body) {
        if (!error && response.statusCode === 200) {
            const contentType = response.headers['content-type'];
            res.setHeader('Content-Type', contentType);
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.end(body);
        }
    }
    request.get(options, callback);
});
// 監聽 8011 通訊埠
imgServer.listen(imgPort, hostname, () => {
    console.log(`圖片代理執行在 http://${hostname}:${imgPort}/`);
});