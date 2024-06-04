import React from "react";
import Drawer, { DrawerProps, DrawerWrapper } from "./drawer";
import * as MediaLibrary from "expo-media-library";
import Text from "./text";
import { StyleSheet, TouchableOpacity, View, ViewProps } from "react-native";
import { borderColor } from "@/constants/colors";
import { borderRadius, rowsGap } from "@/constants/styles";
import parseDuration from "@/utils/parse-duration";
import MusicSVG from "@/assets/icons/music.svg";
import { SvgProps } from "react-native-svg";
import PlaySVG from "@/assets/icons/play.svg";
import RoundedArrowSVG from "@/assets/icons/rounded-arrow.svg";
import LocationSVG from "@/assets/icons/location.svg";
import PlusCircleSVG from "@/assets/icons/plus-circle.svg";
import { RefreshPlaylist, usePlaylistStore } from "@/stores/playlist";
import { PlaylistScheme } from "@/interfaces/playlist";
import AlbumSVG from "@/assets/icons/album.svg";
import { Playlist as IPlaylist } from "@/interfaces/playlist";
import ArrowRightSVG from "@/assets/icons/arrow-right.svg";
import { FlatList } from "react-native-gesture-handler";
import isMusicAddedToPlaylist from "@/utils/is-music-added-to-playlist";
import addMusicPlaylist from "@/utils/add-music-playlist";
import showToast from "@/utils/toast";
import AddPlaylist from "./add-playlist";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useBottomSheetModal } from "@gorhom/bottom-sheet";
import { BottomSheetModalContextType } from "@gorhom/bottom-sheet/lib/typescript/contexts/modal/external";

interface MusicOptionsInformationProps extends DrawerProps {
  music: MediaLibrary.Asset;
}

interface MusicOptionsAddToPlaylistProps extends DrawerProps {
  music: MediaLibrary.Asset;
  stackBehavior?: "push" | "replace";
}

interface RenderMusicOptionsAddToPlaylistItemProps extends DrawerProps {
  music: MediaLibrary.Asset;
}

interface MusicOptionsInformationContentProps extends ViewProps {
  title: string;
  description: string;
  icon: React.ReactElement<SvgProps>;
}

interface MusicOptionsAddToPlaylistItemProps extends DrawerProps {
  item: IPlaylist;
  music: MediaLibrary.Asset;
  title: string;
  description: string;
}

export function MusicOptionsInformation(
  props: MusicOptionsInformationProps
): React.JSX.Element {
  const lastMusicModified: string = new Date(
    props.music?.modificationTime
  ).toLocaleDateString();
  const parsedDuration: string = parseDuration(String(props.music?.duration));

  return (
    <Drawer modalRef={props.modalRef} snapPoints={["44%", "53%"]}>
      <DrawerWrapper>
        <View style={musicOptionsInformationStyles.headerWrapper}>
          <MusicSVG width={30} height={30} />
          <Text style={musicOptionsInformationStyles.headerTitle}>
            {props.music?.filename}
          </Text>
        </View>
        <View style={musicOptionsInformationStyles.contentContainer}>
          <MusicOptionsInformationContent
            title="Duration"
            description={parsedDuration}
            icon={<PlaySVG />}
          />
          <MusicOptionsInformationContent
            title="Last Modified"
            description={lastMusicModified}
            icon={<RoundedArrowSVG />}
          />
        </View>
        <View style={musicOptionsInformationStyles.contentContainer}>
          <MusicOptionsInformationContent
            title="Music Location"
            description={props.music?.uri}
            icon={<LocationSVG />}
          />
        </View>
      </DrawerWrapper>
    </Drawer>
  );
}

export function MusicOptionsInformationContent(
  props: MusicOptionsInformationContentProps
): React.JSX.Element {
  return (
    <View style={musicOptionsInformationStyles.contentWrapper}>
      {props.icon}
      <View>
        <Text style={musicOptionsInformationStyles.contentMetadataTitle}>
          {props.title}
        </Text>
        <Text style={musicOptionsInformationStyles.contentMetadataDescription}>
          {props.description}
        </Text>
      </View>
    </View>
  );
}

export function MusicOptionsAddToPlaylist(
  props: MusicOptionsAddToPlaylistProps
): React.JSX.Element {
  const addPlaylistDrawerRef: React.MutableRefObject<BottomSheetModalMethods | null> =
    React.useRef<BottomSheetModalMethods | null>(null);

  return (
    <>
      <Drawer
        modalRef={props.modalRef}
        snapPoints={["30%", "50%"]}
        stackBehavior={props.stackBehavior}
      >
        <View style={musicOptionsAddToPlaylistStyles.wrapper}>
          <TouchableOpacity
            onPress={() => addPlaylistDrawerRef.current?.present()}
            activeOpacity={0.6}
            style={musicOptionsAddToPlaylistStyles.addPlaylistWrapper}
          >
            <>
              <PlusCircleSVG width={35} height={35} />
              <View>
                <Text style={musicOptionsAddToPlaylistStyles.addPlaylistTitle}>
                  Add Playlist
                </Text>
                <Text
                  style={musicOptionsAddToPlaylistStyles.addPlaylistDescription}
                >
                  Add your playlist collection
                </Text>
              </View>
            </>
          </TouchableOpacity>
          <View style={musicOptionsAddToPlaylistStyles.separator}></View>
          <RenderMusicOptionsAddToPlaylistItem
            music={props.music}
            modalRef={props.modalRef}
          />
        </View>
      </Drawer>
      <AddPlaylist modalRef={addPlaylistDrawerRef} />
    </>
  );
}

export function RenderMusicOptionsAddToPlaylistItem(
  props: RenderMusicOptionsAddToPlaylistItemProps
): React.JSX.Element {
  const list: PlaylistScheme = usePlaylistStore((state) =>
    JSON.parse(state.playlist)
  ) as PlaylistScheme;

  return (
    <FlatList
      keyExtractor={(item) => String(item.id)}
      style={renderMusicOptionsAddToPlaylistItemStyles.container}
      data={list.playlist}
      renderItem={(data) => (
        <MusicOptionsAddToPlaylistItem
          modalRef={props.modalRef}
          music={props.music}
          item={data.item}
          title={data.item.title}
          description={`${data.item.totalSongs} Songs - ${new Date(data.item.createdAt).toLocaleDateString()}`}
        />
      )}
    />
  );
}

export function MusicOptionsAddToPlaylistItem(
  props: MusicOptionsAddToPlaylistItemProps
): React.JSX.Element {
  const { dismissAll }: BottomSheetModalContextType = useBottomSheetModal();
  const refreshPlaylist: RefreshPlaylist = usePlaylistStore(
    (state) => state.refresh
  );

  const addMusicPlaylistItem: () => void = React.useCallback(() => {
    const isMusicIsAlreadyAddedToPlaylist: boolean = isMusicAddedToPlaylist(
      props.item,
      props.music
    );

    if (isMusicIsAlreadyAddedToPlaylist) {
      dismissAll();
      showToast(`Music already added to "${props.item.title}"`);
      return;
    }

    addMusicPlaylist(props.item, props.music);
    refreshPlaylist();
    dismissAll();
  }, []);

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => addMusicPlaylistItem()}
      style={musicOptionsAddToPlaylistItemStyles.container}
    >
      <View style={musicOptionsAddToPlaylistItemStyles.headerWrapper}>
        <AlbumSVG width={32} height={32} />
        <View>
          <Text
            style={musicOptionsAddToPlaylistItemStyles.title}
            numberOfLines={1}
          >
            {props.title}
          </Text>
          <Text
            style={musicOptionsAddToPlaylistItemStyles.description}
            numberOfLines={1}
          >
            {props.description}
          </Text>
        </View>
      </View>
      <ArrowRightSVG width={20} height={20} opacity={0.9} />
    </TouchableOpacity>
  );
}

const renderMusicOptionsAddToPlaylistItemStyles = StyleSheet.create({
  container: {
    paddingVertical: 3,
    height: "78%",
  },
});

const musicOptionsAddToPlaylistItemStyles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    opacity: 0.85,
    borderRadius,
  },
  headerWrapper: {
    gap: 10,
    alignItems: "center",
    flexDirection: "row",
    width: "75%",
  },
  title: {
    fontFamily: "medium",
    fontSize: 16,
  },
  description: {
    fontSize: 12,
    opacity: 0.8,
  },
});

const musicOptionsAddToPlaylistStyles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 8,
  },
  addPlaylistWrapper: {
    flexDirection: "row",
    padding: 6,
    paddingVertical: 10,
    gap: 5,
    borderRadius,
    alignItems: "center",
    opacity: 0.9,
  },
  addPlaylistTitle: {
    fontFamily: "bold",
    fontSize: 15,
  },
  addPlaylistDescription: {
    opacity: 0.8,
    fontSize: 12,
  },
  separator: {
    borderBottomColor: borderColor,
    borderBottomWidth: 1,
  },
});

const musicOptionsInformationStyles = StyleSheet.create({
  headerWrapper: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    borderColor,
    borderWidth: 1,
    borderRadius,
    padding: 8,
  },
  headerTitle: {
    fontFamily: "medium",
    width: "92%",
    fontSize: 13.5,
  },
  contentContainer: {
    marginTop: 10,
    flexDirection: "row",
    gap: rowsGap,
  },
  contentWrapper: {
    borderRadius,
    borderColor,
    borderWidth: 1,
    padding: 10,
    flex: 1,
  },
  contentMetadataTitle: {
    fontSize: 14,
    fontFamily: "bold",
  },
  contentMetadataDescription: {
    opacity: 0.8,
    fontSize: 11,
  },
});
