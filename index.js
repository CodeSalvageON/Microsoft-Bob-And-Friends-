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
const splitter = process.env.splitter;

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

app.get('/address', function (req, res) { // Address system
  async function getAddress () {
    const addressRef = db.collection("msbob").doc("chatlog");
    const address = await addressRef.get();
    const string_log = address.data().log;

    // Do some stuff with arrays

    const address_book = string_log.split(splitter);
    let address_book_number = 0;

    for (i = 0; i < address_book.length; i++) {
      address_book_number = address_book_number + 1;
    }

    // Get new address

   const street_decider = Math.floor(Math.random() * 6);
   let my_address = "";

   if (street_decider === 0) {
     my_address = "mst_" + String(address_book_number + 1);
   }

   else if (street_decider === 1) {
     my_address = "ast_" + String(address_book_number + 1);
   }

   else if (street_decider === 2) {
     my_address = "sw_" + String(address_book_number + 1);
   }

   else if (street_decider === 3) {
     my_address = "war_" + String(address_book_number + 1);
   }

   else if (street_decider === 4) {
     my_address = "dst_" + String(address_book_number + 1);
   }

   else if (street_decider === 5) {
     my_address = "sr_" + String(address_book_number + 1); 
   }

   res.send(my_address);
  }

  getAddress();
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

app.post('/make-address', function (req, res) { // Make an address based on the address system
  const chosen_address = req.body.myaddress;

  async function makeAddress () {
    const addressRef = db.collection("msbob").doc("chatlog");
    const address = await addressRef.get();

    const existent = address.data().log;

    if (existent.includes(chosen_address)) {
      res.send("exists");

      console.log(existent);
    }

    else {
      await addressRef.set({
        log : existent + chosen_address + splitter
      });

      res.send("created");
    }
  }

  makeAddress();
});

app.post('/update-rooms', function (req, res) { // Update rooms (also based on the address system)
  const unparsed_home_array = req.body.home;
  const my_address = req.body.address;

  // Parse the array 

  const parsed_home_array = unparsed_home_array.split(",");
  
  // Check for over limits

  let number_of_rooms = 0;

  for (i = 0; i < parsed_home_array.length; i++) {
    number_of_rooms = number_of_rooms + 1;
  }

  if (number_of_rooms > 5) {
    async function updatedRooms () { // Why the fuck did I even make this function???
      const addressRef = db.collection("msbob").doc(my_address);
      
      if (my_address === "chatlog") {
        // Do nothing 
      }

      else {
        const address = await addressRef.get();
      }
    }

    res.send("Over the limit!");
  }

  else {
    async function actuallyDontDoShit () { 
      const addressRef = db.collection("msbob").doc(my_address);

      addressRef.set({
        log : unparsed_home_array
      });
    }

    actuallyDontDoShit();

    res.send("Updated rooms.");
  }
});

http.listen(port, async function(){
  const addressRef = db.collection("msbob").doc("chatlog");
  const fix_data = {
    log : ""
  }

  const address = await addressRef.get();

  if (!address.exists) {
    await addressRef.set(fix_data);
  }

  else {
    console.log("No fix needed.");
  }

  console.log('listening on *:' + port);
});