// forecastをAPI化
export default async function handler(req, res) {
  const city = req.query.city || "Tokyo";
  const API_KEY = process.env.API_KEY;

  const url =
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}` +
    `&appid=${API_KEY}&units=metric&lang=ja`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const daily = data.list.filter(item =>
      item.dt_txt.includes("12:00:00")
    );

    const forecast = daily.map(item => ({
      date: item.dt_txt.split(" ")[0],
      temp: item.main.temp,
      description: item.weather[0].description,
      icon: item.weather[0].icon
    }));

    res.status(200).json(forecast);

  } catch {
    res.status(500).json({ error: "予報取得失敗" });
  }
}