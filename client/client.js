import './actions-test.js';

import React from 'react';
import ReactDOM from 'react-dom';

const TitleBar = () => {
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
const Product = () => {
    return (<div className="one-third column listing-item">
    </div>);
};

const Advertisement = () => {
    return (<div className="one-third column listing-item">
        Product
    </div>);
};

/*
*   Take 3 DisplayItems (Products/Advertisements) and render them
*/
const ProductRow = () => {
    return (
        <div className="container">
            <div className="row">
                <Product/>
                <Product/>
                <Product/>
            </div>
        </div>
    );
};

const ProductGrid = () => {
    return (
       <div>
            <TitleBar/>
            <SortFilter/>
            <ProductRow/>
            <ProductRow/>
            <ProductRow/>
        </div>
    );
};

const SortFilter = () => {
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

const AsciiWareHouseApp = () => {
    return <ProductGrid/>;
};

ReactDOM.render(<AsciiWareHouseApp/>, document.getElementById("root"));