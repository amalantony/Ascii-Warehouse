Code Organisation
----------------
The client side Javascript code is located in the `client/` folder, the tests are in the `test/` folder. Webpack bundles all client code to a single js file `bundle.js` file in the `static/js` directory and this file is included in `index.html`.


Design Decisions: 
---------------
- The app was designed to be as functional as possible. Most react components that susbscribe to the Redux store are generated through the connect method of the `react-redux` library. Only the `ProductGrid` component has been created as a Class since it makes use of the React life-cycle methods.

- `Redux` was chosen for the application state management. The choice was made since Redux provides a convinient one directional data flow model that makes the application state easy to reason about.

- `redux-saga` was picked as the library to dispatch async Redux actions (server queries). Since Redux saga is based on generators, it allows for writing compact & simple code for asyc requests. This is a better alternative over dispatching actions asynchronoulsy from the components directly since redux-saga allows for having less boilerplate code (with regards to asynchronocity).

- In order to have non repeating ads, the `r` param for the ads is generated as a random 12 digit number.


List of React components: 
----------------
The app is composed of the following React components.

`AsciiWareHouseApp` - The root app component, it consists of the following components: 

- `TitleBar`: Presentational component that displays the title of the app.
- `ProductGrid`: Presentaional component that renders the grid of products
    - `FilterDropdown`: Container components that wraps the `Filter` component
    - `Filter`: Presentational component that displays the drop down filter to pick the sort option
    - `ProductRow`: Presentational component that Renders a row of Products + Advertisement (when applicable)
        - `Product`: Renders a product
        - `Advertisement`: Renders an advertisement.
    - `ToggleSpinner`: Container component that wraps the `Spinner` component
    - `Spinner`: Presentational component that shows a spinner while data is loading
    - `EndOfCatalog`: Container component that wraps the `CatalogEndMessage` component.
    - `CatalogEndMessage`: Presentational component that displays the end of catalog message.


State Object:
-----------------
The application state is modelled as below (Redux state):
```
{
    products: {
        items: [], //  list of all products currently rendered on the DOM,
        prefetchedItems: [], // set of all prefetched products that have not been loaded into the DOM yet
        isFetching: true or false // used by the UI to toggle showing the loading spinner,
        isCatalogEnd: true or false // used by UI to toggle showing the catalog message
        queryParams: {  // stores information about the next batch of product fetch
            sort: id | size | key  
            skip:  Number
            limit: Number
        }
        
    },
    ads: [],  // stores the set generated values of 'r' for ads, so that ads don't re-render each time the DOM re-renders
}
```

Redux Actions:
----------
The following Redux actions change the application state:

(seperate events to decouple network requests from UI Events:)

`FETCH_PRODUCTS_REQUEST`: Dispatched when a fetch for products to the server has been requested.

`FETCH_PRODUCTS_FAILURE`: Dispatched when the fetch initiated earlier was successful. 

`FETCH_PRODUCTS_SUCCESS`: Dispatched when the fetch failed.

-------

`LOAD_PRODUCTS`: Dispatched in order to load the products (that were pre-fetched) and ads into the UI as the user scrolls to page bottom.

`CHANGE_PRODUCT_FILTER`: Dispatched when the user changes the sort filter.

`CATALOG_END`: Dispatched when the request to server returned no results and a End Catalog message has to be shown.

`CREATE_AD`: Dispatched when a new ad needs to be generated. This action results in the creation of a new `r` param in the store, so that subsequent renders can display this ad.

Action Flow:
-------------
When a set of products have to be queried for, a `FETCH_PRODUCTS_REQUEST` action is dispatched. If a fetch was successful, a `FETCH_PRODUCTS_SUCCESS` action is dispatched or in case of failure a `FETCH_PRODUCTS_FAILURE`. When the user scrolls to bottom, a `LOAD_PRODUCTS` action is dispatched which loads the prefetched items into the DOM.

For an inital fetch `LOAD_PRODUCTS` action is dipatched immediately after the first `FETCH_PRODUCT_SUCCESS` since in this case, there is no need to wait till the user scrolls to the bottom.

The `CATALOG_END` action is dispatched when the server does not return any more results and this triggers an End of catlog message on the UI.

News ads are created in the ads reducer when a `CREATE_AD` action is dispatched. A `LOAD_PRODUCTS` action loads the products intermixed with these ads into the UI.

Redux Reducers:
------------
`products`: Reducer for all state changes relating to products.

`ads`: Reducer for all state changes relating to ads.


Tests
--------
The project uses `Mocha` as the test runner and the `expect` assetion library. Tests are present under the `test/` folder an can be run with the `npm test` command.


Posssible Improvements in the future:
-------------------------------------
- The errors can be displayed on the UI (in response to a `FETCH_PRODUCTS_FAILURE` action)
- Unit tests for React components (possibly using a libray like Enzyme)
- Currenlty new items are loaded only as the user scoll hits the bottom. The load can happen as the user scolls towards the page bottom instead of waiting for the scrollbar to hit the end.
