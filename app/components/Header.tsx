import Navbar from "@/components/Header/Navbar";
import ReloadButton from "@/components/Header/ReloadButton";

const Header = async () => {
  return (
    <nav className="bg-black">
      <Navbar />
      <ReloadButton />
    </nav>
  );
};

export default Header;
