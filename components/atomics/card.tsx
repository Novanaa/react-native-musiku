import {
  StyleSheet,
  TouchableOpacityProps,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Text from "./text";
import { borderColor } from "@/constants/colors";
import { borderRadius } from "@/constants/styles";
import SvgUri from "react-native-svg-uri";

interface CardProps extends TouchableOpacityProps {
  title: string;
  description: string;
  icon: string;
}

export default function Card(props: CardProps): React.JSX.Element {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={props.onPress}
      activeOpacity={0.65}
    >
      <View>
        <SvgUri svgXmlData={props.icon} />
        <Text style={styles.title}>{props.title}</Text>
      </View>
      <Text style={styles.description}>{props.description}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 210,
    height: 110,
    borderColor,
    borderWidth: 1,
    borderRadius,
    padding: 10,
    backgroundColor: "#1a1919",
  },
  title: {
    fontFamily: "bold",
    fontSize: 15,
  },
  description: {
    fontSize: 12,
    fontFamily: "medium",
    opacity: 0.75,
  },
});
