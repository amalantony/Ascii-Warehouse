import React from "react";
import { connect } from "react-redux";

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

const mapStateToProps = state => {
  return {
    display: state.products.isCatalogEnd ? "initial" : "none"
  };
};

export const EndOfCatalog = connect(mapStateToProps)(CatalogEndMessage);
