/* eslint-disable max-len */
/* eslint-disable no-restricted-syntax */
const cars = require('./car-list.json');

const colors = ['White', 'Silver', 'Black', 'Grey', 'Blue', 'Red', 'Green', 'Brown', 'Others'];

const types = ['1.4L', '1.8L', '2.0L', '2.4L', '2.8L', '3.0L'];

const fuels = ['Petrol', 'Diesel', 'Electric'];

const makeID = (length) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const getInventory = (number) => {
  const responseJSon = [];
  for (let iterator = 0; iterator < number; iterator += 1) {
    const randomBrandSelector = Math.floor(Math.random() * Math.floor(cars.length));
    const selectedBrand = cars[randomBrandSelector];
    if (selectedBrand && selectedBrand.brand && selectedBrand.models) {
      const models = selectedBrand.models && Array.isArray(selectedBrand.models) && selectedBrand.models.length > 0 ? selectedBrand.models : null;
      if (models) {
        const randomModelSelector = Math.floor(Math.random() * Math.floor(models.length));
        const car = {
          manufacturer: selectedBrand.brand,
          model: models[randomModelSelector],
          color: colors[Math.floor(Math.random() * colors.length)],
          type: types[Math.floor(Math.random() * types.length)],
          fuel: fuels[Math.floor(Math.random() * fuels.length)],
          stock: Math.floor(Math.random() * 100),
          vin: makeID(5),
        };
        responseJSon.push(car);
      }
    }
  }
  return responseJSon;
};

export default getInventory;
