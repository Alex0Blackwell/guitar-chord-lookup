/**
 * Function run exactly once on startup.
 */
function onStart() {
  // Clear the input field
  document.getElementById("barre-input").value="";
}

onStart();



/**
 * Return true if the string already is being pressed.
 */
function colToggled(el) {
  let res = false;

  let rowNum = el.id.split('-')[0];
  let colNum = el.id.split('-')[1];

  let clickedItself = (el.getAttribute('data-checked') == "true");

  if(document.getElementById("string-"+colNum).innerHTML == '' && !clickedItself)
    res = true;
  //
  // for(let i = 1; i <= 5; ++i) {
  //   let nodeChecked = document.getElementById(i+'-'+colNum).getAttribute("data-checked");
  //   if(nodeChecked == "true" && rowNum != i)
  //     res = true;
  // }

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
 */
function addOpenString(colNum) {
  document.getElementById("string-"+colNum).innerHTML= 'O';
}


/**
 * Event for adding a finger down onto a string.
 */
function toggleClick(el) {
  let isChecked = el.getAttribute('data-checked');
  let colNum = el.id.split('-')[1];

  if(!colToggled(el)) {
     isChecked == "false" ?  isChecked = "true" :  isChecked = "false"

    if(isChecked == "true") {
      el.style.backgroundColor = "black";
      removeOpenString(colNum);
    } else {
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

  isChecked == "false" ?  isChecked = "true" :  isChecked = "false"

  el.innerHTML = ( isChecked == "true" ? "X" : "O");

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
    if(upToString >= 4) {
      document.getElementById("barreGraphic").classList.add("barre-overlay-"+upToString);

      // Remove open chords
      for(let i = 7-upToString; i <= 6; ++i) {
        removeOpenString(i);
      }
    }

  }
  else {
    // We have to remove the barre graphic
    for(let i = 4; i <= 6; ++i) {
      document.getElementById("barreGraphic").classList.remove("barre-overlay-"+i);
    }

    // Add back open chords
    for(let i = 1; i <= 6; ++i) {
      addOpenString(i);
    }
  }
}
