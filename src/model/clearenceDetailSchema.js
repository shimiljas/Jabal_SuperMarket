/* eslint-disable  */
export const clearenceDetailSchema = data => {
  const response = {};
  if (data) {
    const demandInfo = data;
    response.demandId =
      demandInfo && demandInfo.demandId ? demandInfo.demandId : null;
    response.location =
      demandInfo && demandInfo.location ? demandInfo.location : null;
    response.participants =
      demandInfo && demandInfo.participants ? demandInfo.participants : null;

    response.groupSize =
      demandInfo && demandInfo.groupSize ? demandInfo.groupSize : null;
    response.inventoryId =
      demandInfo && demandInfo.inventory ? demandInfo.inventory.id : null;
    response.brand =
      demandInfo && demandInfo.inventory ? demandInfo.inventory.brand : null;
    response.brandLogo =
      demandInfo && demandInfo.inventory
        ? demandInfo.inventory.brandLogo
        : null;
    response.petrol =
      demandInfo && demandInfo.inventory
        ? demandInfo.inventory.fuel.petrol
        : null;
    response.year =
      demandInfo && demandInfo.inventory ? demandInfo.inventory.year : null;
    response.model =
      demandInfo && demandInfo.inventory ? demandInfo.inventory.model : null;
    response.body =
      demandInfo && demandInfo.inventory ? demandInfo.inventory.body : null;
    response.bodyImage =
      demandInfo && demandInfo.inventory
        ? demandInfo.inventory.bodyImage
        : null;
    response.price =
      demandInfo && demandInfo.offerPrice ? demandInfo.offerPrice : null;
  }
  return response;
};

export const clearenceUserSchema = data =>
  data.leads.map(user => {
    const address = user && user.address ? user.address : null;
    const email = user && user.email ? user.email : null;
    const location = user && user.location ? user.location : null;
    const firstName =
      user && user.name && user.name.firstName ? user.name.firstName : null;
    const lastName =
      user && user.name && user.name.lastName ? user.name.lastName : null;
    const phoneNumber =
      user && user.phoneNumber && user.phoneNumber.number
        ? user.phoneNumber.number
        : null;
    const CountryCode =
      user && user.phoneNumber && user.phoneNumber.cc
        ? user.phoneNumber.cc
        : null;

    return {
      address,
      email,
      location,
      firstName,
      lastName,
      phoneNumber,
      CountryCode,
    };
  });
