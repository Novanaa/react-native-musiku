import Container from "@/components/atomics/container";
import SearchBar from "@/components/atomics/search-bar";
import SearchList from "@/components/molecules/search-list";
import React from "react";
import { StyleSheet } from "react-native";

export default function SearchScreen(): React.JSX.Element {
  const [keyword, setkeyword] = React.useState<string>("");

  return (
    <Container style={styles.container}>
      <SearchBar onChangeText={(text: string) => setkeyword(text)} />
      <SearchList keyword={keyword} />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 45,
  },
});
