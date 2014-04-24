# Is It Shorts Weather Today? It bloody well is. It's a sweltering 20 degrees in London - http://isitshortsweathertoday.com/ #shortsweather


geo_success = (position) ->
  getWeather(position.coords.latitude, position.coords.longitude)

render = (line, word) ->
  $('#line').html(line)
  $('#result').html(word).toggle()

setTweet = (line, word, temp, locale) ->
  tweetText = "Is it Shorts Weather today? " + line + ". It\'s a " + word + " " + temp + " degrees in " + locale
  tweetHtml = '<a href="https://twitter.com/share" class="twitter-share-button" data-text="' + tweetText + '" data-hashtags="shortsweather">Tweet</a>'
  $('#twitter-widget-0').remove();
  $('#tweet').append(tweetHtml);
  twttr.widgets.load();
  $('#tweet').toggle();

buildText = (current, high, locale) ->
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

  warmWord = warmWords[Math.floor(Math.random() * warmWords.length)]
  coldWord = coldWords[Math.floor(Math.random() * coldWords.length)]

  trigger = 16

  if current >= trigger
    warmLine = warmLines[Math.floor(Math.random() * warmLines.length)]
    result = "It's a " + warmWord + " " + current + " Degrees"
    render(warmLine, result)
    setTweet(warmLine, warmWord, current, locale)

  else if high >= trigger
    soonLine = soonLines[Math.floor(Math.random() * soonLines.length)]
    result = "It's " + coldWord + " " + current + " degrees right now,<br/> but it'll be a " + warmWord + " " + high + " degrees later"
    render(soonLine, result)
    setTweet(soonLine, soonWord, current, locale)
  else
    coldLine = coldLines[Math.floor(Math.random() * coldLines.length)]
    result = "It's a " + coldWord + " " + current + " Degrees"
    render(coldLine, result)
    setTweet(coldLine, coldWord, current, locale)

getWeather = (latitude, longitude) ->
  $.getJSON "http://api.openweathermap.org/data/2.5/weather?lat=" + escape(latitude) + "&lon=" + escape(longitude), (response) ->
    try
      locale = response.name
      current_temp = parseInt(response.main.temp - 273.15)
      high_temp = parseInt(response.main.temp_max - 273.15)
      buildText(current_temp, high_temp, locale)
    catch error
      $('#line').text("Sorry dude")
      $('#result').text("Looks like something is wrong!").toggle()
      $('#outcome').css('display', 'block')

$(document).ready ->
  if navigator and navigator.geolocation
    navigator.geolocation.getCurrentPosition(geo_success)
  else
    error "Geolocale is not supported."
