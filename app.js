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

// コピーした要素を格納する
let duplicationValue = null;

// context menu
const contextMenuElm = document.getElementById('context-menu');
const target = document.getElementById('body');

// コンテキストメニューを表示する
drawArea.addEventListener('contextmenu', (event) => {
  event.preventDefault();
  // メニューを表示
  const menu = document.getElementById('context-menu');
  menu.style.top = event.clientY + 'px';
  menu.style.left = event.clientX + 'px';
  menu.style.display = 'block';
});

// titleボックスの生成
const addBox = (event, title = 'Title') => {
  const box = document.createElement('input');
  box.setAttribute('id', `box-${++count}`);
  box.setAttribute('type', 'text');
  box.setAttribute('value', title);
  box.setAttribute('onKeyDown', 'onKeyDown(this)');
  box.setAttribute('onMouseDown', 'mouseDown(this)')
  box.setAttribute('onMouseMove', 'mouseMove(event)');
  box.setAttribute('onMouseUp', 'mouseUp()');
  box.setAttribute('onMouseOver', 'mouseOver()');

  document.body.insertBefore(box, drawArea);
}

// ペースト生成
const pasteBox = () => {
  const box = document.createElement('input');
  box.setAttribute('id', `box-${++count}`);
  box.setAttribute('type', 'text');
  box.setAttribute('value', duplicationValue);
  box.setAttribute('onKeyDown', 'onKeyDown(this)');
  box.setAttribute('onMouseDown', 'mouseDown(this)')
  box.setAttribute('onMouseMove', 'mouseMove(event)');
  box.setAttribute('onMouseUp', 'mouseUp()');
  box.setAttribute('onMouseOver', 'mouseOver()');
  console.log(event.clientX);

  document.body.insertBefore(box, drawArea);
  box.style.top = event.clientY;
  box.style.left = event.clientX

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

const mouseOver = () => {
  isDragging = false;
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


// 選択中の要素を削除する
const deleteElm = () => {
  targetElm.remove();
  contextMenuElm.style.display = 'none';
}

// 選択中の要素をコピーする
const copyElm = () => {
  // 要素独自の値を取得しておく
  duplicationValue = targetElm.value;
  contextMenuElm.style.display = 'none';
}

// コピーした要素をペーストする
const pasteElm = () => {
  // 要素がコピーされている時のみ実行
  if (duplicationValue) {
    console.log('pasteElm');
    pasteBox();
  }
  if (duplication) {
    document.body.insertBefore(duplication, drawArea);
  }
  contextMenuElm.style.display = 'none';
}

// 選択した要素をカットする
const cutElm = () => {
  duplication = targetElm;
  targetElm.remove();
  contextMenuElm.style.display = 'none';
}

// elements-area
const btnRectangle = document.getElementById('rectangle');
btnRectangle.addEventListener('mousedown', addBox);