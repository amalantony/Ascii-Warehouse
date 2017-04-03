import React from "react";
import { ProductGrid } from "./ProductGrid.jsx";
import { TitleBar } from "./TitleBar.jsx";

/* Root component for the Ascii warehouse app */

export const AsciiWareHouseApp = () => {
  return (
    <div>
      <TitleBar />
      <ProductGrid />
    </div>
  );
};
