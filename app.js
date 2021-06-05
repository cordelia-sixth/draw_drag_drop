const drawArea = document.getElementById('draw-area');
let boxElm = null;

let count = 0;
let isDragging = false;
let startX = 0;
let startY = 0;
let diffX = 0;
let diffY = 0;
let endX = 0;
let endY = 0;

const addBox = () => {
  const box = document.createElement('div');
  box.setAttribute('id', `box-${++count}`);
  box.setAttribute('onMouseDown', 'mouseDown(this)')
  box.setAttribute('onMouseMove', 'mouseMove(event)');
  box.setAttribute('onMouseUp', 'mouseUp()');
  // box.setAttribute('draggable', 'true');
  box.innerText = 'Title';

  document.body.insertBefore(box, drawArea);
}

const mouseDown = (element) => {
  // マウスダウンされた要素を取得
  boxElm = element;
  isDragging = true;
}

const mouseMove = (event) => {
  // console.log(event);
  if (isDragging) {
    let x = event.clientX;
    let y = event.clientY;
    let width = boxElm.offsetWidth;
    let height = boxElm.offsetHeight;
    boxElm.style.top = (y-height/2) + "px";
    boxElm.style.left = (x-width/2) + "px";
  }
}

const mouseUp = () => {
  isDragging = false;
}

drawArea.addEventListener('mousedown', addBox, false);


/////////

const onMouseMove = (event) => {
  let x = event.clientX;
  let y = event.clientY;
  let width = boxElm.offsetWidth;
  let height = boxElm.offsetHeight;
  boxElm.style.top = (y-height/2) + "px";
  boxElm.style.left = (x-width/2) + "px";

}

if (boxElm !== null) {
  console.log('hello');

  boxElm.addEventListener('mousedown', event => {
    console.log('hello');
    isDragging = true;
  });

  boxElm.addEventListener('mousemove', event => {
    if (isDragging) {
      let x = event.clientX;
      let y = event.clientY;
      let width = boxElm.offsetWidth;
      let height = boxElm.offsetHeight;
      boxElm.style.top = (y-height/2) + "px";
      boxElm.style.left = (x-width/2) + "px";
    }
  });
  
  boxElm.addEventListener('mouseup', event => {
    isDragging = false;
    end.x = diff.x;
    end.y = diff.y;
  });
}