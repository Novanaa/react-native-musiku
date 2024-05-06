import React from "react";
import { TouchableOpacity } from "react-native";
import SvgUri from "react-native-svg-uri";

interface IconButtonProps extends React.ComponentProps<"image"> {
  icon: string;
  width?: number;
  height?: number;
  alt?: string;
  onPress?: () => void;
}

export function IconButton({
  icon,
  width,
  height,
  alt,
  onPress,
}: IconButtonProps): React.JSX.Element {
  return (
    <TouchableOpacity onPress={onPress}>
      <SvgUri svgXmlData={icon} height={height} width={width} />
    </TouchableOpacity>
  );
}
