var input = $('#search-input').val();
var API_KEY = "a09dbdd9e81585fea0ea468d539562cf";
var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + input + '&APPID=a09dbdd9e81585fea0ea468d539562cf'

// Add event listener to the search button 
$("#mainSearch").on("click", function(event) {
    event.preventDefault();
    var input = $('#search-input').val();
    var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + input + '&APPID=a09dbdd9e81585fea0ea468d539562cf'

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {
// Create variables for every element i.e temp, date, city, wind, humidity
// Use localstorage to save user's data 
console.log(response)
// Setting variables for all data
var weather = response.main.temp
weather = weather - 273.15;
weatherNew = weather.toFixed(0) + "°C";
var wind = response.wind.speed + "KPH"
var humidity = response.main.humidity + "%"

// Generating the main view 
var input = $('#search-input').val();
var city = response.name;
$('#output').text(city);
$('#date').text(moment().format("dddd, MMMM Do YYYY"));
$('.temp').text("Temperature: " + weatherNew)
$('.wind').text("Wind: " + wind)
$('.humidity').text("humidity: " + humidity)
$('#weather-icon').attr("src", 'https://openweathermap.org/img/w/' + response.weather.icon + '.png');

// Trying to get next 5 days with moment js
for(var i=0; i <= 5; i++) {
var nextDay = moment().add([i], 'days').format('YYYY-MM-DD');
console.log(nextDay)
}
$('.futureDate').text(nextDay);

// Updating 5 days forecast from main input
$('.card-title').text(city);

// Creating history buttons
for (var i = 0; i < 6; i++)
if(i < 6)
// input = input[0].toUpperCase();
var histButton = $('<button>').text(input)
$(histButton).addClass('btn btn-primary btn-sm histButton');
$('#history').append(histButton);

// Adding the same function to the buttons
$(histButton).on("click", function () {

    var nextDay = moment().add(1, 'days').format('YYYY-MM-DD');
    console.log(nextDay)

var input = $(histButton).val();
$('.futureDate').text(moment().format("dddd, MMMM Do YYYY"));
$('.card-title').text(city);
$('.wind').text(wind)
$('.humidity').text(humidity)

// Local var for temperature
var weatherHist = response.main.temp
weatherHist = weatherHist - 273.15;
weatherNewHist = weatherHist.toFixed(0) + "°C";
$('.temp').text(weatherNewHist)

});
});

});
// console.log(response.city)




function renderButtons() {
    $('#search-input').empty();
}


renderButtons();



//           $('#date').text(date);
//           $('#weather-icon').attr('src', 'https://openweathermap.org/img/w/' + response.weather[0].icon + '.png');
