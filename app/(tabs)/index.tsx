import { backgroundColor } from "@/constants/colors";
import Header from "@/components/molecules/header";
import Container from "@/components/atomics/container";
import HomeCards from "@/components/molecules/home-cards";

export default function Home() {
  return (
    <Container style={{ backgroundColor, flex: 1 }}>
      <Header />
      <HomeCards />
    </Container>
  );
}
