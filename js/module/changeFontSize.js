import { lastSelectionRange } from "../main.js";
import { fontSize } from "../main.js";

export function changeFontSize(size) {
  if (lastSelectionRange !== null) {
    const lineStartNode = lastSelectionRange.startContainer.parentNode;
    const currentFontSize = parseInt(window.getComputedStyle(lineStartNode).getPropertyValue('font-size'));
    const newFontSize = currentFontSize + size;
    lineStartNode.style.fontSize = `${newFontSize}px`;
    updateFontSizeInput();
  }
};

export function setFontSize() {
  if (lastSelectionRange !== null) {
    const lineStartNode = lastSelectionRange.startContainer.parentNode;
    lineStartNode.style.fontSize = `${fontSize.value}px`;
    updateFontSizeInput();
  }
};

export function updateFontSizeInput() {
  if (lastSelectionRange !== null) {
    const lineStartNode = lastSelectionRange.startContainer.parentNode;
    const currentFontSize = parseInt(window.getComputedStyle(lineStartNode).getPropertyValue('font-size'));
    fontSize.value = currentFontSize;
  }
};
