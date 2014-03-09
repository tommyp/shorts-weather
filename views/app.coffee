GeoNames = undefined
GeoNames = ->
  this

geo_success = (position) ->
  GeoNames::findNearByWeather(position.coords.latitude, position.coords.longitude)

renderStuff = (temp) ->
  warmLines = [
    "Hell yeah",
    "Of course",
    "Get the legs out",
    "Totes",
    "Flat out",
    "No Doubt",
    "It bloody well is"
  ]
  warmWords = [
    "lovely",
    "great",
    "warm",
    "hot",
    "sweltering",
    "sunny"
  ]
  warmWord = warmWords[Math.floor(Math.random() * warmWords.length)]
  warmLine = warmLines[Math.floor(Math.random() * warmLines.length)]

  coldLines = [
    "No way",
    "Hell no",
    "Are you not wise?",
    "Jeans flat out",
    "Fraid not",
    "Way on",
    "Away on"
  ]
  coldWords = [
    "baltic",
    "freezing",
    "chilly",
    "cold",
    "crappy",
    "shitty"
  ]
  coldWord = coldWords[Math.floor(Math.random() * coldWords.length)]
  coldLine = coldLines[Math.floor(Math.random() * coldLines.length)]

  $('#temp').text(temp)
  if temp >= 16
    $('#line').text(warmLine)
    $('#word').text(warmWord)
  else
    $('#line').text(coldLine)
    $('#word').text(coldWord)

  $('#result').toggle()

GeoNames::findNearByWeather = (latitude, longitude) ->
  $.getJSON "http://ws.geonames.org/findNearByWeatherJSON?lat=" + escape(latitude) + "&lng=" + escape(longitude) + "&callback=?&username=tommyp", (response) ->
    details = undefined
    weather = undefined
    try
      details = response.weatherObservation
      weather =
        temperature: details.temperature
        lng: details.lng
        lat: details.lat
      renderStuff(details.temperature)
    catch error
      console.log(error)
      $('#line').text("Sorry dude")
      $('#result').text("Looks like something is wrong!")
      $('#result').toggle()
      $('#outcome').css('display', 'block')
    # callback weather

$(document).ready ->
  if navigator and navigator.geolocation
    navigator.geolocation.getCurrentPosition(geo_success)
  else
    error "Geolocation is not supported."
