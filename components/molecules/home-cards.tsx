import React from "react";
import { FlatList, Linking } from "react-native";
import cardsData from "@/resources/cards.json";
import Card from "../atomics/card";
import { rowsGap } from "@/constants/styles";

export default function HomeCards(): React.JSX.Element {
  return (
    <FlatList
      data={cardsData}
      renderItem={({ item }) => (
        <Card title={item.title} onPress={() => Linking.openURL(item.link)} />
      )}
      horizontal
      contentContainerStyle={{ gap: rowsGap }}
    />
  );
}
