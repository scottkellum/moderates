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

    var data = {
      result: result,
      connected: connected,
      energetic: energetic,
      exploring: exploring,
      questionResults: {}
    };

    $(this).find("input").each(function(i, el) {
      if ($(el).is(':checked')) {
        data.questionResults[el.name] = el.value;
      }
    })

    $.post($form.attr("action"), $.param(data)).then(function() {
      alert("Thank you!");
    });
  }, false);


  $("#result-container").on('submit', function(event) {
    event.preventDefault();

    var $form = $(this);

    $(this).find("input").each(function(i, el) {
      var data = {
        contactInfo: el.value,
      };

      $.post($form.attr("action"), $.param(data)).then(function() {
        alert("Thank you!");
      });
    })
  });
});

