export const groupBy = (array, key) => {
  return array.reduce((result, elem) => {
    (result[elem[key]] = result[elem[key]] || []).push(elem);
  }, {});
};