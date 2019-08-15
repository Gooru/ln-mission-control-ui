export function numberFormatWithTextSuffix(value: number) {
  return Number(value) >= 1.0e+9 ?
    `${trimDigits((Number(value) / 1.0e+9))}B` :
    Math.round(Number(value)) >= 1.0e+6 ?
      `${trimDigits((Number(value) / 1.0e+6))}M` :
      Math.round(Number(value)) >= 1.0e+3 ?
        `${trimDigits((Number(value) / 1.0e+3))}K` :
        value;
}

function trimDigits(value: number) {
  const newVal = value.toString().substring(0, 4);
  if (newVal.indexOf('.') === 3) {
    return newVal.substring(0, 3);
  }
  return newVal;
}

export function numberFormat(value: number, langCode: string = 'en-US') {
  return new Intl.NumberFormat(langCode).format(value);
}
