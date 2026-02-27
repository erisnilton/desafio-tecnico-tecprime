export function removeUndefined<T extends object>(obj: Partial<T>): Partial<T> {
  const result: Partial<T> = {};
  for (const k in obj) {
    if (typeof obj[k] === 'undefined') continue;
    result[k] = obj[k];
  }
  return result;
}
