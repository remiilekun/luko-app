import "react-native";
import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import PhotoPicker from "../../src/components/PhotoPicker";

describe("components", () => {
  describe("PhotoPicker", () => {
    it("renders correctly", async () => {
      const { toJSON } = render(<PhotoPicker />);
      expect(toJSON()).toMatchSnapshot();
    });

    it("renders picker if photo not available", async () => {
      const { getByTestId } = render(<PhotoPicker />);
      const selectButton = getByTestId("select-button");
      expect(selectButton).not.toBeNull();
    });

    it("renders photo if available", async () => {
      const { getByTestId } = render(
        <PhotoPicker photo="https://picsum.photos/200" />
      );

      const previewImage = await getByTestId("preview-image");
      expect(previewImage).not.toBeNull();
    });

    it("renders delete button if photo is available", async () => {
      const onChange = jest.fn();
      const { getByTestId } = render(
        <PhotoPicker photo="https://picsum.photos/200" onChange={onChange} />
      );

      const deleteButton = getByTestId("delete-button");
      expect(deleteButton).not.toBeNull();
      fireEvent(deleteButton, "press");
      expect(onChange).toHaveBeenCalledWith("");
    });
  });
});
