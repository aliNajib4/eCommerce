import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <>
      <h1>header</h1>
      <Outlet />
      <h1>footer</h1>
    </>
  );
};
export default App;
