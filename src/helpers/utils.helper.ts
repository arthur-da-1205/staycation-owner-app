export function paramsToObject(entries: any) {
  const results: any = {};

  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of entries) {
    results[key] = value;
  }

  return results;
}
