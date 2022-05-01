import {
  Image,
  ImageStyle,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import useImagePicker, { ImagePickerResult } from "../hooks/useImagePicker";
import { fonts } from "../theme/fonts";

interface PhotoPickerProps {
  error?: string;
  onChange?: (value: string) => void;
  photo?: string;
}

const PhotoPicker = ({ error, photo, onChange }: PhotoPickerProps) => {
  const { launchPicker, picker } = useImagePicker({ onChange });

  const onDelete = () => {
    onChange?.("");
  };

  return (
    <>
      {photo ? (
        <View style={styles.pickerContainer}>
          <Image
            resizeMode="cover"
            source={{ uri: photo }}
            style={styles.previewImage}
          />
          <Pressable style={styles.deleteWrapper} onPress={onDelete}>
            <Ionicons name="md-trash" size={15} color={colors.white} />
          </Pressable>
        </View>
      ) : (
        <Pressable style={styles.pickerContainer} onPress={launchPicker}>
          <Entypo
            color={colors.mainBlue}
            name="camera"
            size={44}
            style={styles.pickerIcon}
          />
          <Text style={styles.pickerText}>Add photo</Text>
        </Pressable>
      )}

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      {picker}
    </>
  );
};

export default PhotoPicker;
export { ImagePickerResult };

const styles = StyleSheet.create({
  deleteWrapper: {
    alignItems: "center",
    backgroundColor: colors.red,
    borderRadius: 16,
    bottom: 0,
    height: 32,
    justifyContent: "center",
    position: "absolute",
    right: 0,
    width: 32,
  },
  previewImage: {
    borderRadius: 75,
    height: 150,
    width: 150,
  } as ImageStyle,
  pickerContainer: {
    alignItems: "center",
    // lightGrey not clear here, replacing with mainGrey
    borderColor: colors.mainGrey,
    borderRadius: 75,
    borderStyle: "dashed",
    borderWidth: 2,
    height: 150,
    justifyContent: "center",
    position: "relative",
    width: 150,
  } as ViewStyle,
  pickerIcon: {
    marginBottom: 14,
  } as ViewStyle,
  pickerText: {
    color: colors.black,
    fontSize: 17,
    fontFamily: fonts.regular,
  } as TextStyle,
  errorText: {
    color: colors.red,
    fontFamily: fonts.regular,
    fontSize: 10,
    fontWeight: "400",
    marginTop: 5,
  } as TextStyle,
});
