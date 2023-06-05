import { lastSelectionRange, styleSelect } from '../textEditor.js';


// referanse til styleSelect variablen https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch
export function getFontSize(style) {
  switch (style) {
    case 'h1':
      return '3rem';
    case 'h2':
      return '2.5rem';
    case 'h3':
      return '2.0625rem';
    case 'h4':
      return '1.75rem';
    case 'h5':
      return '1.4375rem';
    case 'h6':
      return '1.1875rem';
    case 'p':
    default:
      return '1rem';
  }
};

export function updateStyleSelectValue() {
  if (lastSelectionRange !== null) {
    const lineStartNode = lastSelectionRange.startContainer.parentNode;
    const currentFontSize = parseInt(window.getComputedStyle(lineStartNode).getPropertyValue('font-size'));

    const options = styleSelect.options;
    for (let i = 0; i < options.length; i++) {
      const optionFontSize = parseInt(getFontSize(options[i].value));
      if (optionFontSize === currentFontSize) {
        styleSelect.value = options[i].value;
        break;
      }
    }
  }
}