# 🌤️ Weather App

都市名を入力（ローマ字or漢字）すると現在の天気と5日間の予報を表示するWEBアプリです。  
REST API(OpenWeatherMap)とJSONを利用して天気情報を取得しています。  

---

## 🚀 デモ

👉 <https://weather-api-client.vercel.app/>

---

## 🖥️ 機能

✅ 都市名から現在の天気取得  
✅ 体感温度・湿度・降水確率の表示  
✅ 天気アイコン表示  
✅ 5日間の天気予報を表示  
✅ 日本語の都道府県入力対応  
✅ ローディング表示
✅ 天気に応じた背景の変更  

---

## 🛠️ 使用技術

- フロントエンド
  - HTML  
  - CSS  
  - JavaScript  

- バックエンド
  - Node.js  
  - Express  

- API
  - :contentReference[oaicite:0]{index=0}

- デプロイ
  - :contentReference[oaicite:1]{index=1}

---

## 📁 ディレクトリ構成

weather_api_client/  
├ public/  
│ ├ index.html  
│ ├ script.js  
│ └ style.css  
└ index.js  

---

## ⚙️ ローカルでの起動方法

### ①リポジトリをクローン

```bash
git clone https://github.com/あなたのユーザー名/weather_api_client.git
cd Weather_API_Client
```

### ②依存関係のインストール

```bash
npm install
```

### ③ .envファイル作成

プロジェクト直下に作成：

```code
API_KEY=あなたのAPIキー
```

※APIキーはOpenWeatherMapで取得できます。

### ④ サーバー起動

```code
node index.js
```

### ⑤ ブラウザで表示する

```code
http://localhost:3000
```

---

## 🔏 デプロイ環境でのAPIキー管理

デプロイ環境ではAPIキーを公開しないため、環境変数に設定します。

### Vercelの場合

Project Settings → Environment Variables

```code
API_KEY=あなたのAPIキー
```

---

## 📒 学習ポイント

- REST APIの利用方法  
- JSONデータの取得と加工  
- 非同期処理（fetch / async await）  
- Node.jsでのAPI作成  
- 環境変数による機密情報管理  
- フロントエンドとバックエンドの連携  
- デプロイと公開手順  

---

## ✨ 今後の改善案

- 現在地の天気取得（Geolocation API）  
- 都市検索履歴の保存  
- ダークモード対応  
- UIのカードデザイン強化  
- PWA対応（スマホアプリ化）  

---

### 📜 ライセンス

MIT
