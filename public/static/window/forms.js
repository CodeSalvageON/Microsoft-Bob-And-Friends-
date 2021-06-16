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
      $("#chat-window").fadeIn(2000);
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