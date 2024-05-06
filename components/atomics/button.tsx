import React from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import SvgUri from "react-native-svg-uri";

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
