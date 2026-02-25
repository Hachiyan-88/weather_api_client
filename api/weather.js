// weatherをAPI化
export default async function handler(req, res) {
  const city = req.query.city || "Tokyo";
  const API_KEY = process.env.API_KEY;

  const url =
    `https://api.openweathermap.org/data/2.5/weather?q=${city}` +
    `&appid=${API_KEY}&units=metric&lang=ja`;

  try {
    const response = await fetch(url);
    const weather = await response.json();

    res.status(200).json({
      city: weather.name,
      description: weather.weather[0].description,
      temp: weather.main.temp,
      feels_like: weather.main.feels_like,
      humidity: weather.main.humidity,
      icon: weather.weather[0].icon
    });

  } catch {
    res.status(500).json({ error: "取得失敗" });
  }
}