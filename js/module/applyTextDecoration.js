import { lastSelectionRange } from '../main.js';

export function applyTextDecoration(decorationType) {
  if (lastSelectionRange !== null) {
    const lineStartNode = lastSelectionRange.startContainer.parentNode;
    const textDecoration = lineStartNode.style.textDecoration;

    if (textDecoration.includes(decorationType)) {
      lineStartNode.style.textDecoration = textDecoration.replace(decorationType, '').trim();
    } else {
      lineStartNode.style.textDecoration += ` ${decorationType}`;
    }
  }
};
