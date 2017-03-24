Design Goals: 

- Keep the app as functional & modular as possible (React components must be functional as far as possible)
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
    advertisement: {
        prevousAd: //id of the last Advertisement,
    },
    products:{ 
        //  list of all the products,
        //  count in multiples of 20 to display the Ad
    },
    fetchStatus: FETCH_ACIVE | FETCH_PAUSED | FETCH_SUCCESS | FETCH_ERROR
    activeFilter: SIZE | PRICE | ID,
    catalogStatus: ACTIVE | ENDED
}

Points to consider -> 
    - What about conflicts arising out of an ongoing optimistic fetch vs when a user scolls to bottom before the fetch is satisified?
    - How & who determines if the catalog has ended & if further fetches must be disabled? 
    - The fetch must probably not permanently be disabled though, since the server could have new products added in the meantime
    - Who decides the advertisement placement & which state variable will keep track of it? (probably as part of the props that the ProductGrid will pass onto it's child Component, the Product Row)