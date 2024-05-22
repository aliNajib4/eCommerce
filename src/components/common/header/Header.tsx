import CategoriesHeadre from "./CategoriesHeadre";
import MainHeader from "./MainHeader";
import TopHeader from "./TopHeader";

const Header = () => {
  return (
    <header className="mb-10">
      <TopHeader />
      <MainHeader />
      <CategoriesHeadre />
    </header>
  );
};

export default Header;
