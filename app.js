//@ts-check

const request = require('request')
const express = require('express');
const app = express();

// SSL関連でエラーが出るので、応急処置 SlackのAPIにリクエストするときに死んでいる模様。おそらく社内ネットワークのせい
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

// Slack App の Client ID
const slack_client_id = '';
// Slack App の Client Secret
const slack_client_secret = ''

app.get('/', (req, res) => {
    // 認可コードの取得
    const code = req.query["code"];

    // 認可コードを使って、アクセストークンをリクエストする
    request({
        url: "https://slack.com/api/oauth.access",
        method: "POST",
        form: {
            client_id: slack_client_id,
            client_secret: slack_client_secret,
            code: code,
            redirect_uri: "http://localhost:3000/"
        }
    }, (error, response, body) => {
        // レスポンスからアクセストークンを取得する
        const param = JSON.parse(body);
        console.log(param);
        const access_token = param['access_token']; // アクセストークン

        // ユーザIDを取得するためのリクエスト
        request("https://slack.com/api/auth.test",{
            method: "POST",
            form: {
                token: access_token
            }
        },(error, response, body) => {
            const user = JSON.parse(body); 
            console.log(user);
            // アクセストークンを使ってユーザ情報をリクエスト
            request("https://slack.com/api/users.info ", {
                method: 'POST',
                form: {
                    token: access_token,
                    user: param['user_id']
                }
            }, (error, response, body) => {
                res.send(user);
            })
        })
    })
})

app.listen(3000, () =>{
        console.log('HTTP Server(3000) is running.');
});