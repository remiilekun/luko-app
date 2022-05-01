import { useMemo, useRef } from "react";
import RNActionSheet from "react-native-actionsheet";
import { ImagePicker, ImagePickerResult } from "../sdk/ImagePicker";

const options = ["Choose from library", "Take photo or video", "Cancel"];

const useImagePicker = ({
  onChange,
}: {
  onChange: (file: ImagePickerResult) => void;
}) => {
  const sheetRef = useRef<RNActionSheet>(null);

  const onSelect = async (index: number) => {
    if (index === 0) {
      const selectedFile = await ImagePicker.pickImage();
      onChange(selectedFile);
    } else if (index === 1) {
      const selectedFile = await ImagePicker.takePhoto();
      onChange(selectedFile);
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
export { ImagePickerResult };
