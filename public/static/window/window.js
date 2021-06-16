const game_window = document.getElementById("game-window");
const chat_window = document.getElementById("chat-window");
const weather_window = document.getElementById("weather-window");
const frame1 = document.getElementById("frame1");
const frame2 = document.getElementById("frame2");
const logo_1 = document.getElementById("logo1");
const username_new = document.getElementById("username-new");
const chat_message = document.getElementById("chat-message");
const chat_box = document.getElementById("chat-box");
const username_form_error = document.getElementById("username-form-error");
const chat_form_error = document.getElementById("chat-form-error");
const people_online = document.getElementById("people-online");
const weather_window_window = document.getElementById("weather-window-window");

const username_saved = localStorage.getItem("msbobandfriends-save-username");
let chat_saved = "";
let weather_saved = "";

$("#chat-window").hide();
$("#weather-window").hide();
$("#frame2").hide();
$("#username-choice").hide();

$(function () {
  $(".draggable").draggable();
});

frame1.style.backgroundImage = "url('" + cover + "')";
frame2.style.backgroundImage = "url('" + home1 + "')";

logo_1.src = logo1;
weather_window_window.src = window;

const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    
link.type = 'image/x-icon';
link.rel = 'shortcut icon';
link.href = favicon;
    
document.getElementsByTagName("head")[0].appendChild(link);

logo_1.style.width = "358px";
logo_1.style.height = "175px";

$(document).ready(function () {
  $("#game-window").click(function () {
    chat_window.style.zIndex = "0";
    weather_window.style.zIndex = "0";
    game_window.style.zIndex = "1";
  });

  $("#chat-window").click(function () {
    chat_window.style.zIndex = "1";
    weather_window.style.zIndex = "0";
    game_window.style.zIndex = "0";
  });

  $("#weather-window").click(function () {
    chat_window.style.zIndex = "0";
    weather_window.style.zIndex = "1";
    game_window.style.zIndex = "0";
  });
});