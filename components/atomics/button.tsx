import {
  StyleProp,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import React from "react";
import SvgUri from "react-native-svg-uri";
import Text from "./text";
import { borderColor } from "@/constants/colors";
import { borderRadius } from "@/constants/styles";

interface IconButtonProps extends TouchableOpacityProps {
  icon: string;
  width?: number;
  height?: number;
  alt?: string;
  onPress?: () => void;
}

export function IconButton(props: IconButtonProps): React.JSX.Element {
  return (
    <TouchableOpacity onPress={props.onPress} style={props.style}>
      <SvgUri
        svgXmlData={props.icon}
        height={props.height}
        width={props.width}
      />
    </TouchableOpacity>
  );
}

interface ButtonProps extends TouchableOpacityProps {
  textStyle?: StyleProp<TextStyle>;
}

export function Button(props: ButtonProps): React.JSX.Element {
  return (
    <TouchableOpacity
      {...props}
      activeOpacity={0.5}
      style={[
        props.style,
        {
          padding: 10,
          borderColor,
          borderRadius,
          borderWidth: 1,
        },
      ]}
    >
      <Text
        style={[props.textStyle, { fontFamily: "bold", textAlign: "center" }]}
      >
        {props.children}
      </Text>
    </TouchableOpacity>
  );
}
