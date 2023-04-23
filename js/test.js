const textEditor = document.querySelector('[contenteditable]');
const alignLeftButton = document.querySelector('#align-left');
const alignCenterButton = document.querySelector('#align-center');
const alignRightButton = document.querySelector('#align-right');
const fontSizeUpButton = document.querySelector('#font-size-up');
const fontSizeDownButton = document.querySelector('#font-size-down');

alignLeftButton.addEventListener('click', applyAlignLeft);
alignCenterButton.addEventListener('click', applyAlignCenter);
alignRightButton.addEventListener('click', applyAlignRight);
fontSizeUpButton.addEventListener('click', applyFontSizeUp);
fontSizeDownButton.addEventListener('click', applyFontSizeDown);

function applyAlignLeft() {
  const selection = window.getSelection();
  if (selection.toString().length !== 0) {
    const range = selection.getRangeAt(0);
    const lineStartNode = range.startContainer.parentNode;
    lineStartNode.style.textAlign = 'left';
  }
}

function applyAlignCenter() {
  const selection = window.getSelection();
  if (selection.toString().length !== 0) {
    const range = selection.getRangeAt(0);
    const lineStartNode = range.startContainer.parentNode;
    lineStartNode.style.textAlign = 'center';
  }
}

function applyAlignRight() {
  const selection = window.getSelection();
  if (selection.toString().length !== 0) {
    const range = selection.getRangeAt(0);
    const lineStartNode = range.startContainer.parentNode;
    lineStartNode.style.textAlign = 'right';
  }
}

function applyFontSizeUp() {
  const selection = window.getSelection();
  if (selection.toString().length !== 0) {
    const range = selection.getRangeAt(0);
    const lineStartNode = range.startContainer.parentNode;
    const currentFontSize = parseInt(window.getComputedStyle(lineStartNode).getPropertyValue('font-size'));
    const newFontSize = currentFontSize + 1;
    lineStartNode.style.fontSize = `${newFontSize}px`;
  }
}

function applyFontSizeDown() {
  const selection = window.getSelection();
  if (selection.toString().length !== 0) {
    const range = selection.getRangeAt(0);
    const lineStartNode = range.startContainer.parentNode;
    const currentFontSize = parseInt(window.getComputedStyle(lineStartNode).getPropertyValue('font-size'));
    const newFontSize = currentFontSize - 1;
    lineStartNode.style.fontSize = `${newFontSize}px`;
  }
}
