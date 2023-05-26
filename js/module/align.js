import { lastSelectionRange } from '../textEditor.js';

export function applyAlign(align) {
  if (lastSelectionRange !== null) {
    const lineStartNode = lastSelectionRange.startContainer.parentNode;
    lineStartNode.style.textAlign = align;
  }
};
