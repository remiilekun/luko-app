import { useState } from "react";
import {
  TextInputProps as RNTextInputProps,
  TextInput as RNTextInput,
  Text,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { colors } from "../theme/colors";
import { fonts } from "../theme/fonts";

export interface TextInputProps extends RNTextInputProps {
  addon?: JSX.Element;
  label?: string;
  margined?: boolean;
  textArea?: boolean;
  error?: string;
}

export default function TextInput({
  addon,
  error,
  label,
  margined,
  textArea,
  ...props
}: TextInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.wrapper, margined ? styles.wrapperMargined : {}]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={styles.inputWrapper}>
        <RNTextInput
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholderTextColor={colors.mainGrey}
          style={[
            styles.input,
            textArea ? styles.textArea : {},
            addon ? styles.inputWithAddon : {},
            isFocused ? styles.inputFocused : {},
            Boolean(error) ? styles.inputError : {},
          ]}
          {...props}
        />

        {addon ? <View style={styles.inputAddon}>{addon}</View> : null}
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {},
  wrapperMargined: {
    marginBottom: 20,
  },
  label: {
    color: colors.darkGrey,
    fontFamily: fonts.regular,
    fontSize: 13,
    fontWeight: "500",
    lineHeight: 17,
    marginBottom: 5,
  } as TextStyle,
  inputWrapper: {
    position: "relative",
  },
  input: {
    backgroundColor: colors.white,
    borderColor: colors.lightGrey,
    borderRadius: 10,
    borderStyle: "solid",
    borderWidth: 2,
    fontFamily: fonts.regular,
    fontSize: 17,
    fontWeight: "400",
    lineHeight: 20,
    paddingHorizontal: 15,
    paddingVertical: 12,
  } as ViewStyle,
  inputFocused: {
    borderColor: colors.mainBlue,
    shadowColor: "#D6E3FD",
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  } as ViewStyle,
  inputError: {
    borderColor: colors.red,
    shadowColor: colors.red,
  },
  errorText: {
    color: colors.red,
    fontFamily: fonts.regular,
    fontSize: 10,
    fontWeight: "400",
    marginTop: 5,
  } as TextStyle,
  inputWithAddon: {
    paddingRight: 30,
  } as ViewStyle,
  inputAddon: {
    position: "absolute",
    right: 15,
    top: 12,
  } as ViewStyle,
  textArea: {
    height: 128,
  } as ViewStyle,
});
