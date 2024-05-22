import SortByRepository from "@/repository/sort-by.repository";
import * as MediaLibrary from "expo-media-library";

export default async function getMusic(): Promise<
  MediaLibrary.PagedInfo<MediaLibrary.Asset>
  > {
  const pagedMusic: Awaited<MediaLibrary.PagedInfo<MediaLibrary.Asset>> =
    await MediaLibrary.getAssetsAsync({ mediaType: "audio" });

  const allFetchedMusic: Awaited<MediaLibrary.PagedInfo<MediaLibrary.Asset>> =
    await MediaLibrary.getAssetsAsync({
      mediaType: "audio",
      first: pagedMusic.totalCount,
      sortBy: MediaLibrary.SortBy.duration,
    });

  const defaultSortedMusic: MediaLibrary.PagedInfo<MediaLibrary.Asset> = {
    ...allFetchedMusic,
    assets: allFetchedMusic.assets.sort((a, b) =>
      a.filename.localeCompare(b.filename)
    ),
  };

  if (SortByRepository.getSortByState() == "ascending")
    return defaultSortedMusic;

  if (SortByRepository.getSortByState() == "descending")
    return {
      ...allFetchedMusic,
      assets: allFetchedMusic.assets.sort((a, b) =>
        b.filename.localeCompare(a.filename)
      ),
    };

  return defaultSortedMusic;
}
