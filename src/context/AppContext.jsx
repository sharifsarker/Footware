import React, { createContext, useContext, useState, useEffect } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile
} from "firebase/auth";
import app from "../firebase/firebase.init";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

// Create the context
const AppContext = createContext();

// Create a Provider component
export const AppProvider = ({ children }) => {
  const auth = getAuth(app);
  const [loggedUser, setLoggedUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then(async result => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...

        const res = await axios.post("/users", {
          name: user.displayName,
          email: user.email,
          profilePicture: user.photoURL
        });
        console.log(res.data);
      })
      .catch(error => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const handleLogin = async (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async userCredential => {
        // Signed in
        const user = userCredential.user;
        const res = await axios.get(`/users/${email}`);
        console.log(res);

        if (res.data._id) {
          toast.success("Login Successfully!");
          setLoggedUser(res.data);

          return;
        } else {
          toast.error("Invalid email or password!");
        }
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  };

  const handleRegistration = (name, email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed up
        const user = userCredential.user;

        updateProfile(user, {
          displayName: name
        })
          .then(async () => {
            console.log("Profile updated!");
            const res = await axios.post("/users", { name, email, userRole: "user" });
            console.log(res);

            if (res.data.message) {
              const res = await handleLogin(email, password);
              console.log(res);
              return res;
            }
          })
          .catch(error => {
            // An error occurred
            toast.error(error);
          });
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setLoggedUser({});
        setCart([]);
        return;
      })
      .catch(error => {
        console.log(error);
      });
  };

  async function getUser(email) {
    try {
      const res = await axios.get(`/users/${email}`);
      setLoggedUser(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        if (user.email) {
          getUser(user.email);
        }
      } else {
        console.log("User is signed out");
        setLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  if (loading) {
    return <Loader />;
  }

  return (
    <AppContext.Provider
      value={{
        cart,
        setCart,
        handleGoogleSignIn,
        handleRegistration,
        handleLogin,
        handleLogout,
        setLoggedUser,
        loggedUser
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the CartContext
export const useAppContext = () => {
  return useContext(AppContext);
};
