// Retrieve the weather from the home server

setInterval(function () {
  if (is_interval_on === false) { // Optimization plug
    return false;
  }

  else {
    fetch ("/get-weather")
    .then(response => response.text())
    .then(data => {
      if (data === weather_saved) {
        // Do nothing
      }

      else {
        weather_saved = data;

        if (data === "stormy") {
          weather_window_window.style.backgroundImage = "url('" + sunBg + "')'";
        }
      }
    })
    .catch(error => {
      throw error;
    });
  }
}, 500);