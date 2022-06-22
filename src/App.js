import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";

import Movie from "./components/Movie/Movie";
import Header from "./components/Header/Header";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import MovieDetail from "./components/MovieDetail/MovieDetail";
import useAuthHooks from "./components/hooks/useAuthHooks";

import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Profile from "./components/Profile/Profile";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [user, setUser] = useAuthHooks();

  function logout() {
    window.localStorage.removeItem("jwtToken");
    setUser(null);
  }

  return (
    <div>
      <BrowserRouter>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Header user={user} logout={logout} />
        <Routes>
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route
            path="/movie"
            element={
              <PrivateRoute>
                <Movie />
              </PrivateRoute>
            }
          />
          <Route
            path="/movie/:title"
            element={
              <PrivateRoute>
                <MovieDetail />
              </PrivateRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />

          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
