// Address system for Microsoft Bob (And Friends)

// Storage slots

const my_address = localStorage.getItem("msbobandfriends-save-my-address");
const my_home = localStorage.getItem("msbobandfriends-save-my-home");

let address_slot = "";
let home_slot = "";

let room_1_slot = home1;
let room_2_slot = "";
let room_3_slot = "";
let room_4_slot = "";
let room_5_slot = "";

// Compressed storage slots for rooms 

let compressed_home_slot = LZString.compress(home_slot);

let compressed_room_1_slot = LZString.compress(room_1_slot);
let compressed_room_2_slot = LZString.compress(room_2_slot);
let compressed_room_3_slot = LZString.compress(room_3_slot);
let compressed_room_4_slot = LZString.compress(room_4_slot);
let compressed_room_5_slot = LZString.compress(room_5_slot);

function createAddress () {
  if (my_address === null || my_address === undefined || my_address === "") {
    fetch ("/address")
    .then(response => response.text())
    .then(data => {
      localStorage.setItem("msbobandfriends-save-my-address", data);
      address_slot = data;

      fetch ("/make-address", {
        method : "POST",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({
          myaddress : address_slot
        })
      })
      .then(response => response.text())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        throw error;
      });
    })
    .catch(error => {
      throw error;
    });
  }
  
  else {
    return "Address is already taken!";
  }
}

function updateRooms () {
  home_slot = compressed_room_1_slot + "," + compressed_room_2_slot + "," + compressed_room_3_slot + "," + compressed_room_4_slot + "," + compressed_room_5_slot;

  
}