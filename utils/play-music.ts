import {
  CurrentMusicPlayed,
  PlayerState,
  usePlayerStore,
} from "@/stores/player";
import PlayerRepository from "@/repository/player.repository";
import { SoundObject } from "@/interfaces/audio";
import { createMusicPlayerInstance, play } from "./music-player";

export default async function playMusic(
  music: CurrentMusicPlayed
): Promise<void> {
  const { refreshCurrentMusicPlayed, soundObject }: PlayerState =
    usePlayerStore.getState();

  PlayerRepository.setCurrentMusicPlayed(music);
  refreshCurrentMusicPlayed();

  // Select other music
  if (soundObject && soundObject?.status.uri !== music?.uri) {
    await soundObject?.sound.stopAsync();
    await soundObject?.sound.unloadAsync();
    const sound: Awaited<SoundObject> = await createMusicPlayerInstance(
      music?.uri!
    );

    await play(sound);

    return;
  }

  // Play music at the first time
  if (!soundObject) {
    const sound: Awaited<SoundObject> = await createMusicPlayerInstance(
      music?.uri!
    );

    await play(sound);
  }
}
