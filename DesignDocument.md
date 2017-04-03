Design Goals: 
---------------
- Keep the app as functional & modular as possible (React components must be functional as far as possible) - what are the tradeoffs

- Explain why the choice was made for Redux (One directional state flow)

- Explain why Redux saga was picked

- One tradeoff : while generating ads, I'm simply generating a large number & hoping there is no collision


Component List: 
----------------
Continer componensts + presentational components

- TitleBar  
- ProductGrid
    - SortFilter
    - Product Row
        - Product
        - Advertisement 
    - FetchStatus ( Loading... | ~ End of Catalog ~ )
- PageBottomDetector (?)


State Object:
-----------------
{
    products: {
        items: [], //  list of all the products,
        prefetchedItems: [], // set of all prefetched results
        isFetching: true or false // used by UI to toggle loading or not,
        isCatalogEnd: true or false // used by UI to toggle showing of of catalog message
        queryParams: {
            sort: id | size | key  // sort items by
            skip:  // skip & limt for subsequent requests
            limit: 
        }
        
    },
    ads: [],  // value of 'r' for ads
}

Actions:
----------
    CHANGE_PRODUCT_FILTER {filter: 'SIZE'}
    
    LOAD_PRODUCTS (?) -> Load products & ads on page load & scoll

    // seperate events to decouple network requests from UI Events
    FETCH_PRODUCTS_REQUEST
    FETCH_PRODUCTS_FAILURE
    FETCH_PRODUCTS_SUCCESS

    CATALOG_END -> Dispatched when the request to server returned no results {end: true}

    CREATE_AD


Action Flow:
-------------
    FETCH_PRODUCTS_REQUEST -> FETCH_PRODUCTS_SUCCESS -> LOAD_PRODUCTS (on scroll to bottom)
    For an inital fetch LOAD_PRODUCTS immedately precedes FETCH_PRODUCT_SUCCESS

Reducers:
------------
    products
    ads


Tests
--------
Uses mocha and the expect assetion library. Tests are present under the test/ folder
mocha test


Setup
-------
npm install
webpack
npm test
