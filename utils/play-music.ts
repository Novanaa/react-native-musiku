import { PlayerState, usePlayerStore } from "@/stores/player";
import PlayerRepository from "@/repository/player.repository";
import { CurrentMusicPlayed, SoundObject } from "@/interfaces/audio";
import { createMusicPlayerInstance, play } from "./music-player";
import { AVPlaybackStatusToSet } from "expo-av";

export default async function playMusic(
  item: CurrentMusicPlayed,
  options?: AVPlaybackStatusToSet
): Promise<void> {
  const { refreshCurrentMusicPlayed, soundObject }: PlayerState =
    usePlayerStore.getState();

  PlayerRepository.setCurrentMusicPlayed(item);
  refreshCurrentMusicPlayed();

  // Select other music
  if (soundObject && soundObject?.status.uri !== item.music?.uri) {
    await soundObject?.sound.stopAsync();
    await soundObject?.sound.unloadAsync();
    const sound: Awaited<SoundObject> = await createMusicPlayerInstance(
      item.music?.uri as string,
      options
    );

    await play(sound);
  }

  // Play music at the first time
  if (!soundObject) {
    const sound: Awaited<SoundObject> = await createMusicPlayerInstance(
      item.music?.uri as string,
      options
    );

    await play(sound);
  }
}
