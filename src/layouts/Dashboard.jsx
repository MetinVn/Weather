import Footer from "./Footer";
import Header from "./Header";
import DefHero from "../layouts/DefHero.jsx";

export default function Dashboard() {
  return (
    <div className="bg-[#ffffff] grid grid-cols-1 justify-between min-h-screen">
      <Header />
      <DefHero />
      <Footer />
    </div>
  );
}
