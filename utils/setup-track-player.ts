import TrackPlayer, { Capability, RepeatMode } from "react-native-track-player";

export default async function setupTrackPlayer() {
  await TrackPlayer.setupPlayer();
  await TrackPlayer.updateOptions({
    capabilities: [Capability.Play, Capability.Pause, Capability.Stop],
    // Capabilities that will show up when the notification is in the compact form on Android
    compactCapabilities: [Capability.Play, Capability.Pause],
  });
  await TrackPlayer.setRepeatMode(RepeatMode.Track);
}
