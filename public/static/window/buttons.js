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

$("#prevIcon").click(function () {
  previousRoom();
});

$("#nextIcon").click(function () {
  nextRoom();
});

$("#exitIcon").click(function () {
  window.close();
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

// Option buttons 

$("#add-rooms").click(function () {
  $("#frame2").hide();
  $("#frame4").show();
});

$("#return-from-frame4").click(function () {
  $("#frame4").hide();
  $("#frame2").show();
});

$("#add-a-room").click(function () {
  frame4.style.backgroundImage = "url('" + intaddBg + "')";

  $("#frame-4-options").hide();
  $("#add-room-options").show();

  $("#return-from-frame4").hide();
  $("#return-from-add").show();
});

$("#return-from-add").click(function () {
  frame4.style.backgroundImage = "url('" + intBg + "')";

  $("#add-room-options").hide();
  $("#frame-4-options").show();
  
  $("#return-from-add").hide();
  $("#return-from-frame4").show();
});