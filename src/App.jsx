import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Menu from "./components/Menu/Menu";
import Banner from "./components/Banner/Banner";
import Footer from "./components/Footer/Footer";
import Service from "./components/Services/Services";

import "./index.css";
import Services from "./components/Services/Services";

const App = () => {
  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 500,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/components/Menu/Menu.jsx" element={<Menu />} />
          <Route path="/Services" element={<Service />} />
          <Route path="/Banner" element={<Banner />} />
          <Route path="/Footer" element={<Footer />} />
        </Routes>
        <Banner />
        <Footer />
      </Router>
    </div>
  );
};

export default App;
