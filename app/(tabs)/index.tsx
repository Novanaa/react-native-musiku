import Text from "@/components/atomics/text";
import { View } from "react-native";
import { backgroundColor } from "@/constants/colors";

export default function Home() {
  return (
    <View style={{ backgroundColor, flex: 1 }}>
      <Text>Hello, World!</Text>
    </View>
  );
}
