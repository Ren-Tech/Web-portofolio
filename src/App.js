import Home from "./components/Home";
import Frontend from "./components/Frontend";
import Tools from "./components/Tools";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import ServersAndHosting from "./components/ServersAndHosting";
import Backend from "./components/Backend";
import Footer from "./components/Footer";
import MeetTheDev from "./components/MeetTheDev"; // ✅ Add this line

function App() {
  return (
    <div className="App">
      <Home />
      <MeetTheDev /> {/* ✅ Now it works */}
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
