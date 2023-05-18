import { applyAlign } from "./module/align.js";
import { getFontSize } from "./module/styleSelect.js";
import { updateStyleSelectValue } from "./module/styleSelect.js";
import { insertImage } from "./module/insertImage.js";
import { changeFontFamily } from "./module/changeFontFamily.js";
import { changeFontSize } from "./module/changeFontSize.js";
import { setFontSize } from "./module/changeFontSize.js";
import { updateFontSizeInput } from "./module/changeFontSize.js";
import { applyTextDecoration } from "./module/applyTextDecoration.js";

const textEditor = document.querySelector('[contenteditable]');
const alignLeftButton = document.querySelector('#align-left');
const alignCenterButton = document.querySelector('#align-center');
const alignRightButton = document.querySelector('#align-right');
const alignJustifyButton = document.querySelector('#align-justify');
const fontSizeUpButton = document.querySelector('#font-size-up');
const fontSizeDownButton = document.querySelector('#font-size-down');
const fontSize = document.querySelector('#font-size');
const formatBold = document.querySelector('#format-bold');
const formatItalic = document.querySelector('#format-italic');
const formatUnderline = document.querySelector('#format-underline');
const formatStrikethrough = document.querySelector('#format-strikethrough');
const fontSelect = document.querySelector('#font-select');
const addLink = document.querySelector('#add-link');
const addImage = document.querySelector('#add-image');
const fileInput = document.createElement('input');
fileInput.type = 'file';
const styleSelect = document.querySelector('#style-select');
const blackOverlay = document.querySelector('#black-overlay');
const blindMode = document.querySelector('#blind-mode');

// Ressurs for hvordan jeg formaterer avsnitt vert for seg https://javascript.info/selection-range
let lastSelectionRange = null;

export { lastSelectionRange }
export { fontSize }
export { styleSelect }

styleSelect.addEventListener('change', () => {
  if (lastSelectionRange !== null) {
    const lineStartNode = lastSelectionRange.startContainer.parentNode;
    const selectedStyle = styleSelect.value;
    lineStartNode.style.fontSize = getFontSize(selectedStyle);
  }
});

addImage.addEventListener('click', () => {
  fileInput.click();
});

fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  if (file && !fileInput.matches(':focus')) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const imageSrc = event.target.result;
      insertImage(imageSrc);

      fileInput.value = '';
    };
    reader.readAsDataURL(file);
  }
});

textEditor.addEventListener('keyup', (event) => {
  if (event.key === 'Backspace') {
    const firstDiv = textEditor.querySelector('div');
    if (firstDiv && firstDiv.textContent === '') {
      firstDiv.remove();
    }
  }
});

textEditor.addEventListener('input', () => {
  if (textEditor.children.length === 0 || textEditor.children[0].tagName !== 'DIV') {
    // Save current cursor position
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const cursorPosition = range.startOffset;

    // Move child nodes into new div
    const div = document.createElement('div');
    while (textEditor.firstChild) {
      div.appendChild(textEditor.firstChild);
    }
    textEditor.appendChild(div);

    // Restore cursor position
    if (!div.firstChild) {
      div.appendChild(document.createTextNode(''));
    }
    range.setStart(div.firstChild, cursorPosition);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
  }
});

alignLeftButton.addEventListener('click', () => applyAlign('left'));
alignCenterButton.addEventListener('click', () => applyAlign('center'));
alignRightButton.addEventListener('click', () => applyAlign('right'));
alignJustifyButton.addEventListener('click', () => applyAlign('justify'));
fontSizeUpButton.addEventListener('click', () => changeFontSize(1));
fontSizeDownButton.addEventListener('click', () => changeFontSize(-1));
formatUnderline.addEventListener('click', () => applyTextDecoration('underline'));
formatStrikethrough.addEventListener('click', () => applyTextDecoration('line-through'));
fontSelect.addEventListener('change', () => changeFontFamily(fontSelect));

formatBold.addEventListener('click', () => {
  if (lastSelectionRange !== null) {
    const lineStartNode = lastSelectionRange.startContainer.parentNode;
    lineStartNode.style.fontWeight = lineStartNode.style.fontWeight === 'bold' ? 'normal' : 'bold';
  }
});

formatItalic.addEventListener('click', () => {
  if (lastSelectionRange !== null) {
    const lineStartNode = lastSelectionRange.startContainer.parentNode;
    lineStartNode.style.fontStyle = lineStartNode.style.fontStyle === 'italic' ? 'normal' : 'italic';
  }
});


fontSize.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    setFontSize();
  }
});

textEditor.addEventListener('mouseup', () => {
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

textEditor.addEventListener('keyup', () => { 
  const selection = window.getSelection();
  if (selection.rangeCount > 0) {
    lastSelectionRange = selection.getRangeAt(0);
    updateStyleSelectValue();
  }
});

textEditor.addEventListener('mouseup', () => { 
  const selection = window.getSelection();
  if (selection.rangeCount > 0) {
    lastSelectionRange = selection.getRangeAt(0);
    updateStyleSelectValue();
  }
});

// Kun for brukertest
let isBlindModeOn = false;

blindMode.addEventListener('click', () => {
  isBlindModeOn = !isBlindModeOn;
  if (isBlindModeOn) {
    blackOverlay.style.backgroundColor = 'black';
  } else {
    blackOverlay.style.backgroundColor = '';
  }
});

changeFontFamily(fontSelect);
