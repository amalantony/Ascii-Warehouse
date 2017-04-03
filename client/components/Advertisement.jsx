import React from "react";

/*
* Accepts an r param and renders an Advertisement correspoding to r
*/
export const Advertisement = ({ r }) => {
  const imgURl = `/ad/?r=${r}`;
  return (
    <div className="one-third column listing-item">
      <img className="ad" src={imgURl} />{" "}
    </div>
  );
};
