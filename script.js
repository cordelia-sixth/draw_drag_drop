const drawArea = document.getElementById('draw-area');
let boxElm = null;

const addBox = (e) => {
  const box = document.createElement('div');
  box.setAttribute('id', 'box');
  box.setAttribute('onclick', 'move(this)');
  box.innerText = 'Title';

  document.body.insertBefore(box, drawArea);
  boxElm = document.getElementById('box');
}

const move = (e) => {
  e.addEventListener('mousedown', (e) => {
    e.innerText = 'hello';
  }, false)}

drawArea.addEventListener('mousedown', addBox, false);