function colToggled(id) {
  let res = false;

  let rowNum = id.split('-')[0];
  let colNum = id.split('-')[1];

  for(let i = 1; i <= 5; ++i) {
    let nodeChecked = document.getElementById(i+'-'+colNum).getAttribute("data-checked");
    if(nodeChecked == "true" && rowNum != i)
      res = true;
  }

  return res;
}


function removeOpenString(id) {
  let colNum = id.split('-')[1];

  document.getElementById("string-"+colNum).innerHTML= '';
}

function addOpenString(id) {
  let colNum = id.split('-')[1];

  document.getElementById("string-"+colNum).innerHTML= 'O';
}


function toggleClick(el) {
  let isChecked = el.getAttribute('data-checked')

  if(!colToggled(el.id)) {
     isChecked == "false" ?  isChecked = "true" :  isChecked = "false"

    // el.style.backgroundColor = ( isChecked == "true" ? "black" : '');
    if(isChecked == "true") {
      el.style.backgroundColor = "black";
      removeOpenString(el.id);
    } else {
      el.style.backgroundColor = "";
      addOpenString(el.id);
    }

    el.setAttribute('data-checked',  isChecked)
  }
}


function toggleStringClosed(el) {
  let  isChecked = el.getAttribute('data-checked')

   isChecked == "false" ?  isChecked = "true" :  isChecked = "false"

  el.innerHTML = ( isChecked == "true" ? "X" : "O");

  el.setAttribute('data-checked',  isChecked)
}
