import React from "react";

import { fetchProductsRequest, loadProducts } from "../actions";
import { getRenderableItems } from "../selectors.js";

import { FilterDropdown } from "./Filter.jsx";
import { ProductRow } from "./ProductRow.jsx";
import { ToggleSpinner } from "./Spinner.jsx";
import { EndOfCatalog } from "./CatalogEndMessage.jsx";

export class ProductGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      intervalId: null,
      previousFilter: null,
      /* PreviousFilter has to be a local React component state so that the interval check on data load when scrolled to bottom can be restarted. 
        The interval check is cleared when a CATALOG_END action is dispatched. 
        However when, a CHANGE_PRODUCTS_FILTER is triggered afterwards, the polling must start again. */
      skip: null,
      limit: null
    };
  }

  handleDataLoad() {
    /* 
    * handleDataLoad - this method checks if the user is at page bottom, if so it dispatches a LOAD_PRODUCTS action 
    *   so that the prefetched items can be loaded onto the DOM
    */
    const { store } = this.context;
    const state = store.getState();
    const windowHeight = "innerHeight" in window
      ? window.innerHeight
      : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const windowBottom = windowHeight + window.pageYOffset;
    const queryParams = state.products.queryParams;
    if (windowBottom >= docHeight) {
      // while polling, don't make the same request twice
      if (
        queryParams.limit !== this.state.limit ||
        queryParams.skip !== this.state.skip
      ) {
        if (state.products.items.length > 0) {
          // during polling, don't dispatch load unless there are any items. For the initial set of items, the load happens
          // in the saga. The load here is applicable only when the user scolls to the bottom.
          setTimeout(() => store.dispatch(loadProducts()));
        }
      }
      this.setQueryLimits();
    }
  }

  fetchProducts(isInitial = false) {
    /* read queryParams (sort, skip & limit) from the store & dispatch a FETCH_PRODUCTS_REQUEST with those params */
    const { store } = this.context;
    const state = store.getState();
    let queryParams = state.products.queryParams;

    if (!isInitial) {
      // skip appropriately for new results
      queryParams = Object.extend({}, queryParams, {
        skip: queryParams.skip + queryParams.limit
      });
    }
    store.dispatch(fetchProductsRequest(queryParams, isInitial));
  }

  shouldEndPolling() {
    /* Determines if the catalog has ended, so that polling for scroll to bottom can be stopped */
    const { store } = this.context;
    const state = store.getState();
    const isCatalogEnd = state.products.isCatalogEnd;
    if (isCatalogEnd) {
      clearInterval(this.state.intervalId);
    }
  }

  shouldStartPolling() {
    /* This method determines if polling must be started to check if the user has scrolled to page bottom (to load new messages) */
    const { store } = this.context;
    const state = store.getState();
    const currentFilter = state.products.queryParams.sort;
    if (currentFilter !== this.state.previousFilter) {
      this.state.previousFilter = currentFilter;
      this.state.intervalId = setInterval(this.handleDataLoad.bind(this), 1000);
    }
  }

  setQueryLimits() {
    const { store } = this.context;
    const state = store.getState();
    this.state.skip = state.products.queryParams.skip;
    this.state.limit = state.products.queryParams.limit;
  }

  componentDidMount() {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() => {
      this.shouldStartPolling();
      this.shouldEndPolling();
      this.forceUpdate();
    });
    this.fetchProducts(true); // do an initial fetch on component mount
  }

  componentWillUnmount() {
    this.unsubscribe();
    clearInterval(this.state.intervalId);
  }

  render() {
    const { store } = this.context;
    const state = store.getState();
    const renderableItems = getRenderableItems(state);

    const productRows = renderableItems.map((r, i) => (
      <ProductRow key={i} items={r} />
    ));
    return (
      <div>
        <FilterDropdown />
        {productRows}
        <ToggleSpinner />
        <EndOfCatalog />
      </div>
    );
  }
}

ProductGrid.contextTypes = {
  store: React.PropTypes.object
};
