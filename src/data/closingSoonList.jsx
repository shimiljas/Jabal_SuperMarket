/* eslint-disable max-len */
const cars = require('./car-list.json');

// const makeID = (length) => {
//   let result = '';
//   const characters = 'AB CDE FG HIJ KLMNO PQR STUVWX YZab cdefgh ijklmno pqrstuvwx yz0123 45 67 89';
//   const charactersLength = characters.length;
//   for (let i = 0; i < length; i += 1) {
//     result += characters.charAt(Math.floor(Math.random() * charactersLength));
//   }
//   return result;
// };

const closingSoon = (number) => {
  const responseJSon = [];
  for (let iterator = 0; iterator < number; iterator += 1) {
    const randomBrandSelector = Math.floor(Math.random() * Math.floor(cars.length));
    const selectedBrand = cars[randomBrandSelector];
    if (selectedBrand && selectedBrand.brand && selectedBrand.models) {
      const models = selectedBrand.models && Array.isArray(selectedBrand.models) && selectedBrand.models.length > 0 ? selectedBrand.models : null;
      if (models) {
        const randomModelSelector = Math.floor(Math.random() * Math.floor(models.length));
        const car = {
          imageSrc: 'https://loremflickr.com/200/200/car',
          head: `${selectedBrand.brand} ${models[randomModelSelector]}`,
          participants: Math.floor(Math.random() * 100),
          closingDate: `2019-${Math.floor(Math.random() * 5) + 7}-${Math.floor(Math.random() * 30)}`,
          body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur pulvinar nibh viverra elit vulputate, vitae laoreet lacus feugiat. Nam tempus felis ligula, sed pharetra felis interdum sed. Integer sed consectetur.',
        };
        responseJSon.push(car);
      }
    }
  }
  return responseJSon;
};

export default closingSoon;
