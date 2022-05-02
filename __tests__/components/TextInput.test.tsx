import "react-native";
import { Text } from "react-native";
import React from "react";
import { render } from "@testing-library/react-native";
import TextInput from "../../src/components/TextInput";

describe("components", () => {
  describe("TextInput", () => {
    it("renders correctly", async () => {
      const { toJSON } = render(<TextInput />);
      expect(toJSON()).toMatchSnapshot();
    });

    it("renders label correctly", async () => {
      const { getByText } = render(<TextInput label="Label" />);
      expect(getByText("Label")).not.toBeNull();
    });

    it("renders addon correctly", async () => {
      const { getByText } = render(<TextInput addon={<Text>addon</Text>} />);
      expect(getByText("addon")).not.toBeNull();
    });

    it("renders error correctly", async () => {
      const errorMessage = "Random error message";
      const { getByText } = render(<TextInput error={errorMessage} />);
      expect(getByText(errorMessage)).not.toBeNull();
    });

    it("has correct value", async () => {
      const testValue = "test value";
      const { getByTestId } = render(<TextInput value={testValue} />);
      const input = getByTestId("input");
      expect(input.props.value).toBe(testValue);
    });
  });
});
