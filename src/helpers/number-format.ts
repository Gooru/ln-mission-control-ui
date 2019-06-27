)export function numberFormatWithTextSuffix(value: number) {
  const val = Math.round(Math.abs(Number(value)));
  return val >= 1.0e+9 ?
    `${(val / 1.0e+9)} B` : val >= 1.0e+6 ?
    `${(val / 1.0e+6)} M` : val >= 1.0e+3 ?
    `${(val / 1.0e+3)} K` : '';
}
