import RepeatModeRepository from "@/repository/repeat-mode.repository";
import setupTrackPlayer from "./setup-track-player";
import PlayerRepository from "@/repository/player.repository";
import storage from "@/libs/storage";
import FavoriteRepository from "@/repository/favorite.repository";
import PlaylistRepository from "@/repository/playlist.repository";
import uuid from "react-native-uuid";
import SortByRepository from "@/repository/sort-by.repository";
import TrackPlayer, { RepeatMode } from "react-native-track-player";
import { RefreshRepeatMode, useRepeatModeStore } from "@/stores/repeat-mode";
import { RepeatMode as IRepeatMode } from "@/interfaces/repeat-mode";
import { RefreshCurrentMusicPlayed, usePlayerStore } from "@/stores/player";
import { RefreshSortByState, useSortByStore } from "@/stores/sort-by";
import { RefreshFavoritesMusic, useFavoritesMusic } from "@/stores/favorites";
import { RefreshPlaylist, usePlaylistStore } from "@/stores/playlist";
import showToast from "./toast";

export default function appInit(): void {
  const repeatMode: IRepeatMode = useRepeatModeStore.getState().repeatMode;
  const refreshRepeatMode: RefreshRepeatMode =
    useRepeatModeStore.getState().refreshRepeatMode;
  const refreshCurrentMusicPlayed: RefreshCurrentMusicPlayed =
    usePlayerStore.getState().refreshCurrentMusicPlayed;
  const refreshSortByState: RefreshSortByState =
    useSortByStore.getState().refresh;
  const refreshFavoritesMusic: RefreshFavoritesMusic =
    useFavoritesMusic.getState().refresh;
  const refreshPlaylist: RefreshPlaylist = usePlaylistStore.getState().refresh;

  setupTrackPlayer();

  if (repeatMode) {
    const repeatModeState: Record<typeof repeatMode, string> = {
      ascending_play: "ascending play mode",
      play_once: "play once mode",
      repeat_play: "repeat play mode",
    };
    const setter: Record<typeof repeatMode, () => void> = {
      ascending_play: async () =>
        await TrackPlayer.setRepeatMode(RepeatMode.Queue),
      play_once: async () => await TrackPlayer.setRepeatMode(RepeatMode.Off),
      repeat_play: async () =>
        await TrackPlayer.setRepeatMode(RepeatMode.Track),
    };

    showToast(`Successfully updated to ${repeatModeState[repeatMode]}`);
    setter[repeatMode]();
  }

  if (!RepeatModeRepository.getRepeatModeState()) {
    RepeatModeRepository.setRepeatModeState("ascending_play");

    refreshRepeatMode();
  }

  if (!PlayerRepository.getCurrentMusicPlayed()) {
    PlayerRepository.setCurrentMusicPlayed(null);

    refreshCurrentMusicPlayed();
  }

  if (!storage.getString(FavoriteRepository.favoriteKey)) {
    FavoriteRepository.setFavorites({
      assets: [],
      total: 0,
    });

    refreshFavoritesMusic();
  }

  if (!storage.getString(PlaylistRepository.playlistKey)) {
    PlaylistRepository.setPlaylist({
      playlist: [
        {
          id: String(uuid.v4()),
          songs: [],
          title: "My Playlist",
          totalSongs: 0,
          createdAt: new Date().getTime(),
        },
      ],
      totalPlaylist: 1,
    });

    refreshPlaylist();
  }

  if (!storage.getString(SortByRepository.sortByKey)) {
    SortByRepository.setSortByState("recently_added");
    refreshSortByState();
  }
}
