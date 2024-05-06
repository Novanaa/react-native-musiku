import Container from "@/components/atomics/container";
import SearchBar from "@/components/atomics/search-bar";
import { MusicSearchNotFound } from "@/components/molecules/not-found";
import React from "react";
import { StyleSheet } from "react-native";

export default function SearchScreen(): React.JSX.Element {
  return (
    <Container style={styles.container}>
      <SearchBar />
      {/* Change it later on! */}
      <MusicSearchNotFound />
      {/* Change it later on! */}
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 45,
  },
});
