import React from "react";
import { connect } from "react-redux";

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

const mapStateToProps = state => {
  return {
    display: state.products.isFetching ? "initial" : "none"
  };
};

export const ToggleSpinner = connect(mapStateToProps)(Spinner);
