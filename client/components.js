import React from "react";

export const TitleBar = () => {
  return (
    <div className="section hero">
      <div className="container">
        <div className="row">
          <h4 className="hero-heading"> ASCII WAREHOUSE </h4>
        </div>
      </div>
    </div>
  );
};

/* 
*   Accepts the product image, Price & Size as props and renders the product 
*/
export const Product = () => {
  return <div className="one-third column listing-item" />;
};

export const Advertisement = () => {
  return (
    <div className="one-third column listing-item">
      Product
    </div>
  );
};

/*
*   Take 3 DisplayItems (Products/Advertisements) and render them
*/
export const ProductRow = () => {
  return (
    <div className="container">
      <div className="row">
        <Product />
        <Product />
        <Product />
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
      pollingIntervalId: null
    };
  }
  handleScroll() {
    console.log("Scrolled!");
  }
  fetchProducts() {
    /* keep track of skip and limit */
    console.log("fetching results");
  }
  componentDidMount() {
    this.fetchProducts(); // do an initial fetch on component mount
    window.addEventListener("scroll", this.handleScroll);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }
  render() {
    return (
      <div>
        <TitleBar />
        <SortFilter />
        <ProductRow />
        <ProductRow />
        <ProductRow />
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

export const AsciiWareHouseApp = () => {
  return <ProductGrid />;
};
