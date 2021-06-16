// Server
// Downloads and settings start here

const fs = require('fs');
const express = require('express');

const app = require('express')();
const http = require('http').Server(app);
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;
const io = require('socket.io')(http);

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

const sanitizer = require('sanitizer');
let chat_thing = "";

// Google Firestore

const {
	type,
	project_id,
	private_key_id,
	private_key,
	client_email,
	client_id,
	auth_uri,
	token_uri,
	auth_provider_x509_cert_url,
	client_x509_cert_url
} = process.env;

const serviceAccount = {
	type,
	project_id,
	private_key_id,
	private_key,
	client_email,
	client_id,
	auth_uri,
	token_uri,
	auth_provider_x509_cert_url,
	client_x509_cert_url
};

const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Get users online

let residents_online = 0;

io.on('connection', (socket) => {
  console.log('User connected: ', socket.id);
  
  residents_online = residents_online + 1;

  socket.on('disconnect', function() {
    console.log('User disconnected.');
    
    residents_online = residents_online - 1;
  });
});

// Weather system

let weather_condition = "sunny";

setInterval(function () {
  const weather_number = Math.floor(Math.random() * 4);

  if (weather_number === 0) {
    weather_condition = "sunny";
  }

  else if (weather_number === 1) {
    weather_condition = "stormy";
  }

  else if (weather_number === 2) {
    weather_condition = "snowy";
  }

  else if (weather_number === 3) {
    weather_condition = "cloudy";
  }

  else {
    weather_condition = "sunny";
  }
}, 90000);

// Routes

app.get('', function (req, res) {
  const index = __dirname + '/public/static/index.html';

  res.sendFile(index);
});

app.get('/get-chat', function (req, res) {
  res.send(chat_thing);
});

app.get('/get-users', function (req, res) {
  res.send(String(residents_online));
});

app.get('/get-weather', function (req, res) {
  res.send(weather_condition);
});

app.post('/chat', function (req, res) {
  const username = req.body.username;
  const message = req.body.message;

  if (username === "" || username === undefined || username === null) {
    res.send("Empty username lol");
  }

  else {
    if (message === "" || message === undefined || message === null) {
      res.send("Empty message lol");
    }

    else {
      chat_thing = sanitizer.escape(username) + ": " + sanitizer.escape(message) + "<br/>";
      res.send("Sent message");
    }
  }
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});