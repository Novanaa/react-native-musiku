import { Folder } from "@/stores/folder";
import { Music } from "@/stores/music";

export default function getFolder(music: Music): Folder {
  return (
    music?.assets
      .map((item) => {
        // Map music data uri
        const splitedFilePath: Array<string> = item.uri.split("/");
        const folderName: string = splitedFilePath[splitedFilePath.length - 2];
        const path: string = item.uri.substring(0, item.uri.lastIndexOf("/"));

        return {
          folderName,
          path,
        };
      })
      .filter(
        // To removes duplicates array datas
        (item, index, self) =>
          index === self.findIndex((t) => t.path === item.path)
      ) || null
  );
}
