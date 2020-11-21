/**
 * Function run exactly once on startup.
 */
function onStart() {
  // Clear the input field
  document.getElementById("barre-input").value="";
}

onStart();



// Global variable E string being 1 D string being 3
var barreStartingAt = 6;

// let each element represent fr E A D G B E
// -1 represents closed chord X
var pressedDownStrings = [0, 0, 0, 0, 0, 0, 0];


/**
 * Return true if the string already is being pressed.
 */
function colToggled(el) {
  let res = false;

  let rowNum = parseInt(el.id.split('-')[0]);
  let colNum = parseInt(el.id.split('-')[1]);

  let clickedItself = (el.getAttribute('data-checked') == "true");
  let noOpen = document.getElementById("string-"+colNum).innerHTML == '';

  let stringPressed = false
  for(let i = 1; i <= 5; ++i) {
    let nodeChecked = document.getElementById(i+'-'+colNum).getAttribute("data-checked");
    if(nodeChecked == "true" && rowNum != i)
      stringPressed = true;
  }

  if(stringPressed || (rowNum == 1 && colNum > barreStartingAt)) {
    res = true;
  }

  return res;
}


/**
 * Remove the open string O.
 */
function removeOpenString(colNum) {
  document.getElementById("string-"+colNum).innerHTML= '';
}

/**
 * Add the open string O.
 * Don't add O if the string is being barred.
 */
function addOpenString(colNum) {
  if(colNum <= barreStartingAt)
    document.getElementById("string-"+colNum).innerHTML= 'O';
}


/**
 * Event for adding a finger down onto a string.
 */
function toggleClick(el) {
  let isChecked = el.getAttribute('data-checked');

  let rowNum = parseInt(el.id.split('-')[0]);
  let colNum = parseInt(el.id.split('-')[1]);

  if(!colToggled(el)) {
     isChecked == "false" ?  isChecked = "true" :  isChecked = "false"

    if(isChecked == "true") {
      // this string is being pressed
      el.style.backgroundColor = "black";
      pressedDownStrings[colNum] = rowNum;

      removeOpenString(colNum);
    } else {
      // this string is not being pressed
      pressedDownStrings[colNum] = 0;
      el.style.backgroundColor = "";

      addOpenString(colNum);
    }
    console.log(pressedDownStrings);

    el.setAttribute('data-checked',  isChecked)
  }
}


/**
 * Event for pressing on open string to toggle it closed.
 */
function toggleStringClosed(el) {
  let  isChecked = el.getAttribute('data-checked')
  let colNum = parseInt(el.id.split('-')[1]);

  isChecked == "false" ?  isChecked = "true" :  isChecked = "false"

  // el.innerHTML = ( isChecked == "true" ? "X" : "O");
  if(isChecked == "true") {
    // set X and -1 for the pressed down strings
    el.innerHTML = "X";
    pressedDownStrings[colNum] = -1;
  }
  else {
    // it is currently an X and should be a O
    el.innerHTML = "0";
    pressedDownStrings[colNum] = 0;
  }

  el.setAttribute('data-checked',  isChecked)
}


/**
 * Internal function that returns how many strings the barre should overlay.
 * Let 6 be all strings and 4 be all except E, A and D;
 * Consider only up to E A D strings as barres, less than 4 strings barred will
 * be considered presses.
 */
function barreUntil() {
  // only consider E A D strings
  let barreUntil = 6;

  for(let i = 1; i <= 3; ++i) {
    let el = document.getElementById("string-"+i);
    if(el.innerHTML == 'X')
      --barreUntil;
  }

  return barreUntil;
}


/**
 * Event for adding the barre graphic.
 */
function doBarreGraphic(el) {
  if(el.value > 0 && el.value < 22) {
    // We have to add the barre graphic

    // Let E = 6, A = 5, ...
    // Don't allow barres of less than 4 strings
    let upToString = barreUntil();
    barreStartingAt = 7 - upToString
    if(upToString >= 4) {
      document.getElementById("barreGraphic").classList.add("barre-overlay-"+upToString);

      // Add barre to pressed strings
      pressedDownStrings[0] = parseInt(el.value);

      // Remove open chords and set those pressed strings back to 0
      for(let i = barreStartingAt; i <= 6; ++i) {
        removeOpenString(i);
        pressedDownStrings[i] = Math.max(pressedDownStrings[i], 0);
      }
    }
  }
  else {
    // We have to remove the barre graphic
    for(let i = 4; i <= 6; ++i) {
      document.getElementById("barreGraphic").classList.remove("barre-overlay-"+i);
    }

    // Set barre starting at back to the default 6
    barreStartingAt = 6;
    // Remove barre from pressed strings
    pressedDownStrings[0] = 0;


    // Add back open chords
    for(let i = 1; i <= 6; ++i) {
      pressedDownStrings[i] = Math.max(pressedDownStrings[i], 0);
      if(pressedDownStrings[i] == 0)
        addOpenString(i);
    }
  }
}
