import { Outlet } from "react-router-dom";
import { Header, Footer } from "@components/.";
import { store, persistor } from "@store/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "@services/axios-global";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <Header />
        <div className="container flex min-h-screen flex-col font-mono">
          <main className="flex-grow">
            <Outlet />
          </main>
        </div>
        <Footer />
      </PersistGate>
    </Provider>
  );
};
export default App;
