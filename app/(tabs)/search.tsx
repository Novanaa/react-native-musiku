import Text from "@/components/atomics/text";
import React from "react";
import { View } from "react-native";
import { backgroundColor } from "@/constants/colors";

export default function SearchScreen(): React.JSX.Element {
  return (
    <View style={{ backgroundColor, flex: 1 }}>
      <Text>Search</Text>
    </View>
  );
}
