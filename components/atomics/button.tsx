import React from "react";
import { Image, ImageSourcePropType, TouchableOpacity } from "react-native";

interface IconButtonProps extends React.ComponentProps<"image"> {
  icon: ImageSourcePropType;
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
      <Image alt={alt} source={icon} height={height} width={width} />
    </TouchableOpacity>
  );
}
