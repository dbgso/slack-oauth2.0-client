# Slack OAuth2.0 Sample

# Usage

## Slackアプリの登録

https://api.slack.com/apps

`client_id`と`client_secret`を取得してください

## 環境構築

```bash
git clone https://github.com/dbgso/slack-oauth2.0-client.git
cd slack-oauth2.0-client
yarn # or npm install
```

エディタで`app.js`のidを修正

```diff
// Slack App の Client ID
- const slack_client_id = '';
+ const slack_client_id = '実際のclient_id';
// Slack App の Client Secret
- const slack_client_secret = ''
+ const slack_client_secret = '実際のclient_secret'
```

## 起動

```bash
node app.js
```

これで`http://localhost:3000`にSlackからのコールバックを受け取るサーバが立ち上がります。

## 認可処理

Webブラウザで`https://slack.com/oauth/authorize?client_id=<SLACK_CLIENT_ID>&scope=identify&redirect_uri=http://localhost:3000/`を開いてください

`<SLACK_CLIENT_ID>`は実際に取得したものを入力してください



