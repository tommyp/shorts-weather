(function () {
  "use strict";
  var ShortsWeather = {

    init: function (coordinates) {
      ShortsWeather.getWeather(coordinates.lat, coordinates.long);
    },

    getWeather: function (lat, long) {
      $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + escape(lat) + "&lon=" + escape(long) + "&appid=a2eea84afb6ad67c54127563cc7048a6&", function(response) {
        var code, current_temp, error, high_temp, line, locale, result;
        try {
          console.log(response);
          code = response.weather[0].id;
          locale = response.name;
          current_temp = parseInt(response.main.temp - 273.15);
          high_temp = parseInt(response.main.temp_max - 273.15);
          ShortsWeather.buildText(current_temp, high_temp, locale, code);
        } catch (_error) {
          console.log(error);
          error = _error;
          line = "Sorry!";
          result = "It looks like something is wrong.";
          ShortsWeather.render(line, result);
        }
      });
    },

    buildText: function (current, high, locale, code) {

      var coldLine,
          coldLines,
          coldWord,
          coldWords,
          result,
          soonLine,
          soonLines,
          trigger,
          triggerCodes,
          warmLine,
          warmLines,
          warmWord,
          warmWords;

      warmLines = ["Hell yeah", "Of course", "Get the legs out", "Totes", "Flat out", "No Doubt", "It bloody well is"];
      warmWords = ["lovely", "great", "warm", "hot", "sweltering", "sunny"];
      coldLines = ["No way", "Hell no", "Are you not wise?", "Jeans flat out", "Fraid not", "Way on", "Away on"];
      coldWords = ["baltic", "freezing", "chilly", "cold", "crappy", "shitty"];
      soonLines = ["Give it a chance", "Houl yer horses", "Relax yer kacks", "Don't worry", "Not yet"];
      warmWord = warmWords[Math.floor(Math.random() * warmWords.length)];
      coldWord = coldWords[Math.floor(Math.random() * coldWords.length)];
      trigger = 13;
      triggerCodes = [701, 800, 801, 802, 803];

      if (current >= trigger && triggerCodes.indexOf(code) !== -1) {
        warmLine = warmLines[Math.floor(Math.random() * warmLines.length)];
        result = "It's a " + warmWord + " " + current + " Degrees";
        ShortsWeather.render(warmLine, result);
        ShortsWeather.setTweet(warmLine, warmWord, current, locale);
      } else if (high >= trigger && triggerCodes.indexOf(code) !== -1) {
        soonLine = soonLines[Math.floor(Math.random() * soonLines.length)];
        result = "It's a " + coldWord + " " + current + " degrees right now,<br/> but it'll be a " + warmWord + " " + high + " degrees later";
        ShortsWeather.render(soonLine, result);
        ShortsWeather.setTweet(soonLine, coldWord, current, locale);
      } else {
        coldLine = coldLines[Math.floor(Math.random() * coldLines.length)];
        result = "It's a " + coldWord + " " + current + " Degrees";
        ShortsWeather.render(coldLine, result);
        ShortsWeather.setTweet(coldLine, coldWord, current, locale);
      }
    },

    setTweet: function (line, word, temp, locale) {
      var tweetHtml, tweetText;
      tweetText = "Is it Shorts Weather today? " + line + ". It\'s a " + word + " " + temp + " degrees in " + locale + ".";
      tweetHtml = '<a href="https://twitter.com/share" class="twitter-share-button" data-text="' + tweetText + '" data-hashtags="shortsweather">Tweet</a>';
      $('#twitter-widget-0').remove();
      $('#tweet').append(tweetHtml);
      twttr.widgets.load();
      $('#tweet').toggle();
    },

    render: function (line, result) {
      $('#line').html(line);
      $('#result').html(result).toggle();
    }
  }

  $(document).ready(function() {
    if (navigator && navigator.geolocation) {
      return navigator.geolocation.getCurrentPosition(
        function (position) {
          var coordinates = {lat: position.coords.latitude, long: position.coords.longitude};
          ShortsWeather.init(coordinates);
        }
      );
    } else {
      return error("Geolocale is not supported.");
    }
  });
}());
