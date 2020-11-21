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

var chordMap = {
  "0,-1,3,2,0,1,0" : "C",
  "0,0,3,1,0,1,3" : "Cm",
  "0,-1,3,2,3,1,0" : "C7",
  "9,0,3,3,2,0,0" : "C#/Db",
  "9,0,3,3,0,0,0" : "C#/Dbm",
  "9,0,3,0,2,0,0" : "C#/Db7",

  "0,-1,-1,0,2,3,2" : "D",
  "0,-1,-1,0,2,3,1" : "Dm",
  "0,-1,-1,0,1,1,2" : "D7",
  "11,0,3,3,1,0,0" : "D#/Eb",
  "11,0,3,3,0,0,0" : "D#/Em",
  "11,0,3,0,2,0,0" : "D#/Eb7",

  "0,0,2,2,1,0,0" : "E",
  "0,0,2,2,0,0,0" : "Em",
  "0,0,2,0,1,0,0" : "E7",
  "0,0,2,-1,-1,-1,-1" : "E5",

  "1,0,2,2,1,0,0" : "F",
  "0,1,0,2,2,1,-1" : "Fmaj7",
  "1,0,3,3,0,0,0" : "Fm",
  "1,0,3,0,2,0,0" : "Fm",
  "0,1,0,3,-1,-1,-1" : "E5",

  "2,0,3,3,2,0,0" : "F#/Gb",
  "2,0,3,3,0,0,0" : "F#/Gbm",
  "2,0,3,0,2,0,0" : "F#/Gb7",
  "0,2,4,-1,-1,-1,-1" : "F#/Gb5",

  "0,3,2,0,0,0,3" : "G",
  "3,0,3,3,0,0,0" : "Gm",
  "0,3,2,0,0,0,1" : "G7",
  "0,3,5,-1,-1,-1,-1" : "G5",

  "4,0,3,3,2,0,0" : "G#/Ab",
  "4,0,3,3,0,0,0" : "G#/Abm",
  "4,0,3,0,2,0,0" : "G#/Ab7",

  "0,-1,0,2,2,2,0" : "A",
  "0,-1,0,2,2,1,0" : "Am",
  "0,-1,0,2,0,2,0" : "A7",
  "0,-1,0,2,0,2,0" : "A7",

  "6,0,3,3,2,0,0" : "A#/Bb",
  "6,0,3,3,0,0,0" : "A#/Bbm",
  "6,0,3,0,2,0,0" : "A#/Bbm",

  "7,0,3,3,2,0,0" : "B",
  "2,-1,0,3,3,3,0" : "B",
  "1,-1,0,3,3,3,0" : "Bb",
  "7,0,3,3,0,0,0" : "Bm",
  "2,-1,0,3,3,2,0" : "Bm",
  "0,-1,2,0,2,0,2" : "B7",
}



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
 * Check to see if the current diagram is a real chord.
 * Update text if it is a real chord.
 * Update text if it is not a real chord.
 */
function checkIfChord() {
  let chordName = chordMap[pressedDownStrings.toString()];

  if(chordName) {
    let ch = chordName.charAt(0);
    let isVowel = (ch == 'A' || ch == 'E');
    ch = (isVowel ? 'n' : '');
    document.getElementById('chordText').innerHTML = `This is a${ch} ${chordName}`;

  }
  else
    document.getElementById('chordText').innerHTML = "I don't know this chord";
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

      checkIfChord();

      removeOpenString(colNum);
    } else {
      // this string is not being pressed
      pressedDownStrings[colNum] = 0;

      checkIfChord();

      el.style.backgroundColor = "";

      addOpenString(colNum);
    }

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
    el.innerHTML = "O";
    pressedDownStrings[colNum] = 0;
  }

  checkIfChord();

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
      // Remove presses under the barre
      for(let i = barreStartingAt; i <= 6; ++i) {
        let underBarre = document.getElementById("1-"+i);
        if(underBarre.getAttribute('data-checked') == "true") {
          underBarre.style.backgroundColor = "";
          pressedDownStrings[i] = 0;
        }

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

  checkIfChord();
}
