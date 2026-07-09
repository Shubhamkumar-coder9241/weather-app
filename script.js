
const startbtn = document.querySelector("#startbtn");
const mainbox1 = document.querySelector(".mainbox1");
const mainbox2 = document.querySelector(".mainbox2");
const mainbox3 = document.querySelector(".mainbox3");
const description = document.querySelector("#description");
const input = document.querySelector("#input");
const degree = document.querySelector("#degree");
const cityName = document.querySelector("#cityName");
const speed = document.querySelector("#speed");
const humidityPercent = document.querySelector("#humidityPercent");
const icon = document.querySelector("#icon");
const back = document.querySelector("#back");
 
// ---- Config ----
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "88a45c1013ba00c7f04cbedfa22561b9"; // NOTE: for production, proxy this through a backend so the key isn't exposed client-side
 
// ---- Reusable box-transition animation (fixes duplicated GSAP chains) ----
function switchBox(hideBox, showBox) {
    gsap.to(hideBox, {
        scale: 0.5,
        duration: 0.2,
        yoyo: true,
        onComplete: () => {
            gsap.to(hideBox, {
                opacity: 0,
                scale: 0.9,
                duration: 0.3,
                onComplete: () => {
                    hideBox.classList.add("hide");
                    hideBox.style.opacity = "";
                    hideBox.style.transform = "";
                    showBox.classList.remove("hide");
                }
            });
        }
    });
}
 
// ---- Debounce helper ----
function debounce(fn, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}
 
// ---- Weather fetch & render ----
async function getWeatherData(city) {
    const trimmedCity = city.trim();
    if (!trimmedCity) return; // don't fire requests for empty input
 
    const finalUrl = `${BASE_URL}?q=${encodeURIComponent(trimmedCity)}&units=metric&appid=${API_KEY}`;
 
    try {
        const response = await fetch(finalUrl);
        const weatherData = await response.json();
 
        // city not found / bad request / bad key etc.
        if (!response.ok || weatherData.cod !== 200) {
            switchBox(mainbox2, mainbox3);
            return; // stop here so we never touch weatherData.weather[0] on an error payload
        }
 
        renderWeather(weatherData);
    } catch (err) {
        // network failure, CORS issue, etc.
        console.error("Weather fetch failed:", err);
        switchBox(mainbox2, mainbox3);
    }
}
 
function renderWeather(data) {
    description.textContent = data.weather[0].description;
    cityName.textContent = data.name;
    speed.textContent = `${data.wind.speed} km/h`;
    humidityPercent.textContent = `${data.main.humidity}%`;
    degree.textContent = Math.round(data.main.temp); // units=metric already gives °C
    icon.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
}
 
// ---- Event wiring ----
function init() {
    startbtn.addEventListener("click", () => switchBox(mainbox1, mainbox2));
 
    input.addEventListener(
        "input",
        debounce((e) => getWeatherData(e.target.value), 2000)
    );
 
    back.addEventListener("click", () => {
        mainbox3.classList.add("hide");
        input.value = "";
        mainbox2.classList.remove("hide"); // return to search screen, not the splash screen
    });
}
 
init();