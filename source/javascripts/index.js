document.addEventListener("DOMContentLoaded", function() {
  var form = document.querySelector("form");
  var result = document.querySelector("#result");

  var inputs = document.querySelectorAll('input');

  form.addEventListener("submit", function(event) {
    event.preventDefault();

    var connected = 0;
    var energetic = 0;
    var exploring = 0;
    var r = 'Exploring';

    var data = new FormData(form);
    var output = "";
    for (const entry of data) {
      var breakdown = entry[1].split(',');
      connected = connected + Number.parseInt(breakdown[0]);
      energetic = energetic + Number.parseInt(breakdown[1]);
      exploring = exploring + Number.parseInt(breakdown[2]);
    };

    if (connected > energetic && connected > exploring) {
      r = 'Connected';
    } else if (energetic > connected && energetic > exploring) {
      r = 'Energetic';
    }

    result.innerText = r + ` ${connected}, ${energetic}, ${exploring}`;
  }, false);
});