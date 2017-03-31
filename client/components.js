import React from "react";
import moment from "moment";
import {
  fetchProductsRequest,
  loadProducts,
  CHANGE_PRODUCTS_FILTER
} from "./actions";
import { getRenderableItems } from "./selectors.js";
import { connect } from "react-redux";

export const TitleBar = () => {
  return (
    <div className="section hero title-heading">
      <div className="container">
        <div className="row">
          <h3 className="hero-heading"> ASCII WAREHOUSE </h3>
        </div>
      </div>
    </div>
  );
};

/* 
 *   Accepts the product image, Price & Size as props and renders the product 
 */
export const Product = ({ properties }) => {
  const { face, price, date, size } = properties;
  const faceStyle = {
    fontSize: size
  };
  const relativeDate = moment(new Date(date)).fromNow();
  const formattedPrice = "$" + price / 100;
  return (
    <div className="one-third column listing-item product">
      <div style={faceStyle}> {face} </div>
      <div> Price: {formattedPrice} </div>
      <div> Added: {relativeDate} </div>
    </div>
  );
};

export const Advertisement = () => {
  const getRandomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;
  const r = getRandomInt(1000000000000000, 9999999999999999); // generate an r large enough to avoid ad collisions
  const imgURl = `/ad/?r=${r}`;
  return (
    <div className="one-third column listing-item">
      <img className="ad" src={imgURl} />{" "}
    </div>
  );
};

/*
 *   Take 3 DisplayItems (Products/Advertisements) and render them
 */
export const ProductRow = ({ items }) => {
  const rowItems = items.map((i, k) => {
    if (i.type === "AD") {
      return <Advertisement key={k} />;
    } else {
      return <Product key={k} properties={i} />;
    }
  });
  return (
    <div className="container">
      <div className="row"> {rowItems} </div>{" "}
    </div>
  );
};

export const Spinner = ({ display }) => {
  const styling = {
    display
  };
  return (
    <div className="container" style={styling}>
      <div className="row">
        <div className="twelve columns spinner-container">
          <img className="spinner" src="images/spinner.svg" />
        </div>{" "}
      </div>{" "}
    </div>
  );
};

let mapStateToProps = state => {
  return {
    display: state.products.isFetching ? "initial" : "none"
  };
};

export const ToggleSpinner = connect(mapStateToProps)(Spinner);

export const CatalogEndMessage = ({ display }) => {
  const styling = {
    display
  };
  return (
    <div className="container" style={styling}>
      <div className="row">
        <div className="twelve columns end-of-catalog-status">
          ~End of Catalog~
        </div>{" "}
      </div>{" "}
    </div>
  );
};

mapStateToProps = state => {
  return {
    display: state.products.isCatalogEnd ? "initial" : "none"
  };
};

export const EndOfCatalog = connect(mapStateToProps)(CatalogEndMessage);

class ProductGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      intervalId: null,
      /* PreviousFilter has to be a local component state so that the interval check on data load when scrolled to bottom can be restarted. 
        The interval check is cleared when a CATALOG_END action is dispatched. 
        However when, a CHANGE_PRODUCTS_FILTER is triggered afterwards, the polling must start again. */
      previousFilter: null
    };
  }
  handleDataLoad() {
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
    if (windowBottom >= docHeight) {
      store.dispatch(loadProducts());
    }
  }
  fetchProducts(isInitial = false) {
    /* read sort, skip & limit from store & dispatch fetchProducts */
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
  checkEndPolling() {
    const { store } = this.context;
    const state = store.getState();
    const isCatalogEnd = state.products.isCatalogEnd;
    if (isCatalogEnd) {
      clearInterval(this.state.intervalId);
    }
  }
  checkStartPolling() {
    const { store } = this.context;
    const state = store.getState();
    const currentFilter = state.products.queryParams.sort;
    if (currentFilter !== this.state.previousFilter) {
      this.state.previousFilter = currentFilter;
      this.state.intervalId = setInterval(this.handleDataLoad.bind(this), 1000);
    }
  }
  componentDidMount() {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() => {
      this.checkStartPolling();
      this.checkEndPolling();
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
        <TitleBar />
        <FilterDropdown /> {productRows} <ToggleSpinner />
        <EndOfCatalog />
      </div>
    );
  }
}
ProductGrid.contextTypes = {
  store: React.PropTypes.object
};

export const FilterOptions = (
  {
    currentFilter,
    onChange
  }
) => {
  return (
    <div className="container">
      <div className="row">
        <div className="four columns">
          <label htmlFor="drop-down-filter"> Sort By: </label>
          <select
            className="u-full-width"
            id="drop-down-filter"
            value={currentFilter}
            onChange={onChange}
          >
            <option value="id"> Id </option>
            {" "}
            <option value="price"> Price </option>
            {" "}
            <option value="size"> Size </option>
            {" "}
          </select>
        </div>
      </div>
    </div>
  );
};

mapStateToProps = state => {
  return {
    currentFilter: state.products.queryParams.sort
  };
};

let mapDispatchToProps = dispatch => {
  return {
    onChange: event => {
      const value = event.target.value;
      dispatch({
        type: CHANGE_PRODUCTS_FILTER,
        value
      });
    }
  };
};
export const FilterDropdown = connect(mapStateToProps, mapDispatchToProps)(
  FilterOptions
);

export const AsciiWareHouseApp = () => {
  return <ProductGrid />;
};
