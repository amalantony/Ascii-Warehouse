import { createSelector } from "reselect";

const getItems = state => state.products.items;

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
        acc.push(tmpArr); // ..push a chunk of the original array to the accumulator
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

export const getRenderableItems = createSelector(getItems, items =>
  splitItemsInGroups(insertAds(items, AD_GAP), ROW_GAP));
