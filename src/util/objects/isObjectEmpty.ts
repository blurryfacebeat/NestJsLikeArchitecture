export const isObjectEmpty = (object: object) => {
  let isEmpty = true;

  Object.keys(object).forEach(() => (isEmpty = false));

  return isEmpty;
};
