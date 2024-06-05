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
        <View style={styles.headerWrapper}>
          {props.item.icon && <props.item.icon width={23} height={23} />}
          <Text style={[props.textStyle, styles.text]}>{props.item.title}</Text>
        </View>
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
    paddingVertical: 11,
    borderRadius,
    top: -10,
  },
  headerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  unchecked: {
    borderColor: colors.light.background,
    borderWidth: 1.5,
    height: 17,
    width: 17,
    borderRadius: 50,
    top: 2,
  },
  checkedWrapper: {
    borderColor: colors.light.background,
    borderWidth: 1.5,
    height: 17,
    width: 17,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    top: 2,
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
