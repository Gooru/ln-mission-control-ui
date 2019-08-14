export function numberFormatWithTextSuffix(value: number) {
  return Number(value) >= 1.0e+9 ?
    `${(Number(value) / 1.0e+9).toFixed(2)}B` :
    Math.round(Number(value)) >= 1.0e+6 ?
      `${(Number(value) / 1.0e+6).toFixed(2)}M` :
      Math.round(Number(value)) >= 1.0e+3 ?
        `${(Number(value) / 1.0e+3).toFixed(2)}K` :
        value;
}

export function numberFormat(value: number, langCode: string = 'en-US') {
  return new Intl.NumberFormat(langCode).format(value);
}
