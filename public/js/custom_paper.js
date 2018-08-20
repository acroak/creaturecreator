var path;
var stroke_color = 'black';
var canvasData = null;
var stroke_width = 5;


$('#red').click(function() {
  stroke_color = 'red';
});

$('#orange').click(function() {
  stroke_color = 'orange';
});

$('#yellow').click(function() {
  stroke_color = 'yellow';
});

$('#green').click(function() {
  stroke_color = 'green';
});

$('#blue').click(function() {
  stroke_color = 'blue';
});

$('#purple').click(function() {
  stroke_color = 'purple';
});

$('#pink').click(function() {
  stroke_color = 'hotpink';
});

$('#black').click(function() {
  stroke_color = 'black';
});

$('#white').click(function() {
  stroke_color = '#fffcff';
})

function onMouseDown(event) {
  path = new Path();
  path.strokeColor = stroke_color;
  path.strokeWidth = stroke_width;
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
  //share = $('input[name="share"]:checked').val();
  canvasData = project.exportSVG({ asString: true });
  console.log(canvasData);
  // post('/doodles/', { doodle: canvasData, share: share, user: id });
  console.log("The user id is:", id);
});

$('#clear-button').click(function() {
  project.clear();
});

$('#undo-button').click(function() {
  path.clear();
});

$('#width-increase').click(function() {
  stroke_width += 1;
  console.log('increased', stroke_width);
});

$('#width-decrease').click(function() {
  if (stroke_width <= 1) {
    stroke_width = 1;
  } else {
    stroke_width -= 1;
  }
  console.log('increased', stroke_width);
});

$('#reset-size').click(function() {
  stroke_width = 5;
});
