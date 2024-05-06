import React from "react";
import Container from "@/components/atomics/container";
import FolderList from "@/components/molecules/folder-list";

export default function FoldersScreen(): React.JSX.Element {
  return (
    <Container>
      <FolderList />
    </Container>
  );
}
