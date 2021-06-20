// Location script

let my_current_location = 1;

function previousRoom () { // Move to a previous room
  const home_array = LZString.decompress(my_home).split(",");
  let number_of_rooms = 0;

  for (i = 0; i < home_array.length; i++) {
    if (home_array[i] === null || home_array[i] === undefined || home_array[i] === "") {
      // Pass
    }

    else {
      number_of_rooms = number_of_rooms + 1;
    }
  }

  const minus_subtract = number_of_rooms - my_current_location;

  if (minus_subtract < 1) { // Check if room doesn't exist
    return false;
  }

  else {
    my_current_location = my_current_location - 1;
    frame2.style.backgroundImage = "url('" + LZString.decompress(home_array[my_current_location - 1]) + "')";
  }
}

function nextRoom () { // Move to a nearby room
  const home_array = LZString.decompress(my_home).split(",");
  let number_of_rooms = 0;

  for (i = 0; i < home_array.length; i++) {
    if (home_array[i] === null || home_array[i] === undefined || home_array[i] === "") {
      // Pass 
    }

    else {
      number_of_rooms = number_of_rooms + 1;
    }
  }

  const plus_add = my_current_location + 1;

  if (plus_add > number_of_rooms) { // Check if room doesn't exist
    return false; 
  }

  else {
    my_current_location = my_current_location + 1;
    frame2.style.backgroundImage = "url('" + LZString.decompress(home_array[my_current_location - 1]) + "')";
  }
}