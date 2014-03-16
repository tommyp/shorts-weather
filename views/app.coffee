geo_success = (position) ->
  getWeather(position.coords.latitude, position.coords.longitude)

buildText = (line, word) ->
  $('#line').text(line)
  $('#result').text(word).toggle()

renderStuff = (current, high) ->
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

  soonLines = [
    "Give it a chance",
    "Houl yer horses",
    "Relax yer kacks",
    "Don't worry",
    "Not yet"
  ]

  if current >= 16
    warmWord = warmWords[Math.floor(Math.random() * warmWords.length)]
    warmLine = warmLines[Math.floor(Math.random() * warmLines.length)]
    result = "It's a " + warmWord + " " + current + " Degrees"
    buildText(warmLine, result)

  else if high >= 16
    soonLine = soonLines[Math.floor(Math.random() * soonLines.length)]
    result = "It's only " + current + " right now, but it'll be " + high + " later"
    buildText(soonLine, result)

  else
    coldWord = coldWords[Math.floor(Math.random() * coldWords.length)]
    coldLine = coldLines[Math.floor(Math.random() * coldLines.length)]
    result = "It's a " + coldWord + " " + current + " Degrees"
    buildText(coldLine, result)


getWeather = (latitude, longitude) ->
  $.getJSON "http://api.openweathermap.org/data/2.5/weather?lat=" + escape(latitude) + "&lon=" + escape(longitude), (response) ->
    try  
      current_temp = parseInt(response.main.temp - 273.15)
      high_temp = parseInt(response.main.temp_max - 273.15)
      renderStuff(current_temp, high_temp)
    catch error
      console.log(error)
      $('#line').text("Sorry dude")
      $('#result').text("Looks like something is wrong!").toggle()
      $('#outcome').css('display', 'block')

$(document).ready ->
  if navigator and navigator.geolocation
    navigator.geolocation.getCurrentPosition(geo_success)
  else
    error "Geolocation is not supported."
