import {TextStyle} from 'react-native';

export const font = (
  fontSize: number,
  lineHeight?: number | null,
  fontWeight: TextStyle['fontWeight'] = 'normal',
  italic?: boolean,
  letterSpacing?: number,
) => {
  const style: TextStyle = {
    fontSize,
  };

  if (fontWeight !== '400') style.fontWeight = fontWeight;
  if (lineHeight) style.lineHeight = lineHeight;
  if (italic) style.fontStyle = 'italic';
  if (letterSpacing) style.letterSpacing = letterSpacing * fontSize;

  return style;
};
