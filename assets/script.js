var inputEl = document.querySelector(".form-control");
var buttonEl = document.querySelector(".btn")
var resultsEl = $("#results");
var tempOne = $("#temp-one");
var tempTwo = $("#temp-two");
var tempThree = $("#temp-three");
var tempFour = $("#temp-four");
var tempFive = $("#temp-five")
var descOne = $("#desc-one");
var descTwo = $("#desc-two");
var descThree = $("#desc-three");
var descFour = $("#desc-four");
var descFive = $("#desc-five");
var cityEl = $("#city")
var currentW = $("#current-weather");
var currentWindSpd = $("#wind-speed")
var currentDateEl = $("#current-date")
var currentHMD = $("#humidity")
var dateOne = $("#date-one")
var dateTwo = $("#date-two")
var dateThree = $("#date-three")
var dateFour = $("#date-four")
var dateFive = $("#date-five")

var searchTerm = localStorage.getItem("searchValue") || ""


function currentWeather(input) {
    fetch("http://api.openweathermap.org/data/2.5/weather?q=" + input + "&units=imperial&APPID=57d7bbe8e038b282feb0c589ab398101")
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        var current = data.main.temp;
        var city = data.name
        var currentDate = data.dt
        var currentHumidity = data.main.humidity
        var currentWS = data.wind[1]
        console.log(data)
        currentW.append(current)

        currentDateEl.append(currentDate)
        currentHMD.append(currentHumidity)
        currentWindSpd.append(currentWS)
    })
}
// city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index

currentWeather(searchTerm)

function getWeather(input) {
    var baseWURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + input + "&units=imperial&APPID=57d7bbe8e038b282feb0c589ab398101"; 
    fetch(baseWURL)
    .then(function(response) {
        return response.json()
        })
    .then(function(data) {
         
            var temp = data.list[0].main.temp;
            var sky = data.list[0].weather[0].description;
            var weatherDate = data.list[0].dt_txt.substring(0,10);
            var weatherIcon = data.list[0].weather[0].icon;
            var iconURL = "http://openweathermap.org/img/wn/" + weatherIcon + ".png"
            var imgEl = $("<img>");
            imgEl.attr("src", iconURL);
            imgEl.attr("alt", "weather-icon");
            // $(".weather-icon").attr("src", iconURL)
            // var temp = document.createElement("p");
            // temp.textContent = data.list[0].main.temp;
            // document.main.appendChild(temp)
            // create a for loop to populate the 5 day forecast. cycle 0-5 under list array
            console.log(temp);
            resultsEl.append(imgEl)
            
        console.log(data);

        tempOne.append(data.list[0].main.temp)
        tempTwo.append(data.list[8].main.temp)
        tempThree.append(data.list[16].main.temp)
        tempFour.append(data.list[24].main.temp)
        tempFive.append(data.list[32].main.temp)


        descOne.append(data.list[0].weather[0].description)
        descTwo.append(data.list[8].weather[0].description)
        descThree.append(data.list[16].weather[0].description)
        descFour.append(data.list[24].weather[0].description)
        descFive.append(data.list[32].weather[0].description)

        dateOne.append(data.list[0].dt_txt.substring(0,10))
        dateTwo.append(data.list[8].dt_txt.substring(0,10))
        dateThree.append(data.list[16].dt_txt.substring(0,10))
        dateFour.append(data.list[24].dt_txt.substring(0,10))
        dateFive.append(data.list[32].dt_txt.substring(0,10))


    })    
    };

    getWeather(searchTerm)
    console.log(searchTerm)


        
buttonEl.addEventListener("click", function(e) {
        e.preventDefault();
        var value = inputEl.value;
        localStorage.setItem("searchValue", value);
        // getHotels(value);
        // console.log(value);
        // window.location.href = "result.html" 
    })