import React from "react";
import moment from "moment";

/* 
 *   Accepts the product image, Price & Size as props and renders the product 
 */
export const Product = ({ properties }) => {
  const { face, price, date, size } = properties;
  const faceStyle = {
    fontSize: size
  };
  const dateDiff = new Date() - new Date(date);
  const diffInDays = Math.ceil(dateDiff / (1000 * 3600 * 24));
  let formattedDate;
  if (diffInDays > 7) {
    formattedDate = moment(new Date(date)).format("ll"); // show day, month and year
  } else {
    formattedDate = moment(new Date(date)).fromNow(); // show relative date
  }
  const formattedPrice = "$" + price / 100;
  return (
    <div className="one-third column listing-item product">
      <div className="face" style={faceStyle}> {face}</div>
      <div className="price"> {formattedPrice} </div>
      <div className="date"> Added: {formattedDate} </div>
    </div>
  );
};
