Design Goals: 

- Keep the app as functional & modular as possible (React components must be functional as far as possible) - what are the tradeoffs
- Using an external library to generate the scoll to bottom event (to keep code clean)

- Explain why the choice was made for Redux


- One tradeoff : while generating ads, I'm simply generating a large number & hoping there is no collision


Component List: 
------------------------
- TitleBar  
- ProductGrid
    - SortFilter
    - Product Row
        - Product
        - Advertisement 
    - FetchStatus ( Loading... | ~ End of Catalog ~ )
- PageBottomDetector (?)


State:
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
    adRefs: [],  // value of 'r' for ads
}

Actions:
    INITIALISE_APP -> First event, fetches the intial bunch of products to show on page load 

    CHANGE_PRODUCT_FILTER {filter: 'SIZE'}
    
    LOAD_PRODUCTS (?) -> Load products & ads on page load & scoll

    // seperate events to decouple network requests from UI Events
    FETCH_PRODUCTS_REQUEST
    FETCH_PRODUCTS_FAILURE
    FETCH_PRODUCTS_SUCCESS

    CATALOG_END -> Dispatched when the request to server returned no results {end: true}

    FETCH_AD_REQUEST
    FETCH_AD_FAILURE
    FETCH_AD_SUCCESS

Points to consider -> 
    - What about conflicts arising out of an ongoing optimistic fetch vs when a user scolls to bottom before the fetch is satisified?
            Look at the isFetching flag, if it's True, cancel any new FETCH_PRODUCTS_REQUEST
            If prefetch[] is not empty, cancel any new FETCH_PRODUCTS_REQUEST

    - How & who determines if the catalog has ended & if further fetches must be disabled? 
    - The fetch must probably not permanently be disabled though, since the server could have new products added in the meantime
    - Who decides the advertisement placement & which state variable will keep track of it? (probably as part of the props that the ProductGrid will pass onto it's child Component, the Product Row)

    Advanced Fetch -> When FETCH_PAUSED && Prefetched results are empty



- show loader on loading & fetch_products_request
- hide loader on fetch_products_success
- hide loader on catalog_end & show catalog_end