let startbtn = document.querySelector("#startbtn");
let mainbox1 = document.querySelector(".mainbox1");
let mainbox2 = document.querySelector(".mainbox2");
let mainbox3 = document.querySelector(".mainbox3");
let description = document.querySelector("#description");
let input = document.querySelector("#input");
let degree = document.querySelector("#degree");
let cityName = document.querySelector("#cityName");
let speed = document.querySelector("#speed");
let humidityPercent = document.querySelector("#humidityPercent");
let icon = document.querySelector("#icon");
let back= document.querySelector("#back");


const url = "https://api.openweathermap.org/data/2.5/weather?";
const apikey = "88a45c1013ba00c7f04cbedfa22561b9";




async function getWeatherData(city) {

    let finalUrl = `${url}q=${city}&&appid=${apikey}`
    let weatherData = await fetch(finalUrl).then(res => res.json()
    )
       if (weatherData.cod === "404" || weatherData.cod === 404) {
          mainbox2.classList.add("hide");
          mainbox3.classList.remove("hide");
         
        }
    console.log(weatherData)
    description.textContent = weatherData.weather[0].description;
    cityName.textContent = weatherData.name;
    speed.textContent = weatherData.wind.speed;
    humidityPercent.textContent = weatherData.main.humidity;
    degree.textContent = ((weatherData.main.temp) - 273.15).toFixed(0);
    icon.setAttribute("src",`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`)


}





(function () {


    function getstart() {
        startbtn.addEventListener("click", function () {
            mainbox1.classList.add("hide");
            mainbox2.classList.remove("hide");

        });
    }
    getstart();
    function debounce(fnc, delay) {
        let timer;
        return function (...argu) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                fnc(...argu);
            }, delay)
        }
    }
    input.addEventListener("input", debounce(function (dets) {
        getWeatherData(dets.target.value)
    }, 1000))

})();

function start(){
    back.addEventListener("click",function(){
         mainbox3.classList.add("hide");
          mainbox1.classList.remove("hide");
        
    })
}
start();