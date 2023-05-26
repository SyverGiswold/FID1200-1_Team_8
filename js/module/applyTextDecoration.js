import { lastSelectionRange } from '../textEditor.js';

export function applyTextDecoration(decorationType) {
 if (lastSelectionRange !== null) {
 const range = lastSelectionRange;

 // Check if the selected text is already decorated
 const parentElement = range.commonAncestorContainer.parentElement;
 const isAlreadyDecorated = parentElement.tagName === 'SPAN' && parentElement.style.textDecoration === decorationType;

 // Store the selected text content
 const selectedText = range.toString();

 if (isAlreadyDecorated) {
 // Unwrap the <span> element and restore the original text
 const span = parentElement;
 const textNode = document.createTextNode(selectedText);
 span.parentNode.replaceChild(textNode, span);
 } else {
 // Create a new span element
 const span = document.createElement('span');
 span.style.textDecoration = decorationType;

 // Surround the selected text with the new span element
 range.deleteContents();
 range.insertNode(span);
 span.appendChild(document.createTextNode(selectedText));
 }
 }
}
