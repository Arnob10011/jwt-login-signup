import "./App.css";
import { useEffect } from "react";
import Home from "./Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import About from "./About";
import Signup from "./Signup.jsx";
import Login from "./Login";
function App() {
  // const route = useNavigate();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   route("/about");
  // }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
