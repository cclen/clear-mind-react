import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// Routes use to be Switch
import './App.css';

// components
import Home from "./components/Home";
import Slider from "./components/Slider";
import Store from "./components/Store";
import Files from "./components/Files";


function App() {
  return (
    <div className="app">
      <Router>
        <nav className="mainNav">
          <Link to="/">Home</Link>
          <Link to="/slider">Slider</Link>
          <Link to="/store">Store</Link>
          <Link to="/files">Files</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/slider" element={<Slider />}></Route>
          <Route path="/store" element={<Store />}></Route>
          <Route path="/files" element={<Files />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
