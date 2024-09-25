import { Outlet } from "react-router-dom";
import { Header, Footer } from "@components/.";
import { store, persistor } from "@store/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "@services/axios-global";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import { useAppDispatch } from "@store/hooks";
import { getUser } from "@store/auth/authSlice";

const AppContent = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          getUser({
            id: user.uid,
            email: user.email,
            firstName: user.displayName,
            lastName: "",
          }),
        );
      } else {
        dispatch(getUser(null));
      }
    });
  }, [dispatch]);

  return (
    <div className="app">
      <Header />
      <main className="container">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <AppContent />
      </PersistGate>
    </Provider>
  );
};
export default App;
