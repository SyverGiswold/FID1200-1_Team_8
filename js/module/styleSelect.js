import { lastSelectionRange, styleSelect } from '../textEditor.js';


// referanse til styleSelect variablen https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch
export function getFontSize(style) {
  switch (style) {
    case 'h1':
      return '48px';
    case 'h2':
      return '40px';
    case 'h3':
      return '33px';
    case 'h4':
      return '28px';
    case 'h5':
      return '23px';
    case 'h6':
      return '19px';
    case 'p':
    default:
      return '16px';
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