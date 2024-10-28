const isEmpty = (value: string | any[] | null | undefined) => {
  if (value === null || value === undefined || value.length === 0 || value === '' || value === 'NULL' || value === 'undefined') {
    return true
  }
  return false
}

const stringCut = (value: string) => {
  if (!isEmpty(value) && value.length > 45) {
    return value.substring(0, 45) + "...";
  }
  return value;
}

export {
  isEmpty,
  stringCut
};