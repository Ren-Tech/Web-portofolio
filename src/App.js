import Home from "./pages/Home";
import Frontend from "./pages/Frontend";
import Tools from "./pages/Tools";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import ServersAndHosting from "./pages/ServersAndHosting";
import Backend from "./pages/Backend";
import Footer from "./pages/Footer";
import MeetTheDev from "./pages/MeetTheDev"; // ✅ Add this line

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
