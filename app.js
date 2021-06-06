const drawArea = document.getElementById('draw-area');
let boxElm = null;

// コンテキストメニューの対象要素
let targetElm;

let count = 0;
let isDragging = false;
let startX = 0;
let startY = 0;
let diffX = 0;
let diffY = 0;
let endX = 0;
let endY = 0;

// context menu
const contextMenuElm = document.getElementById('context-menu');
const target = document.getElementById('body');

// titleボックスの生成
const addBox = () => {
  const box = document.createElement('input');
  box.setAttribute('id', `box-${++count}`);
  box.setAttribute('type', 'text');
  box.setAttribute('placeholder', 'Title');
  box.setAttribute('onKeyDown', 'onKeyDown(this)');
  box.setAttribute('onMouseDown', 'mouseDown(this)')
  box.setAttribute('onMouseMove', 'mouseMove(event)');
  box.setAttribute('onMouseUp', 'mouseUp()');


  document.body.insertBefore(box, drawArea);
}

// キーボードが押された時の処理
const onKeyDown = (element) => {
  if (event.key === 'Enter' || event.key === 'Escape') {
    // フォーカスを外す
    element.blur();
  }
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

// context menu
const contextMenu = (record, obsever) => {
  try {
    const addedElement = document.getElementById(record[0].addedNodes[0].id);

    addedElement.addEventListener('contextmenu', e => {
      e.preventDefault();
  
      console.log(e.target);
      targetElm = document.getElementById(e.target.id);
  
      // メニューを表示
      const menu = document.getElementById('context-menu');
      menu.style.top = e.clientY + 'px';
      menu.style.left = e.clientX + 'px';
      menu.style.display = 'block';
    });
  } catch (err) {
    return;
  }
}

// クリックしたらコンテキストメニューを消す
drawArea.addEventListener('mousedown', e => {
  contextMenuElm.style.display = 'none';
});

let mo = new MutationObserver(contextMenu);
mo.observe(target, {childList: true});


// delete
const deleteElm = () => {
  console.log('deleteEml');
  targetElm.remove();
  contextMenuElm.style.display = 'none';
}

drawArea.addEventListener('mousedown', addBox, false);
