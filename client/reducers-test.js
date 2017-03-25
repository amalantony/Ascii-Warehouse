import expect from 'expect';

import {
    LOAD_PRODUCTS, 
    FETCH_PRODUCTS_REQUEST, 
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
    CHANGE_PRODUCTS_FILTER,
    FETCH_AD_REQUEST,
    FETCH_AD_FAILURE,
    FETCH_AD_SUCCESS } from './actions.js';

import { products, ads, changeFilter } from './reducers.js';

/* 
* TODO: Account for how the value of running count will change
*/
expect(products({
    isFetching: false,
    items: [{foo: 'baz'}],
    prefetchedItems: [{joo: 'jaz'}],
    runningCount: 0
}, { 
    type: LOAD_PRODUCTS
})).toEqual({
    isFetching: false,
    items: [{foo: 'baz'}, {joo: 'jaz'}],
    prefetchedItems: [],
    runningCount: 0
});

expect(products({
    isFetching: false,
    items: [{foo: 'baz'}],
    prefetchedItems: []
}, {
    type: FETCH_PRODUCTS_REQUEST
})).toEqual({
    isFetching: true,
    items: [{foo: 'baz'}],
    prefetchedItems: []
});

expect(products({
    isFetching: true,
    items: [{foo: 'baz'}],
    prefetchedItems: []
}, {
    type: FETCH_PRODUCTS_SUCCESS, 
    items: [{joo: 'jaz'}]
})).toEqual({
    isFetching: false,
    items: [{foo: 'baz'}],
    prefetchedItems: [{joo: 'jaz'}]
});

/*
*   TODO: Update the test with the error assignment with the error passed on failure to fetch
*/
expect(products({
    isFetching: true,
    items: [{foo: 'baz'}],
    prefetchedItems: []
}, {
    type: FETCH_PRODUCTS_FAILURE
})).toEqual({
    isFetching: false,
    items: [{foo: 'baz'}],
    prefetchedItems: []
});

console.log("Reducers test passed!");