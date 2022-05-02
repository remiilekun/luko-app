import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import InventoryItemCard from "../../src/components/InventoryItemCard";

const item = {
  id: "1",
  name: "Glasses",
  value: "800",
};

describe("components", () => {
  describe("InventoryItemCard", () => {
    it("renders correctly", () => {
      const tree = renderer.create(<InventoryItemCard item={item} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
