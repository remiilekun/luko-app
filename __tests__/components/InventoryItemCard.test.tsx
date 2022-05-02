import "react-native";
import React from "react";
import { render } from "@testing-library/react-native";
import InventoryItemCard from "../../src/components/InventoryItemCard";

const item = {
  id: "1",
  name: "Glasses",
  value: "800",
};

describe("components", () => {
  describe("InventoryItemCard", () => {
    it("renders correctly", async () => {
      const { getByText, toJSON } = render(<InventoryItemCard item={item} />);

      const itemName = await getByText(item.name);
      const itemValue = await getByText(item.value);

      expect(itemName).not.toBeNull();
      expect(itemValue).not.toBeNull();
      expect(toJSON()).toMatchSnapshot();
    });
  });
});
