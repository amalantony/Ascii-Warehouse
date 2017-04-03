import { createSelector } from "reselect";

const getItems = state => state.products.items;
const getAds = state => state.ads;

const ROW_GAP = 3; // number of items in each row
const AD_GAP = 20; // how many products to render before an AD is diplayed

/*
* splitItemsInGroups => Takes and array and a size & splits that array into subarrays of that size
*/

export const splitItemsInGroups = (items, size) => {
  return items.reduce(
    (acc, curr, i) => {
      if (!(i % size)) {
        // if index is 0 or can be divided by the `size`...
        let tmpArr = items.slice(i, i + size);
        acc.push(tmpArr);
      }
      return acc;
    },
    []
  );
};

/*
*   insertAds => Takes an array of items and inserts ADS in it based on the vaule of adGap
*/
export const insertAds = (items, adGap) => {
  return items.reduce(
    (acc, curr, i) => {
      if (i !== 0 && !(i % adGap)) {
        acc.push({ type: "AD" });
      }
      acc.push(curr);
      return acc;
    },
    []
  );
};

export const getRenderableItemsWithPlaceholders = createSelector(
  /*
  * Since Ad refs are randomly generated, having ad placeholders makes unit testing easy.
  */
  getItems,
  items => splitItemsInGroups(insertAds(items, AD_GAP), ROW_GAP)
);

export const getRenderableItems = createSelector(
  /*
  * Takes the placeholder items & adds the randmized 'r' params to the ads in them
  */
  [getRenderableItemsWithPlaceholders, getAds],
  (items, ads) => {
    let adCounter = 0;
    return items.map(row => {
      return row.map(item => {
        if (item.type === "AD") {
          return {
            type: "AD",
            r: ads[adCounter++]
          };
        } else
          return item;
      });
    });
  }
);
