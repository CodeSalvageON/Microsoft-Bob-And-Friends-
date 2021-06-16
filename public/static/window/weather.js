// Retrieve the weather from the home server

setInterval(function () {
  fetch ("/get-weather")
  .then(response => response.text())
  .then(data => {
    if (data === weather_saved) {
      // Do nothing
    }

    else {
      weather_saved = data;
    }
  })
  .catch(error => {
    throw error;
  });
}, 500);