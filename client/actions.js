export const LOAD_PRODUCTS = "LOAD_PRODUCTS";
export const loadProducts = () => {
  return {
    type: LOAD_PRODUCTS
  };
};

export const FETCH_PRODUCTS_REQUEST = "FETCH_PRODUCTS_REQUEST";
export const fetchProductsRequest = (options, initialLoad = false) => {
  return {
    type: FETCH_PRODUCTS_REQUEST,
    options,
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
export const fetchProductsSuccess = (items, options, initialLoad) => {
  return {
    type: FETCH_PRODUCTS_SUCCESS,
    items,
    options: {
      sort: options.sort,
      skip: options.skip,
      limit: options.limit
    },
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

export const CREATE_AD = "CREATE_AD";
export const createAd = () => {
  return {
    type: CREATE_AD
  };
};
