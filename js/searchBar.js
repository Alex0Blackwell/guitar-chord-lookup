/**
 * Filtering algorithm for finding chords.
 */
function filterFunction() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  div = document.getElementById("myDropdown");
  a = div.getElementsByTagName("a");

  for (i = 0; i < a.length; i++) {
    txtValue = a[i].innerHTML.toUpperCase();
    let same = true;
    for(let j = 0; j < filter.length && same; ++j) {
      if(txtValue[j] != filter[j])
        same = false;
    }
    a[i].style.display = (same ? "" : "none");
  }
}
