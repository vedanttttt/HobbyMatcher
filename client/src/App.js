import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Messenger from "./pages/messenger/Messenger";
import Explore from "./pages/explore/Explore";
import FindByRange from "./pages/findbyrange/FindByRange";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={user ? <Home /> : <Register />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route
          path="/messenger"
          element={!user ? <Navigate to="/" /> : <Messenger />}
        />
        <Route
          path="/explore"
          element={!user ? <Navigate to="/" /> : <Explore />}
        />
        <Route
          path="/findbyrange"
          element={!user ? <Navigate to="/" /> : <FindByRange />}
        />
        <Route
          path="/profile/:username"
          element={user ? <Profile /> : <Register />}
        />
      </Routes>
    </Router>
  );
}

export default App;
