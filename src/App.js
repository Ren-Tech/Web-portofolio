// src/App.js
import React from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import Skills from "./components/Skills";
import Tools from "./components/Tools";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

function App() {
  return (
    <div className="App">
      <Header />
      <Home />
      <Skills />
      <Tools />
      <Projects />
      <Contact />
    </div>
  );
}

export default App;
