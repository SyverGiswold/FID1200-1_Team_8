const textEditor = document.querySelector('[contenteditable]');
const alignLeftButton = document.querySelector('#align-left');
const alignCenterButton = document.querySelector('#align-center');
const alignRightButton = document.querySelector('#align-right');
const fontSizeUpButton = document.querySelector('#font-size-up');
const fontSizeDownButton = document.querySelector('#font-size-down');
const setFontSizeButton = document.querySelector('#set-font-size-button');
const fontSize = document.querySelector('#font-size');
const blackOverlay = document.querySelector('#black-overlay');
const blindMode = document.querySelector('#blind-mode');

let lastSelectionRange = null;

alignLeftButton.addEventListener('click', () => applyAlign('left'));
alignCenterButton.addEventListener('click', () => applyAlign('center'));
alignRightButton.addEventListener('click', () => applyAlign('right'));
fontSizeUpButton.addEventListener('click', () => changeFontSize(1));
fontSizeDownButton.addEventListener('click', () => changeFontSize(-1));
setFontSizeButton.addEventListener('click', () => setFontSize());

textEditor.addEventListener('mouseup', () => {
  const selection = window.getSelection();
  if (selection.rangeCount > 0) {
    lastSelectionRange = selection.getRangeAt(0);
    updateFontSizeInput();
  }
});

textEditor.addEventListener('keydown', () => {
  const selection = window.getSelection();
  if (selection.rangeCount > 0) {
    lastSelectionRange = selection.getRangeAt(0);
    updateFontSizeInput();
  }
});

textEditor.addEventListener('keyup', () => {
  const selection = window.getSelection();
  if (selection.rangeCount > 0) {
    lastSelectionRange = selection.getRangeAt(0);
    updateFontSizeInput();
  }
});

let isBlindModeOn = false;
blindMode.addEventListener('click', () => {
  isBlindModeOn = !isBlindModeOn;
  if (isBlindModeOn) {
    blackOverlay.style.backgroundColor = 'black';
  } else {
    blackOverlay.style.backgroundColor = '';
  }
});

function applyAlign(align) {
  if (lastSelectionRange !== null) {
    const lineStartNode = lastSelectionRange.startContainer.parentNode;
    lineStartNode.style.textAlign = align;
  }
};

function changeFontSize(size) {
  if (lastSelectionRange !== null) {
    const lineStartNode = lastSelectionRange.startContainer.parentNode;
    const currentFontSize = parseInt(window.getComputedStyle(lineStartNode).getPropertyValue('font-size'));
    const newFontSize = currentFontSize + size;
    lineStartNode.style.fontSize = `${newFontSize}px`;
    updateFontSizeInput();
  }
};

function setFontSize() {
  if (lastSelectionRange !== null) {
    const lineStartNode = lastSelectionRange.startContainer.parentNode;
    lineStartNode.style.fontSize = `${fontSize.value}px`;
    updateFontSizeInput();
  }
};

function updateFontSizeInput() {
  if (lastSelectionRange !== null) {
    const lineStartNode = lastSelectionRange.startContainer.parentNode;
    const currentFontSize = parseInt(window.getComputedStyle(lineStartNode).getPropertyValue('font-size'));
    fontSize.value = currentFontSize;
  }
};

textEditor.addEventListener('drop', (event) => {
  event.preventDefault();
  
  const files = event.dataTransfer.files;
  if (files.length === 0) {
    return;
  }
  
  const reader = new FileReader();
  reader.onload = (event) => {
    const imageSrc = event.target.result;
    const img = document.createElement('img');
    img.src = imageSrc;
    img.style.maxWidth = '100%';
    img.style.pointerEvents = 'none';
    
    // Insert the image into the editor at the current selection
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      range.insertNode(img);
    }
  };
  
  reader.readAsDataURL(files[0]);
});

textEditor.addEventListener('keydown', (e) => {
  if (e.key === '/') {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    const div = document.createElement('div');
    div.style.position = 'relative';
    div.style.top = rect.bottom + 'px';
    div.style.left = rect.left + 'px';
    div.style.width = '100px';
    div.style.height = '50px';
    div.style.backgroundColor = 'white';
    div.style.border = '1px solid black';
    div.innerHTML = '<p><a href="#" data-option="add-image">Add Image</a></p>';
    div.querySelector('a').addEventListener('click', (e) => {
      e.preventDefault();
      const img = document.createElement('img');
      img.setAttribute('src', 'https://placekitten.com/200/300');
      textEditor.appendChild(img);
      div.remove();
    });
    textEditor.appendChild(div);
  }
});