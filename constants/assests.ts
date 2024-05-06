import { ImageSourcePropType } from "react-native";

const iconsStaticDirectory: string = "../assets/icons/";
const imagesStaticDirectory: string = "../assets/images/";

export interface Assets {
  icons: Record<string, ImageSourcePropType>;
  images: Record<string, ImageSourcePropType>;
}

export default {
  icons: {
    app: require(iconsStaticDirectory + "musiku.png"),
  },
  images: {
    musicDisc: require(imagesStaticDirectory + "music-disc.png"),
  },
} satisfies Assets;
