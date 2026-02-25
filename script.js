// 都市名で天気取得
async function getWeather() {
    showLoading();
    toggleButton(true);
    setLoadingState(true);

    const input = document.getElementById("city").value;
    const city = normalizeCity(input);

    try {
        const res = await fetch(`/weather?city=${encodeURIComponent(city)}`);
        const data = await res.json();

        if (data.error) {
            document.getElementById("result").innerText = data.error;
            return;
        }

        document.getElementById("result").innerHTML =`
                                                  <div class="weather-box fade-in">
                                                    <img src="https://openweathermap.org/img/wn/${data.icon}@2x.png" alt="weather icon">
                                                    <div>📍${data.city}</div>
                                                    <div>${data.description}</div>
                                                    <div class="temp">${data.temp}℃</div>
                                                    <div>体感温度：${data.feels_like}℃</div>
                                                    <div>💧湿度： ${data.humidity}%</div>
                                                    <div>☔降水確率：${data.pop}%</div>
                                                  </div> 
                                                `;
        changeBackground(data.description);

    } catch (error) {
        document.getElementById("result").innerText = "取得に失敗しました"
    } finally {
    hideLoading();
    toggleButton(false);
    setLoadingState(false);
    }
}

// 5日間の予報取得
async function getForecast() {
    showLoading();
    toggleButton(true);
    setLoadingState(true);

    const input = document.getElementById("city").value;
    const city = normalizeCity(input);

    try{
        const res = await fetch(`/forecast?city=${encodeURIComponent(city)}`);
        const data = await res.json();

        if (data.error) {
            document.getElementById("forecast").innerText = data.error;
            return;
        }

        let html = "<h3>📅 5日間予報</h3>";

        data.forEach(day => {
            html += `
            <div class="forecast-day">
                <div>${day.date}</div>
                <img src="https://openweathermap.org/img/wn/${day.icon}.png">
                <div>${day.description}</div>
                <div class="temp">${day.temp}℃</div>
            </div>
            `;
        });

    document.getElementById("forecast").innerHTML = html;
    document.getElementById("result").classList.add("fade-in");

    } catch {
        document.getElementById("forecast").innerText = "予報取得失敗";
    }

    hideLoading();
    toggleButton(false);
    setLoadingState(false);
}

// 日本語に対応
const cityMap = {
  "北海道": "Sapporo",
  "青森": "Aomori","岩手": "Morioka","宮城": "Sendai","秋田": "Akita","山形": "Yamagata","福島": "Fukushima",

  "茨城": "Mito","栃木": "Utsunomiya","群馬": "Maebashi","埼玉": "Saitama","千葉": "Chiba",
  "東京": "Tokyo","神奈川": "Yokohama",

  "新潟": "Niigata","富山": "Toyama","石川": "Kanazawa","福井": "Fukui","山梨": "Kofu",
  "長野": "Nagano","岐阜": "Gifu","静岡": "Shizuoka","愛知": "Nagoya",

  "三重": "Tsu","滋賀": "Otsu","京都": "Kyoto",
  "大阪": "Osaka","兵庫": "Kobe","奈良": "Nara","和歌山": "Wakayama",

  "鳥取": "Tottori","島根": "Matsue","岡山": "Okayama",
  "広島": "Hiroshima","山口": "Yamaguchi",

  "徳島": "Tokushima","香川": "Takamatsu","愛媛": "Matsuyama","高知": "Kochi",

  "福岡": "Fukuoka","佐賀": "Saga","長崎": "Nagasaki",
  "熊本": "Kumamoto","大分": "Oita","宮崎": "Miyazaki","鹿児島": "Kagoshima","沖縄": "Naha"
};

function normalizeCity(input) {
    return cityMap[input] || input;
}

// Enter検索を有効にする
document.getElementById("city").addEventListener("keydown", function(e) {
    if (e.key === "Enter" && this.value.trim()) {
        getWeather();
        getForecast();
    }
});

// ページ読み込み時に実行
// window.onload = getLocationWeather;

function changeBackground(description) {

    if (description.includes("晴")) {
        document.body.style.background =
        "linear-gradient(to bottom, #4facfe, #00f2fe)";
    }

    else if (description.includes("曇")) {
        document.body.style.background =
        "linear-gradient(to bottom, #bdc3c7, #2c3e50)";
    }

    else if (description.includes("雨")) {
        document.body.style.background =
        "linear-gradient(to bottom, #4b6cb7, #182848)";
    }

    else if (description.includes("雪")) {
        document.body.style.background =
        "linear-gradient(to bottom, #e6dada, #274046)";
    }

    else {
        document.body.style.background =
        "linear-gradient(to bottom, #74b9ff, #dfe6e9)";
    }
}

function showLoading() {
    document.getElementById("loading").style.display = "block";
}

function hideLoading() {
    document.getElementById("loading").style.display = "none";
}

function setLoadingState(active) {
    const result = document.getElementById("result");
    const forecast = document.getElementById("forecast");

    if(active) {
        result.classList.add("loading-state");
        forecast.classList.add("loading-state");
    } else {
        result.classList.remove("loading-state");
        forecast.classList.remove("loading-state");
    }
}

function toggleButton(disabled) {
    const btn = document.querySelector("button");
    btn.disabled = disabled;
    btn.style.opacity = disabled ? "0.6" : "1";
    btn.style.cursor = disabled ? "not-allowed" : "pointer";
}