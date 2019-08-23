/* eslint-disable  */
export const demandDetailSchema = data => {
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
    response.maturityDate =
      demandInfo && demandInfo.maturityDate ? demandInfo.maturityDate : null;
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

    response.door = demandInfo && demandInfo.door ? demandInfo.door : null;
    response.quotes =
      demandInfo && demandInfo.quotes ? demandInfo.quotes : null;
    response.price =
      demandInfo && demandInfo.inventory
        ? demandInfo.inventory.price.actual
        : null;
  }
  return response;
};
