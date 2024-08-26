import { Outlet, useNavigate } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppContext } from "./context/AppContext";
import { useEffect } from "react";

function App() {
  const { loggedUser } = useAppContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!loggedUser.email) {
      navigate("/login");
    }
  }, [loggedUser]);
  return (
    <>
      <Header />
      <Navbar />
      <Outlet />
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
