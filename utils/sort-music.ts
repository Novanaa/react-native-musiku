import SortBy from "@/interfaces/sort-by";
import { Music } from "@/stores/music";

export default function sortMusic(music: Music, state: SortBy): void {
  const sortedMusic: Record<Partial<SortBy>, () => void> = {
    ascending: () => ({
      ...music,
      assets: music.assets.sort((a, b) => a.filename.localeCompare(b.filename)),
    }),
    descending: () => ({
      ...music,
      assets: music.assets.sort((a, b) => b.filename.localeCompare(a.filename)),
    }),
    recently_added: () => ({
      ...music,
      assets: music.assets.sort(
        (a, b) => b.modificationTime - a.modificationTime
      ),
    }),
    lately_added: () => ({
      ...music,
      assets: music.assets.sort(
        (a, b) => a.modificationTime - b.modificationTime
      ),
    }),
    duration: () => ({ ...music }),
  };

  return sortedMusic[state]();
}
