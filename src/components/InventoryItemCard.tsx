import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from "react-native";
import { InventoryItem } from "../navigation/types";
import { colors } from "../theme/colors";
import { fonts } from "../theme/fonts";

interface InventoryItemCardProps extends TouchableOpacityProps {
  item: InventoryItem;
  style?: ViewStyle;
}

const InventoryItemCard = ({
  item,
  style,
  ...rest
}: InventoryItemCardProps): JSX.Element => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.wrapper, style]}
      {...rest}
    >
      <Image style={styles.image} source={{ uri: item.photo }} />
      <View style={styles.content}>
        <Text testID="inventory-card-title" style={styles.name}>
          {item.name}
        </Text>
        <Text testID="inventory-card-price" style={styles.price}>
          {item.value}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default InventoryItemCard;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.white,
    borderRadius: 14,
    overflow: "hidden",
    shadowColor: "#06080D",
    shadowOffset: { height: 10, width: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  image: {
    width: "100%",
    height: 150,
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  name: {
    fontFamily: fonts.bold,
    color: colors.darkGrey,
    fontSize: 19,
    lineHeight: 26,
    marginBottom: 30,
  },
  price: {
    fontFamily: fonts.regular,
    color: colors.darkGrey2,
    fontSize: 15,
    lineHeight: 20,
  },
});
