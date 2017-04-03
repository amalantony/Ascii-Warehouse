import React from "react";
import CHANGE_PRODUCTS_FILTER from "../actions.js";
import { connect } from "react-redux";

export const Filter = (
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

const mapStateToProps = state => {
  return {
    currentFilter: state.products.queryParams.sort
  };
};

const mapDispatchToProps = dispatch => {
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
  Filter
);
