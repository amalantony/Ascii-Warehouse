Discount Ascii Warehouse
====

This is an ecommerce site, where you can buy all sorts of ascii faces like `(ノ・∀・)ノ` and `¯_(ツ)_/¯`, in a wide variety of font sizes. The homepage displays a list of products for people to browse.

Features
----
- products are displayed in a grid.
- user has the option to sort the products in ascending order. Can sort by "size", "price" or "id".
- each product has :
  - a "size" field, which is the font-size (in pixels). We should display the faces in their correct size, to give customers a realistic impression of what they're buying.
  - a "price" field, in cents. This should be formatted as dollars like `$3.51`.
  - a "date" field, which is the date the product was added to the catalog. Dates should be displayed in relative time (eg. "3 days ago") unless they are older than 1 week, in which case the full date should be displayed.
- the product grid should automatically load more items as you scroll down.
- our product database is under high load due to growing demand for ascii, so please display an animated "loading..." message while the user waits.
- to improve the user's experience, we should always pre-emptively fetch the next batch of results in advance, making use of idle-time.  But they still should not be displayed until the user has scrolled to the bottom of the product grid.
- when the user reaches the end and there are no more products to display, show the message "~ end of catalogue ~".

### Ads features

- after every 20 products we need to insert an advertisement from one of our sponsors
- Ads should be randomly selected, but a user must never see the same ad twice in a row.


Code Organisation
----------------
The client side Javascript code is located in the `client/` folder, the tests are in the `test/` folder. Webpack bundles all client code to a single js file `bundle.js` file in the `static/js` directory and this file is included in `index.html`.


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


Tests:
--------
The project uses `Mocha` as the test runner and the `expect` assetion library. Tests are present under the `test/` folder an can be run with the `npm test` command.


Posssible Improvements in the future:
-------------------------------------
- The errors can be displayed on the UI (in response to a `FETCH_PRODUCTS_FAILURE` action)
- Unit tests for React components (possibly using a libray like Enzyme)
- Currenlty new items are loaded only as the user scoll hits the bottom. The load can happen as the user scolls towards the page bottom instead of waiting for the scrollbar to hit the end.

