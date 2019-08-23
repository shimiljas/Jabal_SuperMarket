/* eslint-disable  */
import cache from 'memory-cache';
import store from 'store';

const BASE_URL = process.env.REACT_APP_API_ENDPOINT;

const DEFAULT_CACHE_TIME = 1000 * 60 * 5; // 5 minutes
const GENERIC_ERROR = 'Something went wrong. Please try again.';

let authToken = store.get('token');
export const setToken = t => {
  authToken = t;
  store.set('token', t);
};

export const clearToken = () => {
  authToken = null;
  store.remove('token');
};

const buildHeaders = () => {
  if (authToken) {
    return {};
  }

  return {};
};

const checkStatusForPublicEndPoints = response =>
  response
    .json()
    .then(json => {
      if (response.status >= 200 && response.status <= 300) {
        return Promise.resolve(json);
      }
      return Promise.reject(json.message || json[0].message || GENERIC_ERROR);
    })
    .catch(message => {
      if (response.status >= 200 && response.status <= 300) {
        return Promise.resolve({});
      }
      return Promise.reject(message || GENERIC_ERROR);
    });

const checkStatusAndParseJSON = response =>
  response
    .json()
    .then(json => {
      if (response.status === 401 && json.message === 'Unauthorized') {
        clearToken();
        window.location.reload();
      }

      if (response.status >= 200 && response.status <= 300) {
        return Promise.resolve(json);
      }

      if (response.status === 403 && json.message === 'Token-Expired') {
        /* eslint-disable no-use-before-define */

        return Promise.resolve(authorize()).then(() => {
          window.location.reload();
        });
      }
      return Promise.reject(json.message || json[0].message || GENERIC_ERROR);
    })
    .catch(message => {
      if (response.status >= 200 && response.status <= 300) {
        return Promise.resolve({});
      }

      return Promise.reject(message || GENERIC_ERROR);
    });

const bail = message => Promise.reject(GENERIC_ERROR || message);

const getAndCache = endpoint => {
  const cachedData = cache.get(endpoint);

  if (cachedData) {
    return Promise.resolve(cachedData);
  }
  console.log(`${BASE_URL}/${endpoint}`, 'url============<><>');

  return (
    fetch(`${BASE_URL}/${endpoint}`, {
      headers: {
        ...buildHeaders(),
      },
    })
      .catch(bail)
      // .then(checkContentType)
      .then(checkStatusAndParseJSON)
      .then(res => cache.put(endpoint, res, DEFAULT_CACHE_TIME))
  );
};

const getWithoutHeader = endpoint => {
  const cachedData = cache.get(endpoint);

  if (cachedData) {
    return Promise.resolve(cachedData);
  }

  return (
    fetch(`${BASE_URL}/${endpoint}`)
      .catch(bail)
      // .then(checkContentType)
      .then(checkStatusAndParseJSON)
      .then(res => cache.put(endpoint, res, DEFAULT_CACHE_TIME))
  );
};

//post method--------->>
const post = (endpoint, data) =>
  fetch(`${BASE_URL}/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...buildHeaders(),
    },
    body: JSON.stringify(data),
  })
    .catch(bail)
    .then(checkStatusAndParseJSON)
    .then(res => {
      cache.clear();
      return res;
    });

//put method---------->>

const put = (endpoint, data) =>
  fetch(`${BASE_URL}/${endpoint}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...buildHeaders(),
    },
    body: JSON.stringify(data),
  })
    .catch(bail)
    // .then(checkContentType)
    .then(checkStatusAndParseJSON)
    .then(res => {
      cache.clear();
      return res;
    });

//del method----------->>

const del = (endpoint, data) => {
  console.log(`${BASE_URL}/${endpoint}`);
  return (
    fetch(`${BASE_URL}/${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...buildHeaders(),
      },
      body: JSON.stringify(data),
    })
      // .then(checkContentType)
      .then(checkStatusAndParseJSON)
      .then(response => {
        cache.clear();
        return Promise.resolve(response);
      })
      .catch(bail)
  );
};

export const logIn = credentials => {
  console.log(BASE_URL);
  return (
    fetch(`${BASE_URL}/admin/login`, {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json',
        ...buildHeaders(),
      },
    })
      .catch(bail)
      // .then(checkContentType)
      .then(response => {
        console.log(response, 'responseresponseresponse');
        return Promise.resolve(response);
      })
      .then(checkStatusAndParseJSON)
  );
};

export const forgotPassword = params =>
  fetch(`${BASE_URL}/dealer/auth/forgot-pass/generate-token`, {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .catch(bail)
    .then(response => Promise.resolve(response))
    .then(checkStatusForPublicEndPoints);

export const getdashboard = () => getAndCache(`admin/get/all`);

export const searchBynumber = data => post('customer/sale/search', data);

export const submitsale = data => post('customer/sale/new', data);

export const getClosingDemand = page =>
  getAndCache(`dealer/demands?closingSoon=1&page=${page}`);

export const fetchingNewDemand = page =>
  getAndCache(`dealer/demands?page=${page}`);

export const fetchQuotedDemand = page =>
  getAndCache(`dealer/demands?quoted=1&page=${page}`);

export const fetchLeadedDemand = page =>
  getAndCache(`dealer/demands?assigned=1&page=${page}`);

export const updateGeneralInfo = credentials =>
  put('dealer/profile/me', credentials);

export const getGeneralInfo = () => getAndCache('dealer/profile/me');

export const quoteDemand = (demandId, params) =>
  put(`dealer/demand/${demandId}`, params);

export const unlockLeadDemad = demandId =>
  getAndCache(`dealer/demand/unlock/${demandId}`);

export const fetchInventory = page =>
  getAndCache(`dealer/inventory?page=${page}`);

export const uploadInventory = data => post('dealer/inventory', data);

export const fetchSoldInventory = page =>
  getAndCache(`dealer/inventory?page=${page}&solde=1`);

export const deleteInventory = InventoryId =>
  del(`dealer/inventory/${InventoryId}`);

export const soldInventory = data => put(`dealer/inventory`, data);

export const fetchDemandDetail = demandId =>
  getAndCache(`dealer/demand/info/${demandId}`);

export const createClearence = data => post(`dealer/clearances`, data);

export const getAllBrand = () => getAndCache('dealer/inventory/filter');
export const getAllModel = brand =>
  getAndCache(`dealer/inventory/filter?brand=${brand}`);

export const getAllTrim = (brand, model) =>
  getWithoutHeader(
    `consumer/inventory/brands?brand=${brand}&model=${model}&textOnly=1`,
  );

export const fetchAllClearence = page =>
  getAndCache(`dealer/clearances?page=${page}`);

export const fetchClearenceDetail = demandId =>
  getAndCache(`dealer/clearances/${demandId}`);

export const fetchAssignedClearence = page =>
  getAndCache(`dealer/clearances?assigned=1&page=${page}`);

export const fetchUnAssignedClearence = page =>
  getAndCache(`dealer/clearances?assigned=-1&page=${page}`);

export const filterInventory = (brand, model, trim) => {
  let url = `dealer/inventory?page=1&sold=-1&brand=${brand}`;
  if (model.length > 0) {
    url = url + `&model=${model}`;
  }
  if (trim.length > 0) {
    url = url + `&trim=${trim}`;
  }
  return getAndCache(url);
};

export const getallvin = () => getAndCache(`dealer/inventory/filter?vin=1`);

export const ViewPricingRule = (brand, model, trim, vin, all) => {
  console.log(brand, model, trim, vin, all);

  let url = `dealer/pricing-models?`;
  if (all) url = url + `all=${all}`;
  if (brand) url = url + `&brand=${brand}`;
  if (model) url = url + `&model=${model}`;
  if (trim) url = url + `&trim=${trim}`;
  if (vin) url = url + `&vin=${vin}`;
  console.log(url, '---------');

  return getAndCache(url);
};

export const createPricingByVin = data => post(`dealer/pricing-models`, data);

export const createNormalPricingModal = data =>
  post(`dealer/pricing-models`, data);

export const pricingModalupdate = data => put(`dealer/pricing-models`, data);

export const updateInventory = data => put(`dealer/inventory`, data);
