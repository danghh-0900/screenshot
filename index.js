document.onmousedown = startDrag;
document.onmouseup = endDrag;
document.onmousemove = expandDrag;
document.body.innerHTML += "<div id='dragger'></div>";
dragger = document.getElementById("dragger");
console.log(dragger);

var dragging = false,
  dragStart = {
    x: 0,
    y: 0
  },
  dragEnd = {
    x: 0,
    y: 0
  };

function startDrag(evt) {
  evt.preventDefault();
  dragging = true;
  dragStart.x = dragEnd.x = evt.clientX;
  dragStart.y = dragEnd.y = evt.clientY;
  updateDragger();
}

function expandDrag(evt) {
  if (!dragging) return;
  dragEnd.x = evt.clientX;
  dragEnd.y = evt.clientY;
  updateDragger();
}

function updateDragger() {
  dragger.classList.add('visible');
  var s = dragger.style;
  s.top = Math.min(dragStart.y, dragEnd.y) + 'px';
  s.left = Math.min(dragStart.x, dragEnd.x) + 'px';
  s.height = Math.abs(dragStart.y - dragEnd.y) + 'px';
  s.width = Math.abs(dragStart.x - dragEnd.x) + 'px';
}

function endDrag(evt) {
  dragging = false;
  dragger.classList.remove('visible');
  html2canvas(document.body, {
      width: Math.abs(dragStart.x - dragEnd.x),
      height: Math.abs(dragStart.y - dragEnd.y),
      x: Math.min(dragStart.x, dragEnd.x),
      y: Math.min(dragStart.y, dragEnd.y)
    })
    .then(function(canvas) {
      var link = document.createElement("a");
      link.setAttribute("id", "link")
      link.setAttribute('download', 'MintyPaper.png');
      link.setAttribute('src', canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
      link.click();
      console.log(canvas.toDataURL("image/png"));
    });
  dragStart.x = dragStart.y = dragEnd.x = dragEnd.y = 0;
}