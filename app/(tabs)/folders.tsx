import Text from "@/components/atomics/text";
import { backgroundColor } from "@/constants/colors";
import React from "react";
import { View } from "react-native";

export default function FoldersScreen(): React.JSX.Element {
  return (
    <View style={{ backgroundColor, flex: 1 }}>
      <Text>Folders</Text>
    </View>
  );
}
