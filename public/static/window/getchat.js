const socket = io();

setInterval(function () {
  fetch ("/get-chat")
  .then(response => response.text())
  .then(data => {
    if (data === chat_saved) {
      // Do nothing
    }

    else {
      chat_saved = data;
      chat_box.innerHTML = chat_box.innerHTML + "<span>" + data + "</span>";

      chat_box.scrollTo(0, chat_box.scrollHeight);
    }
  })
  .catch(error => {
    throw error;
  });

  fetch ("/get-users")
  .then(response => response.text())
  .then(data => {
    people_online.innerText = "Users online: " + data;
  })
  .catch(error => {
    throw error;
  });
}, 500);