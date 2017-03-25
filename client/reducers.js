import {
    LOAD_PRODUCTS, 
    FETCH_PRODUCTS_REQUEST, 
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
    CHANGE_PRODUCTS_FILTER,
    FETCH_AD_REQUEST,
    FETCH_AD_FAILURE,
    FETCH_AD_SUCCESS } from './actions.js';

export const products = (state = {
    isFetching: false,
    items: [],
    prefetchedItems: [],
    runningCount: 0
}, action) => {
    switch(action.type) {
        case LOAD_PRODUCTS:
        /*
        *   TODO: LOAD_PRODUCTS must load ads too!
        */
            return Object.assign({}, state, {
                items: [...state.items, ...state.prefetchedItems],
                prefetchedItems: []
            });

        case FETCH_PRODUCTS_REQUEST:
            return Object.assign({}, state, {isFetching: true});

        case FETCH_PRODUCTS_FAILURE:
        /*
        * TODO: show the approriate error (perhaps have a property on state)
        */
            return Object.assign({}, state, {isFetching: false});

        case FETCH_PRODUCTS_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                prefetchedItems: action.items
            });

        default:
            return state;
    }
};

export const ads = (state = {
    previousAdId: 0,
    items: []
}, action) => {

};

export const changeFilter = (state = "id", action) => {

};