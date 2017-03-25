import expect from 'expect';

import {
    loadProducts, 
    fetchProductsRequest, 
    fetchProductsSuccess,
    fetchProductsFailure,
    changeProductsFilter,
    fetchAdRequest,
    fetchAdFailure,
    fetchAdSuccess } from './actions.js';

expect(loadProducts()).toEqual({
    type: 'LOAD_PRODUCTS'
});

expect(fetchProductsRequest()).toEqual({
    type: 'FETCH_PRODUCTS_REQUEST'
});

expect(fetchProductsSuccess()).toEqual({
    type: 'FETCH_PRODUCTS_SUCCESS'
});

expect(fetchProductsFailure()).toEqual({
    type: 'FETCH_PRODUCTS_FAILURE'
});

expect(changeProductsFilter()).toEqual({
    type: 'CHANGE_PRODUCTS_FILTER'
});

expect(fetchAdRequest()).toEqual({
    type: 'FETCH_AD_REQUEST'
});

expect(fetchAdFailure()).toEqual({
    type: 'FETCH_AD_FAILURE'
});

expect(fetchAdSuccess()).toEqual({
    type: 'FETCH_AD_SUCCESS'
});

console.log("Actions tests passed!");