const textEditor = document.querySelector('[contenteditable]');
const alignLeftButton = document.querySelector('#align-left');
const alignCenterButton = document.querySelector('#align-center');
const alignRightButton = document.querySelector('#align-right');
const fontSizeUpButton = document.querySelector('#font-size-up');
const fontSizeDownButton = document.querySelector('#font-size-down');
const setFontSizeButton = document.querySelector('#set-font-size-button');
const FontSize = document.querySelector('#font-size');

alignLeftButton.addEventListener('click', () => applyAlign('left'));
alignCenterButton.addEventListener('click', () => applyAlign('center'));
alignRightButton.addEventListener('click', () => applyAlign('right'));
fontSizeUpButton.addEventListener('click', () => applyFontSize(1));
fontSizeDownButton.addEventListener('click', () => applyFontSize(-1));
setFontSizeButton.addEventListener('click', () => setFontSize(setFontSize.value));

function applyAlign(align) {
  const selection = window.getSelection();
  if (selection.toString().length !== 0) {
    const range = selection.getRangeAt(0);
    const lineStartNode = range.startContainer.parentNode;
    lineStartNode.style.textAlign = align;
  }
}

function applyFontSize(size) {
  const selection = window.getSelection();
  if (selection.toString().length !== 0) {
    const range = selection.getRangeAt(0);
    const lineStartNode = range.startContainer.parentNode;
    const currentFontSize = parseInt(window.getComputedStyle(lineStartNode).getPropertyValue('font-size'));
    const newFontSize = currentFontSize + size;
    lineStartNode.style.fontSize = `${newFontSize}px`;
  }
}

function setFontSize() {
  const selection = window.getSelection();
  if (selection.toString().length !== 0) {
    const range = selection.getRangeAt(0);
    const lineStartNode = range.startContainer.parentNode;
    lineStartNode.style.fontSize = `${FontSize.value}px`;
  }
}