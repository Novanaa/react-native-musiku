import Toast from "react-native-root-toast";

export default function showToast(text: string): void {
  Toast.show(text, {
    duration: Toast.durations.LONG,
    position: Toast.positions.CENTER,
    shadow: true,
    animation: true,
  });
}
