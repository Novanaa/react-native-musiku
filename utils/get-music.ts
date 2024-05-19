import * as MediaLibrary from "expo-media-library";

export default async function getMusic(): Promise<
  MediaLibrary.PagedInfo<MediaLibrary.Asset>
  > {
  const pagedMusic: Awaited<MediaLibrary.PagedInfo<MediaLibrary.Asset>> =
    await MediaLibrary.getAssetsAsync({ mediaType: "audio" });

  return await MediaLibrary.getAssetsAsync({
    mediaType: "audio",
    first: pagedMusic.totalCount,
  });
}
