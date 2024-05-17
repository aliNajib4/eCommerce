import { Outlet } from "react-router-dom";
import { Header, Footer } from "@components/.";

const App = () => {
  return (
    <div className="container flex min-h-screen flex-col font-mono">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
export default App;
