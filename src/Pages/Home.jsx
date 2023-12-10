import MainLayout from "../Layouts/MainLayout";
import CactusKeno from "../components/CactusKeno";
import ComingSoon from "../components/ComingSoon";
import Hero from "../components/Hero";
import MobileLogSignIn from "../components/MobileLogSignIn";
import Offer from "../components/Offer";
import RecentWinner from "../components/RecentWinner";

const Home = () => {
  return (
    <MainLayout>
      <Hero />
      <CactusKeno/>
      <RecentWinner/>
      <Offer/>
      <ComingSoon/>
      {/* <MobileLogSignIn/> */}
    </MainLayout>
  );
};

export default Home;
