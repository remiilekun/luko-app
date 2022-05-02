import React, { useCallback } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import chunk from "lodash.chunk";
import InventoryItemCard from "../components/InventoryItemCard";
import { Title } from "../components/Title";
import useStore from "../hooks/useStore";
import { InventoryItem, RootTabScreenProps } from "../navigation/types";
import { colors } from "../theme/colors";

export default function InventoryScreen({
  navigation,
  route,
}: RootTabScreenProps<"Inventory">) {
  const { inventory } = useStore();
  const data = chunk(inventory, 2);
  const handleAddButtonPress = () => navigation.navigate("AddItem");

  const renderItem = useCallback(({ item }) => {
    return (
      <View style={styles.itemGroup}>
        {item.map((itemChild: InventoryItem) => (
          <InventoryItemCard
            key={itemChild.id}
            onPress={() => navigation.navigate("AddItem", { id: itemChild.id })}
            item={itemChild}
            style={styles.itemChild}
          />
        ))}
      </View>
    );
  }, []);

  const renderSeparator = useCallback(() => {
    return <View style={styles.separator} />;
  }, []);

  const keyExtractor = useCallback(
    ({ item }) => `${item?.[0].id}-${item?.[1].id || ""}`,
    []
  );

  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <Title onButtonPress={handleAddButtonPress}>{route.name}</Title>
      </View>

      <FlatList
        keyExtractor={keyExtractor}
        data={data}
        renderItem={renderItem}
        ItemSeparatorComponent={renderSeparator}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.background,
  },
  titleWrapper: {
    marginBottom: 15,
  },
  itemGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemChild: {
    width: "48%",
  },
  separator: {
    height: 20,
  },
});
