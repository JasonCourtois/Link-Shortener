import Home from "./components/Home";
import Forward from "./components/Forward";
import './App.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  console.log("App");
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/:id" element={<Forward/>}/>
      </Routes>
    </Router>
  );
}

export default App;
