import SortBy from "@/interfaces/sort-by";
import SortByRepository from "@/repository/sort-by.repository";
import * as MediaLibrary from "expo-media-library";
import sortMusic from "./sort-music";

export default async function getMusic(): Promise<
  MediaLibrary.PagedInfo<MediaLibrary.Asset>
> {
  const sortByState: SortBy = SortByRepository.getSortByState();
  const pagedMusic: Awaited<MediaLibrary.PagedInfo<MediaLibrary.Asset>> =
    await MediaLibrary.getAssetsAsync({ mediaType: "audio" });

  const allFetchedMusic: Awaited<MediaLibrary.PagedInfo<MediaLibrary.Asset>> =
    await MediaLibrary.getAssetsAsync({
      mediaType: "audio",
      first: pagedMusic.totalCount,
      sortBy: MediaLibrary.SortBy.duration,
    });

  sortMusic(allFetchedMusic, sortByState);

  return allFetchedMusic;
}
