import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  Text,
} from "react-native";
import { colors } from "../theme/colors";
import { fonts } from "../theme/fonts";

export default function Button({
  title,
  onPress,
  disabled,
  loading,
}: PressableProps & { title: string; loading?: boolean }) {
  if (loading) {
    return <ActivityIndicator color={colors.mainBlue} />;
  }

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
      pressRetentionOffset={20}
      hitSlop={20}
    >
      <Text
        style={{
          fontSize: 17,
          fontFamily: fonts.regular,
          color: disabled ? colors.mainGrey : colors.mainBlue,
        }}
      >
        {title}
      </Text>
    </Pressable>
  );
}
