import * as MediaLibrary from "expo-media-library";

export default interface Favorites {
  assets: Array<MediaLibrary.Asset>;
  total: number;
}
