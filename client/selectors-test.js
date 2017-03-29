import expect from "expect";
import {
  getRenderableItems,
  splitItemsInGroups,
  insertAds
} from "./selectors.js";

expect(splitItemsInGroups([1, 2, 3, 4, 5, 6, 7], 3)).toEqual([
  [1, 2, 3],
  [4, 5, 6],
  [7]
]);

expect(insertAds([1, 2, 3, 4, 5, 6, 7], 3)).toEqual([
  1,
  2,
  3,
  { type: "AD" },
  4,
  5,
  6,
  { type: "AD" },
  7
]);

expect(
  getRenderableItems({
    products: {
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2]
    }
  })
).toEqual([
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [9, 0, { type: "AD" }],
  [1, 2]
]);

console.log("Selector Tests passed!");
