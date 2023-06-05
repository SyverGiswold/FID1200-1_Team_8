import { lastSelectionRange } from '../textEditor.js';

export function applyTextDecoration(decorationType) {
  if (lastSelectionRange !== null) {
    const range = lastSelectionRange;
    const parentElement = range.commonAncestorContainer.parentElement;
    const isAlreadyDecorated = parentElement.tagName === 'SPAN' && parentElement.style.textDecoration === decorationType;
    const selectedText = range.toString();

    if (isAlreadyDecorated) {
      const span = parentElement;
      const textNode = document.createTextNode(selectedText);
      span.parentNode.replaceChild(textNode, span);
    } else {
      const span = document.createElement('span');
      span.style.textDecoration = decorationType;

      range.deleteContents();
      range.insertNode(span);
      span.appendChild(document.createTextNode(selectedText));
    }
  }
}
