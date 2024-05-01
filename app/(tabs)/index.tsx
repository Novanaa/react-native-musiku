import Header from "@/components/molecules/header";
import Container from "@/components/atomics/container";
import HomeCards from "@/components/molecules/home-cards";
import MusicListHeader from "@/components/molecules/music-list-header";

export default function Home() {
  return (
    <Container>
      <Header />
      <HomeCards />
      <MusicListHeader />
    </Container>
  );
}
