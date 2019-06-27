export function numberFormatWithTextSuffix(value: number) {
  return Number(value) >= 1.0e+9 ?
    `${Math.round(Number(value) / 1.0e+9)}B` :
    Math.round(Number(value)) >= 1.0e+6 ?
      `${Math.round(Number(value) / 1.0e+6)}M` :
      Math.round(Number(value)) >= 1.0e+3 ?
        `${Math.round(Number(value) / 1.0e+3)}K` :
        value;
}
