document.addEventListener("DOMContentLoaded", function() {
  var form = document.querySelector("form");
  var resultContainerElement = document.querySelector("#result-container");
  var resultElement = document.querySelector("#result");
  var resultDescriptionElement = document.querySelector("#result-description");

  var inputs = document.querySelectorAll('input');

  form.addEventListener("submit", function(event) {
    event.preventDefault();

    var connected = 0;
    var energetic = 0;
    var exploring = 0;
    var result = 'Exploring';

    var data = new FormData(form);
    var output = "";
    for (const entry of data) {
      var breakdown = entry[1].split(',');
      connected = connected + Number.parseInt(breakdown[0]);
      energetic = energetic + Number.parseInt(breakdown[1]);
      exploring = exploring + Number.parseInt(breakdown[2]);
    };

    if (connected > energetic && connected > exploring) {
      result = 'Connected';
    } else if (energetic > connected && energetic > exploring) {
      result = 'Energetic';
    }

    // result.innerText = result + ` ${connected}, ${energetic}, ${exploring}`;
    resultContainerElement.classList.remove('hide');
    resultElement.innerText = result;
    resultDescriptionElement.innerText = result;

    var $form = $(this);

    $.post($form.attr("action"), $form.serialize()).then(function() {
      alert("Thank you!");
    });
  }, false);


  var submitContactInfoElement = document.querySelector("#submit-contact-info");
});


