import Container from "@/components/atomics/container";
import SearchBar from "@/components/atomics/search-bar";
import React from "react";
import { StyleSheet } from "react-native";

export default function SearchScreen(): React.JSX.Element {
  return (
    <Container style={styles.container}>
      <SearchBar />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 45,
  },
});
