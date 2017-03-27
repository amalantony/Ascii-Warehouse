export const LOAD_PRODUCTS = "LOAD_PRODUCTS";
export const loadProducts = () => {
  return {
    type: LOAD_PRODUCTS
  };
};

export const FETCH_PRODUCTS_REQUEST = "FETCH_PRODUCTS_REQUEST";
export const fetchProductsRequest = (filter, initialLoad = false) => {
  return {
    type: FETCH_PRODUCTS_REQUEST,
    filter,
    initialLoad
  };
};

export const FETCH_PRODUCTS_FAILURE = "FETCH_PRODUCTS_FAILURE";
export const fetchProductsFailure = error => {
  return {
    type: FETCH_PRODUCTS_FAILURE,
    error
  };
};

export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const fetchProductsSuccess = (items, initialLoad) => {
  return {
    type: FETCH_PRODUCTS_SUCCESS,
    items,
    initialLoad
  };
};

export const CHANGE_PRODUCTS_FILTER = "CHANGE_PRODUCTS_FILTER";
export const changeProductsFilter = () => {
  return {
    type: CHANGE_PRODUCTS_FILTER
  };
};

export const CATALOG_END = "CATALOG_END";
export const catalogEnd = () => {
  return {
    type: CATALOG_END
  };
};

export const FETCH_AD_REQUEST = "FETCH_AD_REQUEST";
export const fetchAdRequest = () => {
  return {
    type: FETCH_AD_REQUEST
  };
};

export const FETCH_AD_FAILURE = "FETCH_AD_FAILURE";
export const fetchAdFailure = () => {
  return {
    type: FETCH_AD_FAILURE
  };
};

export const FETCH_AD_SUCCESS = "FETCH_AD_SUCCESS";
export const fetchAdSuccess = () => {
  return {
    type: FETCH_AD_SUCCESS
  };
};
