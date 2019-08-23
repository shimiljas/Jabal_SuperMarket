/* eslint-disable no-restricted-syntax */
const cars = require('./car-list.json');

const carsList = (type) => {
  const itemsList = [];
  for (const item of cars) {
    if (type === 'brands' && item.brand) {
      itemsList.push(item.brand);
    } else if (item.models) {
      for (const model of item.models) {
        itemsList.push(`${item} ${model}`);
      }
    }
  }
  return itemsList;
};

export default carsList;
