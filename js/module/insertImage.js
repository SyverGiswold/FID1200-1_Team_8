import { lastSelectionRange } from '../textEditor.js';


// bilde referanse https://stackoverflow.com/questions/43314912/upload-image-with-a-single-button-in-html
export function insertImage(src) {
  const img = document.createElement('img');
  img.src = src;
  img.style.maxWidth = '100%';

  const range = lastSelectionRange;

  if (range && range.startContainer && range.startContainer.parentNode) {
    const lineStartNode = range.startContainer.parentNode;
    lineStartNode.appendChild(img);

    // Test
    const images = lineStartNode.querySelectorAll('img');
    if (images.length > 0) {
      lineStartNode.style.display = 'inline-flex';
    } else {
      lineStartNode.style.display = '';
    }
  }
};
