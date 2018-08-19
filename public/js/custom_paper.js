var path;
var color = 'black';
var doodleData = null;
var width = 5;
var share = null;

function onMouseDown(event) {
  path = new Path();
  path.strokeColor = color;
  path.strokeWidth = width;
}

function onMouseDrag(event) {
  path.add(event.point);
}

function post(path, parameters) {
    var form = $('<form></form>');

    form.attr("method", "post");
    form.attr("action", path);

    $.each(parameters, function(key, value) {
        var field = $('<input></input>');

        field.attr("type", "hidden");
        field.attr("name", key);
        field.attr("value", value);

        form.append(field);
    });

    $(document.body).append(form);
    form.submit();
}

$('#save-button').click(function() {
  share = $('input[name="share"]:checked').val();
  doodleData = project.exportSVG({ asString: true });
  console.log(doodleData);
  post('/doodles/', { doodle: doodleData, share: share, user: id });
  console.log("The user id is:", id);
});

$('#clear-button').click(function() {
  project.clear();
});

$('#undo-button').click(function() {
  path.clear();
});

$('#red').click(function() {
  color = 'red';
});

$('#orange').click(function() {
  color = 'orange';
});

$('#yellow').click(function() {
  color = 'yellow';
});

$('#green').click(function() {
  color = 'green';
});

$('#blue').click(function() {
  color = 'blue';
});

$('#purple').click(function() {
  color = 'purple';
});

$('#pink').click(function() {
  color = 'hotpink';
});

$('#black').click(function() {
  color = 'black';
});

$('#white').click(function() {
  color = '#fffcff';
})

$('#incr-size').click(function() {
  width+=2;
});

$('#decr-size').click(function() {
  if (width <= 1) {
    width = 1;
  } else {
    width-=2;
  }
});

$('#reset-size').click(function() {
  width = 5;
});
