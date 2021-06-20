$("#gamestart").click(function () {
  $("#frame1").fadeOut(2000);
  
  setTimeout(function () {
    if (username_saved === "" || username_saved === null || username_saved === undefined) {
      $("#username-choice").fadeIn(2000);
    }

    else {
      // I'm only happy when it rains.....

      $("#frame2").fadeIn(2000);
      
      if (optimization === true) {
        // Placeholder
      }

      else {
        // Placeholder
      }
    }
  }, 2000);
});

$("#go-back-from-username-form").click(function () {
  $("#username-choice").fadeOut(2000);

  setTimeout(function () {
    $("#frame1").fadeIn(2000);
  }, 2000);
});

$("#chatIcon").click(function () {
  $("#chat-window").fadeIn(2000);
  
  if (optimization === true) {
    is_interval_on = true;
  }

  else {
    // Do nothing
  }
});

$("#weatherIcon").click(function () {
  $("#weather-window").fadeIn(2000);

  if (optimization === true) {
    is_interval_on = true;
  }

  else {
    // Do nothing
  }
});

$("#gitIcon").click(function () {
  window.open("https://github.com/CodeSalvageON/Microsoft-Bob-And-Friends-");
});

$("#twitterIcon").click(function () {
  window.open("https://twitter.com/codehaz?lang=en");
});

$("#close-chat").click(function () {
  $("#chat-window").fadeOut(2000);

  if (optimization === true) {
    is_interval_on = false;
  }

  else {
    // Do nothing
  }
});

$("#close-weather").click(function () {
  $("#weather-window").fadeOut(2000);

  if (optimization === true) {
    is_interval_on = false;
  }

  else {
    // Do nothing
  }
});