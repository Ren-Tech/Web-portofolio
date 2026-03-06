import { useState, useEffect } from 'react';
import Home from "./pages/Home";
import Frontend from "./pages/Frontend";
import Tools from "./pages/Tools";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import ServersAndHosting from "./pages/ServersAndHosting";
import Backend from "./pages/Backend";
import Footer from "./pages/Footer";
import MeetTheDev from "./pages/MeetTheDev";
import CoffeeSplashScreen from "./components/SplashScreen"; // ✅ Import splash screen

function App() {
  const [showSplash, setShowSplash] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Check if user has visited before in this session
    const hasVisited = sessionStorage.getItem('hasVisited');
    if (!hasVisited) {
      setShowSplash(true);
      sessionStorage.setItem('hasVisited', 'true');
    } else {
      // If already visited, show content immediately
      setShowContent(true);
    }
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
    // Small delay before showing content for smooth transition
    setTimeout(() => {
      setShowContent(true);
    }, 100);
  };

  return (
    <div className="App">
      {/* ✅ Show splash screen on first visit */}
      {showSplash && (
        <CoffeeSplashScreen onComplete={handleSplashComplete} />
      )}
      
      {/* ✅ Main content - only show after splash completes */}
      {showContent && (
        <>
          <Home />
          <MeetTheDev />
          <Frontend />
          <Backend />
          <ServersAndHosting />
          <Tools />
          <Projects />
          <Contact />
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;