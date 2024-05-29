import { Outlet } from "react-router-dom";
import { Header, Footer } from "@components/.";
import { store, persistor } from "@store/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const App = () => {
  return (
    <div className="container flex min-h-screen flex-col font-mono">
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <Header />
          <main className="flex-grow">
            <Outlet />
          </main>
          <Footer />
        </PersistGate>
      </Provider>
    </div>
  );
};
export default App;
