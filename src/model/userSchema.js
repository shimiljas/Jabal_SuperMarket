/* eslint-disable  */
export const userSchema = data => {
  const response = {};
  if (data) {
    const { user } = data;
    response.email = user && user.email ? user.email : null;
    response.location = user && user.coordindates ? user.coordindates : [];
    response.name = user && user.name ? user.name : {};
    response.phone = user && user.phoneNumber ? user.phoneNumber : {};
    response.token = user && user.token ? user.token : null;
    response.address = user && user.address ? user.address : null;
    response.zipCode = user && user.zipCode ? user.zipCode : null;
    response.parentCode = user && user.parentCode ? user.parentCode : null;
  }
  return response;
};

export const generalSchema = data => {
  const response = {};
  if (data) {
    const user = data;
    response.email = user && user.email ? user.email : null;
    response.location = user && user.coordindates ? user.coordindates : [];
    response.name = user && user.name ? user.name : {};
    response.phone = user && user.phoneNumber ? user.phoneNumber : {};
    response.address = user && user.address ? user.address : null;
    response.zipCode = user && user.zipCode ? user.zipCode : null;
    response.parentCode = user && user.parentCode ? user.parentCode : null;
  }
  return response;
};
