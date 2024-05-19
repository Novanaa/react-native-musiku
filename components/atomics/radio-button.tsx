/* eslint-disable no-unused-vars*/

import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableHighlight,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import Text from "./text";
import colors, { inputBackgroundColor } from "@/constants/colors";
import { borderRadius } from "@/constants/styles";
import { TouchableOpacityProps } from "react-native-gesture-handler";
import { RadioCheckboxData } from "../molecules/radio-checkbox";

interface RadioCheckboxButtonProps extends TouchableOpacityProps {
  textStyle?: TextStyle;
  containerStyle?: StyleProp<ViewStyle>;
  item: RadioCheckboxData;
  onChecked?: (itemId: number) => void;
  isChecked: boolean;
}

function RadioCheckboxButton(
  props: RadioCheckboxButtonProps
): React.JSX.Element {
  return (
    <TouchableHighlight
      activeOpacity={0.6}
      underlayColor={inputBackgroundColor}
      style={[
        styles.container,
        props.containerStyle,
        { opacity: props.isChecked ? 1.0 : 0.7 },
      ]}
      onPress={() => {
        if (!props.isChecked && props.onChecked) props.onChecked(props.item.id);
      }}
      accessibilityState={{ checked: props.isChecked }}
      accessibilityRole="radio"
    >
      <>
        <Text style={[props.textStyle, styles.text]}>{props.children}</Text>
        {props.isChecked ? (
          <View style={styles.checkedWrapper}>
            <View style={styles.checkedIcon}></View>
          </View>
        ) : (
          <View style={styles.unchecked}></View>
        )}
      </>
    </TouchableHighlight>
  );
}

export default React.memo(RadioCheckboxButton);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    display: "flex",
    gap: 10,
    padding: 12,
    paddingVertical: 13,
    borderRadius,
    top: -10,
  },
  unchecked: {
    borderColor: colors.light.background,
    borderWidth: 1.5,
    height: 17,
    width: 17,
    borderRadius: 50,
  },
  checkedWrapper: {
    borderColor: colors.light.background,
    borderWidth: 1.5,
    height: 17,
    width: 17,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  checkedIcon: {
    borderColor: colors.light.background,
    borderWidth: 1.5,
    height: 9,
    width: 9,
    backgroundColor: colors.light.background,
    borderRadius: 50,
  },
  text: { fontFamily: "bold" },
});
