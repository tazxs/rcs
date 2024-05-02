// App.js

import "./styles/main.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ImageGeneratorPage from './components/ImageGeneratorPage'; 
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Project from "./pages/Project";
// import Contacts from "./pages/Contacts";
import BotPage from './components/BotPage'; 
import ServiceUnavailable from "./components/ServiceUnavailable"; 

import ScrollToTop from "./utils/scrollToTop";

function App() {
  return (
    <div className="App">
      <Router>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/project/:id" element={<Project />} />
          <Route path="/contacts" element={<ServiceUnavailable />} />
		  <Route path="/bot" element={<BotPage />} />
		  <Route path="/image-generator" element={<ImageGeneratorPage />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
