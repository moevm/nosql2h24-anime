import React from "react";
import './styles/App.css'
import Navbar from "./components/NavBar";
import useRoutes from './routes/routes';

function App() {

  const routes = useRoutes()
  return (
      <>

          {routes}
      </>
  );
}

export default App;
