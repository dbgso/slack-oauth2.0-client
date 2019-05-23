# Slack OAuth2.0 Sample

# Usage

## Slackアプリの登録

まず、Slackアプリの登録が必要になります

[Slack API: Applications | Slack](https://api.slack.com/apps) を開いて、`Create New App` を選択して、任意のアプリ名とチームを選択してください。

## ClientIDの取得

`Basic Information`のページの画面中央の`App Credentials`にIDが書いてあります

`Client ID`と`Client Secret`が必要になるので控えておいてください。(**漏洩しないよう注意**)

ただ、いつでも見えるので後でも良いです。

## Recirect URLsの設定

左メニューより、`OAuth & Permissions`を選択します。

`Redirect URLs`の項目からコールバックを受けるサーバのURLを追加します。

今回はローカルサーバに立てるので、`http://localhost:3000`を登録します。


## Scopeの設定

画面下部の`Scopes`中の`Select Permission Scopes`から`users:read`を選択します

> 認可のみであれば`identity.basic`でも良いのですが、サンプルコードではユーザ情報まで取得しているため、これを選択します

ここまででSlack側の設定は完了です

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



