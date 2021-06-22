$("#username-form").submit(function () {
  event.preventDefault();

  // check for errors

  if (username_new.value === "" || username_new.value === undefined || username_new.value === null) {
    username_form_error.innerText = "Error: username section is blank!";
  }

  else {
    localStorage.setItem("msbobandfriends-save-username", username_new.value);
    username_form_error.innerText = "";
    username_new.value = "";
    $("#username-choice").fadeOut(2000);

    setTimeout(function () {
      $("#frame2").fadeIn(2000);
      createAddress();
      
      if (optimization === true) {
        // Placeholder
      }

      else {
        // Placeholder
      }
    }, 2000);
  }
});

$("#chat-form").submit(function () {
  event.preventDefault();

  // check for errors

  if (username_saved === "" || username_saved === null || username_saved === undefined) {
    chat_form_error.innerText = "Error: you have not registered!";
  }

  else {
    chat_form_error.innerText = "";

    fetch ("/chat", {
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        message : chat_message.value, 
        username : username_saved
      })
    })
    .then(response => response.text())
    .then(data => {
      console.log(data);
      chat_message.value = "";
    })
    .catch(error => {
      chat_form_error.innerText = error;
    });
  }
});

$("#add-room-form").submit(function () {
  event.preventDefault();

  // Fill room slots 

  const home_array = LZString.decompress(my_home).split(":/?><"); // Check home array for empty room slots 

  for (i = 0; i < home_array.length; i++) {
    if (home_array[i] === null || home_array[i] === undefined || home_array[i] === "") {
      if (i === 0) {
        // That isn't supposed to happen, ABORT

        window.close();
      }

      else if (i === 1) {
        room_2_slot = add_room_url.value;
        updateRooms();
      }

      else if (i === 2) {
        room_3_slot = add_room_url.value;
        updateRooms();
      }

      else if (i === 3) {
        room_4_slot = add_room_url.value;
        updateRooms();
      }

      else if (i === 4) {
        room_5_slot = add_room_url.value;
        updateRooms();
      }

      else {
        // Also isn't supposed to happen, ABORT 

        window.close();
      }
    }

    else {
      // Pass
    }
  }

  add_room_url.value = "";
});