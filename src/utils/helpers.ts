export function normalizeFormValues(values: any) {
  const copy = {...values};

  for (let key in copy) {
    if (copy[key] === '') {
      delete copy[key]
    }
    if (copy[key] === undefined) {
      delete copy[key]
    }
    if (copy[key] === null) {
      delete copy[key]
    }
    if (Array.isArray(copy[key]) && copy[key].length === 0) {
      delete copy[key]
    }

    if (copy[key] instanceof Object && Object.keys(copy[key]).length === 0) {
      delete copy[key]
    }

  }
  return copy;
};

export function sorter(a: any, b: any) {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
};

