import React from "react";
import { Product } from "./Product.jsx";
import { Advertisement } from "./Advertisement.jsx";

/*
 *   Take 3 DisplayItems (Products/Advertisements) and renders them
 */
export const ProductRow = ({ items }) => {
  const rowItems = items.map((i, k) => {
    if (i.type === "AD") {
      return <Advertisement key={k} r={i.r} />;
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
