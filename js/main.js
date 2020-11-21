/**
* Function run exactly once on startup.
*/
function onStart() {
  // Clear the input field
  document.getElementById("barre-input").value = "";
  document.getElementById("searchInput").value = "";
  document.getElementById("allChords").style.display = "none";
}

onStart();


/**
 * on load
 */
$(window).on("load",function(){
     $(".loader-wrapper").fadeOut("slow");
});


// Global variable E string being 1 D string being 3
var barreStartingAt = 6;

// let each element represent fr E A D G B E
// -1 represents closed chord X
var pressedDownStrings = [0, 0, 0, 0, 0, 0, 0];

var chordMap = {
  "0,-1,3,2,0,1,0" : "C",
  "0,-1,3,3,0,1,0" : "Cadd4",
  "0,-1,3,2,0,3,0" : "Cadd9",
  "3,-1,0,3,3,2,0" : "Cm",
  "0,-1,3,2,0,0,0" : "Cmaj7",
  "0,-1,3,2,4,3,0" : "Cmaj9",
  "3,-1,0,3,0,2,0" : "Cm7",
  "3,-1,3,2,0,0,0" : "CM7",
  "0,-1,3,2,3,1,0" : "C7",
  "0,3,3,2,0,1,0" : "C/G",

  "4,-1,0,3,3,2,0" : "C#m",
  "0,-1,4,2,1,0,0" : "C#m7",
  "0,-1,4,3,1,2,1" : "C#",
  "9,0,3,3,2,0,0" : "C#/Db",
  "9,0,3,3,0,0,0" : "C#/Dbm",
  "9,0,3,0,2,0,0" : "C#/Db7",
  "0,-1,4,4,4,0,4" : "C#7sus4",

  "0,-1,-1,0,2,3,2" : "D",
  "0,-1,-1,0,2,2,2" : "Dmaj7",
  "2,0,4,3,0,2,0" : "D/F#",
  "0,-1,-1,0,2,3,1" : "Dm",
  "0,-1,-1,0,1,1,2" : "D7",
  "0,-1,-1,0,2,1,1" : "Dm7",
  "0,2,0,0,2,3,1" : "Dm/F#",
  "3,-1,3,2,3,0,1" : "Db7",
  "1,0,4,3,0,0,0" : "Dbmaj7",
  "0,-1,-1,0,1,0,1" : "Ddim7",

  "0,-1,-1,1,3,4,3" : "D#",
  "11,0,3,3,1,0,0" : "D#/Eb",
  "11,0,3,3,0,0,0" : "D#/Em",
  "11,0,3,0,2,0,0" : "D#/Eb7",

  "0,0,2,2,1,0,0" : "E",
  "0,-1,-1,1,3,4,2" : "Ebm",
  "0,-1,-1,1,0,2,3" : "Eb7",
  "1,-1,0,0,3,2,3" : "Eb/Bb",
  "0,0,2,2,0,0,0" : "Em",
  "0,0,2,1,1,0,0" : "Emaj",
  "0,0,2,1,1,0,0" : "Emaj7",
  "0,0,0,2,2,0,0" : "Esus4",
  "0,0,1,2,0,0,0" : "Emaj7sus4",
  "0,0,2,0,1,0,0" : "E7",
  "0,0,2,0,0,0,0" : "Em7",
  "0,0,2,-1,-1,-1,-1" : "E5",

  "1,0,2,2,1,0,0" : "F",
  "0,-1,0,3,2,1,1" : "F/A",
  "0,-1,2,3,2,1,1" : "F/B",
  "0,-1,3,3,2,1,1" : "F/C",
  "0,1,0,2,2,1,-1" : "Fmaj7",
  "0,1,0,2,2,2,0" : "Fmaj7#5",
  "1,0,3,3,0,0,0" : "Fm",
  "1,0,3,0,2,0,0" : "F7",
  "0,1,0,3,-1,-1,-1" : "F5",

  "2,0,3,3,2,0,0" : "F#/Gb",
  "2,0,3,3,0,0,0" : "F#m",
  "0,2,0,2,2,2,0" : "F#m7",
  "0,-1,-1,4,3,2,1" : "F#maj7",
  "0,-1,-1,4,3,2,0" : "F#7",
  "2,0,3,0,2,0,0" : "F#/Gb7",
  "0,2,4,-1,-1,-1,-1" : "F#/Gb5",

  "0,3,2,0,0,0,3" : "G",
  "2,0,3,3,2,0,0" : "Gb",
  "0,-1,-1,4,3,2,0" : "Gb7",
  "0,-1,-1,4,2,1,2" : "Gdim",
  "3,0,3,3,0,0,0" : "Gm",
  "3,0,3,0,0,0,0" : "Gm7",
  "0,3,2,0,0,0,2" : "Gmaj7",
  "0,3,2,0,0,0,0" : "G6",
  "0,3,2,0,0,0,1" : "G7",
  "0,3,5,-1,-1,-1,-1" : "G5",

  "4,0,3,3,2,0,0" : "G#",
  "4,0,3,3,0,0,0" : "G#m",
  "1,4,3,0,0,0,2" : "G#m7",
  "4,0,3,0,2,0,0" : "G#/Ab7",

  "0,-1,0,2,2,2,0" : "A",
  "0,-1,0,4,2,2,0" : "A6",
  "4,0,3,3,2,0,0" : "Ab",
  "4,0,3,0,0,0,3" : "Abm9",
  "1,4,3,0,0,0,3" : "Abmaj7",
  "0,-1,0,2,2,1,0" : "Am",
  "0,-1,3,2,2,1,0" : "Am/C",
  "0,2,0,2,2,1,0" : "Am/F#",
  "0,3,0,2,2,1,0" : "Am/G",
  "0,-1,0,2,1,2,0" : "Amaj7",
  "0,-1,0,2,0,2,0" : "A7",

  "6,0,3,3,2,0,0" : "A#/Bb",
  "6,0,3,3,0,0,0" : "A#/Bbm",
  "6,0,3,0,2,0,0" : "A#/Bbm7",

  "2,-1,0,3,3,3,0" : "B",
  "7,0,3,3,2,0,0" : "B",
  "2,0,0,3,3,3,0" : "B/E",
  "1,-1,0,3,3,3,0" : "Bb",
  "1,-1,0,3,3,2,0" : "Bbm",
  "1,-1,0,3,0,2,0" : "Bbm7",
  "1,-1,0,3,2,3,0" : "Bbmaj7",
  "1,-1,0,3,0,3,0" : "Bb7",
  "7,0,3,3,0,0,0" : "Bm",
  "2,-1,0,3,3,2,0" : "Bm",
  "0,-1,2,0,2,0,2" : "Bm7",
  "0,-1,2,0,2,0,2" : "B7",
  "0,-1,2,4,2,0,0" : "Bm7sus4",
}


/**
 * Internal function that clears diagram and saves the data to make the diagram.
 * This function clears the presses, open/closed strings and the barre.
 * This is because they work as a toggle system and we can abstract away
 * some work if we set the toggles all to be off.
 */
function clearDiagram() {
  // clear presses
  for(let i = 1; i <= 5; ++i) {
    for(let j = 1; j <= 6; ++j) {
      let el = document.getElementById(i+"-"+j);
      el.style.backgroundColor = '';
      el.setAttribute('data-checked',  "false")
    }
  }
  // clear closed and open strings
  for(let i = 1; i <= 6; ++i) {
    let el = document.getElementById("string-"+i);
    el.innerHTML = 'O';
    el.setAttribute('data-checked',  "false")

  }
  // clear the barre if there is one
  for(let i = 4; i <= 6; ++i) {
    document.getElementById("barreGraphic").classList.remove("barre-overlay-"+i);
  }
  barreStartingAt = 6;
  document.getElementById("barre-input").value = '';
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


/**
 * Internal function to get a key by its value; O(n).
 */
function getByValue(map, searchValue) {
  for(let key in map) {
    if(map[key] == searchValue)
      return key;
  }
}

/**
 * Display the given chord on the diagram.
 */
function displayChord(el) {
  // first, clear the diagram that involves toggling so we can reuse functions
  clearDiagram();

  pressedDownStrings = getByValue(chordMap, el.innerHTML).split(',');

  for(let i = 0; i < pressedDownStrings.length; ++i) {
    pressedDownStrings[i] = parseInt(pressedDownStrings[i]);
  }


  for(let i = 1; i <= 6; ++i) {
    if(pressedDownStrings[i] == -1) {
      // set closed string to closed
      toggleStringClosed(document.getElementById("string-"+i));
    }
    // if it's an open chord do nothing
    else if(pressedDownStrings[i] != 0) {
      let id = pressedDownStrings[i]+'-'+i;
      toggleClick(document.getElementById(pressedDownStrings[i]+'-'+i));
    }
  }

  // really setting the barre :)
  if(pressedDownStrings[0] != 0) {
    let barreInput = document.getElementById("barre-input");
    barreInput.value = pressedDownStrings[0];

    doBarreGraphic(barreInput);
  }
}
