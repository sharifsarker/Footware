import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppContext } from "../context/AppContext";

const PrivateRoute = ({ children }) => {
  const { loggedUser } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedUser?.email) {
      toast.error("Please Login!");
      return navigate("/login");
    }
  }, [loggedUser, navigate]);
  return children;
};

export default PrivateRoute;
