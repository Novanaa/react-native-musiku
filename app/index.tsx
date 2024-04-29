import Text from "@/components/atomics/text";
import { backgroundColor } from "@/constants/colors";
import { View } from "react-native";

export default function Home() {
  return (
    <View style={{ backgroundColor, flex: 1 }}>
      <Text>Hello, World!</Text>
    </View>
  );
}
