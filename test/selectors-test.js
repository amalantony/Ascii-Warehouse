import expect from "expect";
import {
  getRenderableItemsWithPlaceholders,
  splitItemsInGroups,
  insertAds
} from "../client/selectors.js";

describe("In Selectors,", () => {
  it("splitItemsInGroups must accept an array and splitSize & split the array into subarrays of size splitSize", () => {
    expect(splitItemsInGroups([1, 2, 3, 4, 5, 6, 7], 3)).toEqual([
      [1, 2, 3],
      [4, 5, 6],
      [7]
    ]);
  });

  it("insertAds must accept an array and a adGap and insert ad placeholders into the array at the adGap iterval", () => {
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
  });

  it("getRenderableItemsWithPlaceholders must take the list of products in the state and return the product rows with ad placeholders inserted", () => {
    expect(
      getRenderableItemsWithPlaceholders({
        products: {
          items: [
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            0,
            1,
            2
          ]
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
  });
});
