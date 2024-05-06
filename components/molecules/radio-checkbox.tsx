/* eslint-disable no-unused-vars*/

import { StyleProp, TextStyle, View, ViewProps, ViewStyle } from "react-native";
import React from "react";
import { RadioCheckboxButton } from "../atomics/radio-button";

interface RadioCheckboxProps extends ViewProps {
  data: Array<RadioCheckboxData>;
  textStyle?: TextStyle;
  containerStyle?: StyleProp<ViewStyle>;
  onChecked?: (itemId: number) => void;
  defaultCheckedId?: number | null;
}

export interface RadioCheckboxData {
  id: number;
  title: string;
  default?: boolean;
}

export function RadioCheckbox(props: RadioCheckboxProps): React.JSX.Element {
  const [selectedItemId, setSelectedItemId] = React.useState<number | null>(
    props.defaultCheckedId || null
  );

  return (
    <View>
      {props.data.map((item) => {
        return (
          <RadioCheckboxButton
            key={item.id}
            item={item}
            containerStyle={props.containerStyle}
            onChecked={(itemId: number) => {
              setSelectedItemId(itemId);
              if (props.onChecked) props.onChecked(itemId);
            }}
            isChecked={item.id === selectedItemId}
          >
            {item.title}
          </RadioCheckboxButton>
        );
      })}
    </View>
  );
}
