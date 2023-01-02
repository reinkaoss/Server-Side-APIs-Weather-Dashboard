var input = $("#search-input").val();
var queryURL =
"https://api.openweathermap.org/data/2.5/forecast?q=";
var API_KEY = '&APPID=a09dbdd9e81585fea0ea468d539562cf';

// Add event listener to the search button
$("#mainSearch").on("click", function (event) {
  event.preventDefault();
  var input = $("#search-input").val();
  weatherAPIFunction(input);
});

function weatherAPIFunction(input) {
  $.ajax({
    url: queryURL + input + API_KEY,
    method: "GET",
  }).then(function (response) {

    // Setting variables for all data
    var weather = response.list[0].main.temp;
    weather = weather - 273.15;
    weatherNew = weather.toFixed(0) + "°C";
    var wind = response.list[0].wind.speed + "KPH";
    var humidity = response.list[0].main.humidity + "%";

    // Getting weather icon
    var iconCode = response.list[0].weather[0].icon;

    // Build the icon URL using the icon code
    var iconUrl = "https://openweathermap.org/img/wn/" + iconCode + "@2x.png";
    var iconImg = $("#weather-icon");
    iconImg.attr("src", iconUrl);
    $("#weather-icon").append(iconImg);

    // Generating the main view
    // var input = $("#search-input").val();
    var city = response.city.name;
    $("#output").text(city);
    $("#date").text(moment().format("dddd, MMMM Do YYYY"));
    $(".temp").text("Temperature: " + weatherNew);
    $(".wind").text("Wind: " + wind);
    $(".humidity").text("humidity: " + humidity);

    // var input = $("#search-input").val();
    var histButtonList = [];
    for (var i = 0; i < 1; i++) {
      var histButton = $("<button>").text(input); 
      if(!(histButton in histButtonList)) {
        histButtonList.push(histButton)
        $("#history").append(histButton);
      $(histButton).attr("id", "histSearch");
      $(histButton).attr("data", input);
      $(histButton).addClass("btn btn-primary btn-sm");
      localStorage.setItem('userInput', JSON.stringify(histButton.text()))
    }
}
    // Get next 5 days with moment js
    var dates = [];
    for (var i = 1; i <= 6; i++) {
      var nextDay = moment().add([i], "days").format("YYYY-MM-DD");
      dates.push(nextDay);
    }

    $(".futureDate").each(function (index) {
      $(this).text(dates[index]);
    });

    // Updating 5 days forecast from main input
    $(".card-title").text(city);

    // Loop through 5 days temperatures
    var forecastEl = [
      response.list[3].main.temp,
      response.list[11].main.temp,
      response.list[19].main.temp,
      response.list[27].main.temp,
      response.list[35].main.temp,
    ];

    // get the temperature elements
    var tempElements = $(".tempForecast");
    // loop through the forecastEl array
    forecastEl.forEach((temp, index) => {
      // convert the temperature from kelvins to degrees Celsius
      temp = temp - 273.15;
      temp = temp.toFixed(0);
      // format the temperature as a string
      var tempString = temp + "°C";
      $(tempElements[index]).text("Temperature " + tempString);
    });

    // Looping through Wind 5 days forecast
    var windForecastEl = $(".windForecast");

    var windEl = [
      response.list[3].wind.speed,
      response.list[11].wind.speed,
      response.list[19].wind.speed,
      response.list[27].wind.speed,
      response.list[35].wind.speed,
    ];

    windEl.forEach((wind, index) =>
      $(windForecastEl[index]).text("Wind: " + wind + "KPH")
    );

// 5 days forecast icons
// var iconUrl = "https://openweathermap.org/img/wn/" + iconCode + "@2x.png";


// Loop through 5 days icons
var iconForecastEl = $("#weathericonForecast");

var iconEl = [  response.list[3].weather[0].icon,
  response.list[11].weather[0].icon,
  response.list[19].weather[0].icon,
  response.list[27].weather[0].icon,
  response.list[35].weather[0].icon,
];

// loop through the iconEl array
iconEl.forEach((icon, index) => {
  // Build the icon URL using the icon code
  var iconUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
  // Set the src attribute of the image element
  $(iconForecastEl[index]).attr("src", iconUrl);
});

$(histButton).on("click", function (event) {
    event.preventDefault();
    histButton.empty()
  weatherAPIFunction(input);
      });    
    });
}

$(document).ready(function () {

  var input = (JSON.parse(localStorage.getItem("userInput")));

  if (input) {
    histButton = $("<button>").text(input);
    $("#history").append(histButton);
    $(histButton).attr("id", "histSearch");
    $(histButton).addClass("btn btn-primary btn-sm");
    weatherAPIFunction(input);
  }
});

function renderButtons() {
  $("#search-input").empty();
}
renderButtons();