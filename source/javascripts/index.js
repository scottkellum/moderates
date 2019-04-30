
document.addEventListener("DOMContentLoaded", function() {
  var uuid = uuidv4();

  $('#quiz-container').on("submit", function(event) {
    event.preventDefault();

    var $form = $(this);

    var connected = 0;
    var energetic = 0;
    var exploring = 0;
    var result = 'Exploring';

    var answers = $form.serializeArray()

    for (var i = 0; i < answers.length; i++) {
      var answer = answers[i];

      if (['result', 'id'].includes(answer.name)) {
        continue;
      }

      var breakdown = answer.value.split(',');

      connected += Number.parseInt(breakdown[0]);
      energetic += Number.parseInt(breakdown[1]);
      exploring += Number.parseInt(breakdown[2]);
    };

    if (connected > energetic && connected > exploring) {
      result = 'Connected';
    } else if (energetic > connected && energetic > exploring) {
      result = 'Energetic';
    }

    document.querySelector("#anonymous-result").value = result;
    document.querySelector("#anonymous-id").value = uuid;
    document.querySelector("#result-container").classList.remove('hide');
    document.querySelector("#result").innerText = result;
    document.querySelector("#quiz-result").value = result + ` ${connected}, ${energetic}, ${exploring}`;
    document.querySelector("#quiz-id").value = uuid;
    document.querySelector("#result-description").innerText = result;

    var data = $form.serialize();

    $.post($form.attr("action"), data).then(function() {
      console.log("Form Submitted!");
    });
  });


  $("#result-container").on('submit', function(event) {
    event.preventDefault();

    var $form = $(this);
    var data = $form.serialize();

    $.post($form.attr("action"), data).then(function() {
      console.log("Contact Info Submitted!");
      window.location.reload(true);
    });
  });
});

function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
}