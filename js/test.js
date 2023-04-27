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

alignLeftButton.addEventListener('click', () => applyAlign('left'));
alignCenterButton.addEventListener('click', () => applyAlign('center'));
alignRightButton.addEventListener('click', () => applyAlign('right'));
fontSizeUpButton.addEventListener('click', () => changeFontSize(1));
fontSizeDownButton.addEventListener('click', () => changeFontSize(-1));
setFontSizeButton.addEventListener('click', () => setFontSize());

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
