var input = $('#search-input').val();
var API_KEY = "a09dbdd9e81585fea0ea468d539562cf";
var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + input + '&APPID=a09dbdd9e81585fea0ea468d539562cf'

// Add event listener to the search button 
$("#mainSearch").on("click", function(event) {
    event.preventDefault();
    var input = $('#search-input').val();
    var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + input + '&APPID=a09dbdd9e81585fea0ea468d539562cf'

    
// Display input on textarea containing all the variables 
// Loop through the past 6 inputs and add buttons for each one 


$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {
// Create variables for every element i.e temp, date, city, wind, humidity
// Use localstorage to save user's data 


var weather = response.main.temp
weather = weather - 273.15;
weatherNew = weather.toFixed(0) + "°C";
var wind = response.wind.speed + "KPH"
var humidity = response.main.humidity + "%"

var input = $('#search-input').val();
var city = response.name;
$('#output').text(city);
$('#date').text(moment().format("dddd, MMMM Do YYYY"));
$('.temp').text(weatherNew)
$('.wind').text(wind)
$('.humidity').text(humidity)
// $('.temp').append(city)
// for (var i = 0; i < 6; i++)
// if(i < 6)
// $('.history').text(input)
// else {
// i = 0;
// }
for (var i = 0; i < 6; i++)
if(i < 6)
// input = input[0].toUpperCase();
var histButton = $('<button>').text(input)
$(histButton).addClass('btn btn-primary btn-sm');
$('#history').append(histButton);

});

});
// console.log(response.city)




function renderButtons() {
    $('#search-input').empty();
}


renderButtons();

// var city = $('#city').val();
// API_KEY = 'a09dbdd9e81585fea0ea468d539562cf';
// var queryURL = "api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=fa09dbdd9e81585fea0ea468d539562cf";

// $(document).ready(function() {
//     $('#weather-form').submit(function(event) {
//       event.preventDefault();
  
//       var city = $('#city').val();
//       var date = moment();
//       $.ajax({
//         url: queryURL,
//         method: "GET",
//         },
//         console.log(response)
//         function(response) {
//           // Update the current weather section
//           $('#city-name').text(response.name);
//           $('#date').text(date);
//           $('#weather-icon').attr('src', 'https://openweathermap.org/img/w/' + response.weather[0].icon + '.png');
//           $('#temperature').text(response.main.temp + '°F');
//           $('#humidity').text(response.main.humidity + '%');
//           $('#wind-speed').text(response.wind.speed + ' mph');
//                     // Update the 5-Day Forecast
//                     $('.date').text(date);
//                     $('.temperature').text(response.main.temp + '°F');
//           $('.humidity').text(response.main.humidity + '%');
//           $('.wind-speed').text(response.wind.speed + ' mph');
//           $('.weather-icon').attr('src', 'https://openweathermap.org/img/w/' + response.weather[0].icon + '.png');
//         });
//       });
//     });

          