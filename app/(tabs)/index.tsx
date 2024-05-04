import Header from "@/components/molecules/header";
import Container from "@/components/atomics/container";
import HomeCards from "@/components/molecules/home-cards";
import MusicListHeader from "@/components/molecules/music-list-header";
import MusicList from "@/components/molecules/music-list";

export default function Home() {
  return (
    <Container>
      <Header />
      <HomeCards />
      <MusicListHeader />
      <MusicList />
    </Container>
  );
}
