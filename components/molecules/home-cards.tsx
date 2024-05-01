import React from "react";
import { FlatList, Linking } from "react-native";
import Card from "../atomics/card";
import { rowsGap } from "@/constants/styles";
import { homeCardsData } from "@/resources/cards";

export default function HomeCards(): React.JSX.Element {
  return (
    <FlatList
      data={homeCardsData}
      style={{
        flexGrow: 0,
      }}
      renderItem={({ item }) => (
        <Card
          title={item.title}
          onPress={() => Linking.openURL(item.link)}
          description={item.description}
          icon={item.icon}
        />
      )}
      horizontal
      contentContainerStyle={{ gap: rowsGap }}
    />
  );
}
