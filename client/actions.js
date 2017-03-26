export const LOAD_PRODUCTS = "LOAD_PRODUCTS";
export const loadProducts = () => {
  return {
    type: "LOAD_PRODUCTS"
  };
};

export const FETCH_PRODUCTS_REQUEST = "FETCH_PRODUCTS_REQUEST";
export const fetchProductsRequest = () => {
  return {
    type: FETCH_PRODUCTS_REQUEST
  };
};

export const FETCH_PRODUCTS_FAILURE = "FETCH_PRODUCTS_FAILURE";
export const fetchProductsFailure = () => {
  return {
    type: FETCH_PRODUCTS_FAILURE
  };
};

export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const fetchProductsSuccess = () => {
  return {
    type: FETCH_PRODUCTS_SUCCESS
  };
};

export const CHANGE_PRODUCTS_FILTER = "CHANGE_PRODUCTS_FILTER";
export const changeProductsFilter = () => {
  return {
    type: CHANGE_PRODUCTS_FILTER
  };
};

export const CATALOG_END = "CATALOG_END";
export const catalogEnd = end => {
  return {
    type: CATALOG_END,
    end
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
