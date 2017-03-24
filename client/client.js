import React from 'react';
import ReactDOM from 'react-dom';

const TitleBar = () => {
    return (
        <div className = "section hero">
            <div className = "container">
                <div className = "row">
                    <h4 class = "hero-heading"> ASCII WAREHOUSE </h4>
                </div>
            </div>
        </div>
    );
};

const Product = () => {
    return (<div className="one-third column">
        Product
    </div>);
};

const Advertisement = () => {
    return (<div className="one-third column">
        Product
    </div>);
};

const ProductRow = () => {
    return (
        <div className = "container">
            <div className = "row">
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
        </div>
    );
};

const SortFilter = () => {
    return (
        <div className = "container">
            <div className="row">
                <div class="four columns">
                    <label for="drop-down-filter"> Sort By: </label>
                    <select class="u-full-width" id="drop-down-filter">
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