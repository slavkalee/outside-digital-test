export function getSuffix(count: number): string {
  const str = count + '';
  const firstChar = +str.charAt(0);
  const lastChar = +str.charAt(str.length - 1);
  let suffix: string;

  if (
    (lastChar === 2 && firstChar !== 1) ||
    (lastChar === 6 && firstChar !== 1) ||
    (lastChar === 8 && firstChar !== 1)
  ) {
    suffix = 'ой';
  } else if (lastChar === 3) {
    suffix = 'ий';
  } else {
    suffix = 'ый';
  }

  return `${count === 2 ? 'во' : 'в'} ${count}-${suffix} год`;
}


