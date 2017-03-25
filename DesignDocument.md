Design Goals: 

- Keep the app as functional & modular as possible (React components must be functional as far as possible) - what are the tradeoffs
- Using an external library to generate the scoll to bottom event (to keep code clean)



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
        list: [], //  list of all the products,
        prefetch: [], // set of all prefetched results
        runningCount:  //  count in multiples of 20 to display the Ad
        isFetching: true or false // used by UI to toggle loading or not,
        lastUpdated: // timestamp
        advertisement: {
            previousAd: // id of the last shown Ad,
            isFetching: // status of the ad fetch
        }
    },
    activeFilter: SIZE | PRICE | ID
}

Actions: 
    LOAD_PRODUCTS (?) -> Load products on page load & scoll
    FETCH_PRODUCTS_REQUEST
    FETCH_PRODUCTS_FAILURE
    FETCH_PRODUCTS_SUCCESS
    CHANGE_PRODUCT_FILTER {filter: 'SIZE'}

    PREFETCH_PRODUCTS_DATA

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