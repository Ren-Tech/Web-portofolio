import React from "react";
import Home from "./components/Home";
import Frontend from "./components/Frontend";
import Tools from "./components/Tools";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import ServersAndHosting from "./components/ServersAndHosting";
import Backend from "./components/Backend";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Home />

      <Frontend />
      <Backend />
      <ServersAndHosting />
      <Tools />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
