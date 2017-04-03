import React from "react";

export const Advertisement = ({ r }) => {
  const imgURl = `/ad/?r=${r}`;
  return (
    <div className="one-third column listing-item">
      <img className="ad" src={imgURl} />{" "}
    </div>
  );
};
