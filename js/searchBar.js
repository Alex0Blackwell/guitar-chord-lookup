/**
 * Filtering algorithm for finding chords.
 */
function filterFunction() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("searchInput");
  filter = input.value.toUpperCase();
  div = document.getElementById("allChords");

  if(filter) {
    div.style.display = "block";

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
  else {
    div.style.display = "none";
  }
}
