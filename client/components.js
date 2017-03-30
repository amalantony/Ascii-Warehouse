import React from "react";
import moment from "moment";
import { fetchProductsRequest, loadProducts } from "./actions";
import { getRenderableItems } from "./selectors.js";

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
      <div> Added: {relativeDate}</div>
    </div>
  );
};

export const Advertisement = () => {
  const getRandomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;
  const r = getRandomInt(1000000000000000, 9999999999999999);
  const imgURl = `/ad/?r=${r}`;
  return (
    <div className="one-third column listing-item">
      <img className="ad" src={imgURl} />
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
      <div className="row">
        {rowItems}
      </div>
    </div>
  );
};

export const Spinner = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="twelve columns spinner-container">
          <img className="spinner" src="images/spinner.svg" />
        </div>
      </div>
    </div>
  );
};

export const EndOfCatalog = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="twelve columns end-of-catalog-status">
          ~ End of Catalog ~
        </div>
      </div>
    </div>
  );
};

class ProductGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      intervalId: null
    };
  }
  handleDataLoad() {
    const state = this.props.store.getState();
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
      const isCatalogEnd = state.products.isCatalogEnd;
      if (isCatalogEnd) {
        // if the catalog has ended, then there is no new data left to be loaded.
        console.log("Catalog End, clearing Interval");
        clearInterval(this.state.intervalId);
      } else {
        console.log("Bottom reached!");
        this.props.store.dispatch(loadProducts());
      }
    }
  }
  fetchProducts(isInitial = false) {
    /* read file, skip & limit from store & dispatch fetchProducts */
    const store = this.props.store;
    const state = store.getState();
    let queryParams = state.products.queryParams;

    if (!isInitial) {
      // skip appropriately for new results
      queryParams = Object.extend({}, queryParams, {
        skip: queryParams.skip + queryParams.limit
      });
    }
    this.props.store.dispatch(fetchProductsRequest(queryParams, isInitial));
  }
  componentDidMount() {
    this.unsubscribe = this.props.store.subscribe(() => {
      this.forceUpdate();
    });
    this.fetchProducts(true); // do an initial fetch on component mount
    this.state.intervalId = setInterval(this.handleDataLoad.bind(this), 1000);
  }
  componentWillUnmount() {
    this.unsubscribe();
    clearInterval(this.state.intervalId);
  }
  render() {
    const state = this.props.store.getState();
    const renderableItems = getRenderableItems(state);
    const productRows = renderableItems.map((r, i) => (
      <ProductRow key={i} items={r} />
    ));
    return (
      <div>
        <TitleBar />
        <SortFilter />
        {productRows}
        <Spinner />
        <EndOfCatalog />
      </div>
    );
  }
}

export const SortFilter = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="four columns">
          <label htmlFor="drop-down-filter"> Sort By: </label>
          <select className="u-full-width" id="drop-down-filter">
            <option value="price">Price</option>
            <option value="size">Size</option>
            <option value="id">Id</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export const AsciiWareHouseApp = ({ store }) => {
  return <ProductGrid store={store} />;
};
