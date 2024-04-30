import React from "react";
import { FlatList } from "react-native";
import cardsData from "@/resources/cards.json";
import Card from "../atomics/card";
import { rowsGap } from "@/constants/styles";
import { Router, useRouter } from "expo-router";
import { RelativePathString } from "@/app/app";

export default function HomeCards(): React.JSX.Element {
  const router: Router = useRouter();

  return (
    <FlatList
      data={cardsData}
      renderItem={({ item }) => (
        <Card
          title={item.title}
          onPress={() => router.push(item.link as RelativePathString)}
        />
      )}
      horizontal
      contentContainerStyle={{ gap: rowsGap }}
    />
  );
}
