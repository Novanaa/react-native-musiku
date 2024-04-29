import Text from "@/components/atomics/text";
import { backgroundColor } from "@/constants/colors";
import React from "react";
import { View } from "react-native";

export default function SearchScreen(): React.JSX.Element {
  return (
    <View style={{ backgroundColor, flex: 1 }}>
      <Text>Search</Text>
    </View>
  );
}
