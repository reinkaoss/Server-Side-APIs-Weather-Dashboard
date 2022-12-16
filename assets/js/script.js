var API_KEY = "a09dbdd9e81585fea0ea468d539562cf";
var queryURL = "http://api.openweathermap.org/geo/1.0/direct?appid=" + API_KEY + "&q="




// 
// response.city.name
// response.
// response.dt -> Date needs to be converted
// response.main.temp -> Convert to Celsius -> To convert from Kelvin to Celsius: C = K - 273.15
// response.main.humidity

// Add event listener to the search button 
$("#mainSearch").on("click", function(event) {
    event.preventDefault();
    var input = $('#search-input');
    console.log(input.val())
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?&appid=" + API_KEY + input;

// Display input on textarea containing all the variables 
// Loop through the past 6 inputs and add buttons for each one 


$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {
// Create variables for every element i.e temp, date, city, wind, humidity
// Use localstorage to save user's data 
var input = $('#search-input').val();
var city = response.city;
$('#output').text(city);
console.log(response)
    
});
});

function renderButtons() {
    $('#search-input').empty();
}


renderButtons();


