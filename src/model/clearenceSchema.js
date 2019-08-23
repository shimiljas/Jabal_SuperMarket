/* eslint-disable  */
export const clearenceSchema = data =>
  data.map(demand => {
    const demandId = demand && demand.demandId ? demand.demandId : null;
    const location = demand && demand.location ? demand.location : null;
    const participants =
      demand && demand.participants ? demand.participants : null;

    const maturityDate =
      demand && demand.maturityDate ? demand.maturityDate : null;
    const groupSize = demand && demand.groupSize ? demand.groupSize : null;
    const inventoryId = demand && demand.inventory ? demand.inventory.id : null;
    const brand = demand && demand.inventory ? demand.inventory.brand : null;
    const brandLogo =
      demand && demand.inventory ? demand.inventory.brandLogo : null;
    const petrol =
      demand && demand.inventory ? demand.inventory.fuel.petrol : null;
    const year = demand && demand.inventory ? demand.inventory.year : null;
    const model = demand && demand.inventory ? demand.inventory.model : null;
    const body = demand && demand.inventory ? demand.inventory.body : null;
    const bodyImage =
      demand && demand.inventory ? demand.inventory.bodyImage : null;
    const price = demand && demand.offerPrice ? demand.offerPrice : null;
    const quotes = demand && demand.quotes ? demand.quotes : null;

    return {
      demandId,
      location,
      participants,
      groupSize,
      inventoryId,
      brand,
      brandLogo,
      petrol,
      year,
      model,
      body,
      bodyImage,
      price,
      quotes,
      maturityDate,
    };
  });
