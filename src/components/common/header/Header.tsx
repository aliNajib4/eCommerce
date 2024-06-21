import CategoriesHeadre from "./CategoriesHeadre";
import MainHeader from "./MainHeader";

const Header = () => {
  return (
    <header className="mb-10">
      <MainHeader />
      <CategoriesHeadre />
    </header>
  );
};

export default Header;
