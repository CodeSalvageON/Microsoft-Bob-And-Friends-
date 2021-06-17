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
        $("#chat-window").fadeIn(2000);
        $("#weather-window").fadeIn(2000);

        is_interval_on = true;
      }

      else {
        $("#chat-window").fadeIn(2000);
        $("#weather-window").fadeIn(2000);
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