require("dotenv").config();
const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 3000;

// publicフォルダをブラウザ表示できるようにする
app.use(express.static("public"));

const API_KEY = process.env.API_KEY;

// 現在の天気（都市名）

app.get("/weather", async (req, res) => {
  const city = req.query.city || "Tokyo";

  const currenturl =
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=ja`;
  
  const forecasturl =
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=ja`;

  try {

    const [currentRes, forecastRes] = await Promise.all([
      axios.get(currenturl),
      axios.get(forecasturl)
    ]);

    const forecast = await forecastRes.data;
    const weather = currentRes.data;

    const pop = forecast.list?.[0]?.pop ?? 0;

    res.json({
      city: weather.name,
      description: weather.weather[0].description,
      temp: weather.main.temp,
      feels_like: weather.main.feels_like,
      humidity: weather.main.humidity,
      icon: weather.weather[0].icon,
      pop: Math.round(pop * 100)
});

  } catch (error) {
    res.status(500).json({ error: "天気取得に失敗しました" });
  }
});

// 5日間の予報

app.get("/forecast", async (req, res) => {
  const city = req.query.city || "Tokyo";

  const url =
    `https://api.openweathermap.org/data/2.5/forecast` +
    `?q=${city}&appid=${API_KEY}&units=metric&lang=ja`;

  try {
    const response = await axios.get(url);

    // 毎日12時のデータだけ抽出
    const dailyData = response.data.list.filter(item =>
      item.dt_txt.includes("12:00:00")
    );

    const forecast = dailyData.map(item => ({
      date: item.dt_txt.split(" ")[0],
      temp: item.main.temp,
      description: item.weather[0].description,
      icon: item.weather[0].icon
    }));

    res.json(forecast);

  } catch (error) {
    res.status(500).json({ error: "予報取得に失敗しました" });
  }
});

// 現在地の天気（緯度・経度）
app.get("/weather-by-coords", async (req, res) => {
  const { lat, lon } = req.query;

  const url =
    `https://api.openweathermap.org/data/2.5/weather` +
    `?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=ja`;

  try {
    const response = await axios.get(url);
    const weather = response.data;

    res.json({
      city: weather.name,
      description: weather.weather[0].description,
      temp: weather.main.temp,
    });

  } catch (error) {
    res.status(500).json({ error: "現在地の天気取得に失敗しました" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running → http://localhost:${PORT}`);
});
