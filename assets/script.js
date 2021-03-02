var inputEl = document.querySelector(".form-control");
var buttonEl = document.querySelector(".btn-primary")
var resultsEl = $("#results");
var currentDateEl = $("#current-date")
var cityEl = $("#city")
var currentW = $("#current-weather");
var currentHMD = $("#current-humidity")
var currentWindSpd = $("#wind-speed")
var weatherResults = $("#weather-results")
var searchTerm = localStorage.getItem("searchValue") || ""



function currentWeather(input) {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + input + "&units=imperial&APPID=57d7bbe8e038b282feb0c589ab398101")
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {

        var cwIcon = data.weather[0].icon; 
        var cwDiv = $("<div>");
        var iconURL = "http://openweathermap.org/img/wn/" + cwIcon + ".png";
        var cwCity = $("<p>");
        var cwWind = $("<p>");
        var cwTemp = $("<p>");
        var cwImg = $("<img>");
        
        cwCity.text(data.name);
        cwTemp.text("Temp: " + data.main.temp);
        cwWind.text("Wind: " + data.wind.speed);
        cwImg.attr("src", cwIcon);
        cwImg.attr("alt", "weather-icon");
        cwDiv.addClass('col-12 col-md-2');
        cwDiv.css('background-color', '#eae0e0').css('margin', '2px').css('border-radius', '5px').css('text-align', 'center');

        cwDiv.append(cwCity);
        cwDiv.append(cwImg);
        cwDiv.append(cwTemp);
        cwDiv.append(cwWind);


        // var current = data.main.temp;
        // var city = data.name
        // var currentDate = data.dt
        // var currentHumidity = data.main.humidity
        // var currentWS = data.wind[1]
        console.log(data)
        currentW.append(cwDiv)

        

        // currentDateEl.append(currentDate)
        // currentHMD.append(currentHumidity)
        // currentWindSpd.append(currentWS)

    })
}

function getWeather(input) {
    var baseWURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + input + "&units=imperial&APPID=57d7bbe8e038b282feb0c589ab398101"; 
    fetch(baseWURL)
    .then(function(response) {
        return response.json()
        })
    .then(function(data) {
        for(var i = 0; i < data.list.length; i += 8) {
           
            var weatherIcon = data.list[i].weather[0].icon;
            var iconURL = "http://openweathermap.org/img/wn/" + weatherIcon + ".png"
            var weatherDiv = $('<div>')
            var weatherDate = $('<p>')
            var imgEl = $("<img>");
            var HumEl = $('<p>');
            var tempEl = $('<p>');
            
            HumEl.text("Humidity: ").html(HumEl.html() +  data.list[i].main.humidity ).css('padding', 0);
            tempEl.text("Temp: " + data.list[i].main.temp).css('padding', 0);
            weatherDate.text(data.list[i].dt_txt.substring(0,10))
            imgEl.attr("src", iconURL).css('padding', 0);
            imgEl.attr("alt", "weather-icon");
            weatherDiv.addClass('col-12 col-md-2')
            weatherDiv.css('background-color', '#eae0e0').css('margin', '2px').css('border-radius', '5px').css('text-align', 'center');

            weatherDiv.append(weatherDate);
            weatherDiv.append(imgEl);
            weatherDiv.append(tempEl);
            weatherDiv.append(HumEl);
            
            weatherResults.append(weatherDiv);
            resultsEl.append(weatherResults);
        }
       
    })    



}

    
console.log(searchTerm)

buttonEl.addEventListener("click", function(e) {
        e.preventDefault();
        var value = inputEl.value;
        localStorage.setItem("searchValue", value);       
        // console.log(value);
        getWeather(searchTerm) 
        currentWeather(searchTerm)   
    })