import { useMemo, useRef } from "react";
import RNActionSheet from "react-native-actionsheet";
import { ImagePicker } from "../sdk/ImagePicker";

const options = ["Choose from library", "Take photo or video", "Cancel"];

const useImagePicker = ({
  onChange,
}: {
  onChange?: (file: string) => void;
}) => {
  const sheetRef = useRef<RNActionSheet>(null);

  const onSelect = async (index: number) => {
    if (index === 0) {
      const result = await ImagePicker.pickImage();
      if (!result || result?.cancelled === true) {
        return;
      }
      const [, mime] = result.uri.split(".");
      onChange?.(result.uri);
    } else if (index === 1) {
      const result = await ImagePicker.takePhoto();
      if (!result || result?.cancelled === true) {
        return;
      }
      const [, mime] = result.uri.split(".");
      onChange?.(result.uri);
    }
  };

  const picker = useMemo(
    () => (
      <RNActionSheet
        ref={sheetRef}
        cancelButtonIndex={2}
        onPress={onSelect}
        options={options}
        title="Select Method"
      />
    ),
    []
  );

  const launchPicker = () => {
    sheetRef?.current?.show();
  };

  return { launchPicker, picker };
};

export default useImagePicker;
