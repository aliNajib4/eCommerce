import { Outlet } from "react-router-dom";
import { Header, Footer } from "@components/.";
import { store } from "@store/store";
import { Provider } from "react-redux";

const App = () => {
  return (
    <div className="container flex flex-col min-h-screen font-mono">
      <Provider store={store}>
        <Header />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </Provider>
    </div>
  );
};
export default App;
