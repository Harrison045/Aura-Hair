import { useState, createContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MotionConfig } from 'motion/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Journal from './pages/Journal';
import Shop from './pages/Shop';
import QuizPage from './pages/QuizPage';

export const CalmModeContext = createContext({
  calmMode: false,
  toggleCalmMode: () => {},
});

export default function App() {
  const [calmMode, setCalmMode] = useState(false);

  return (
    <CalmModeContext.Provider value={{ calmMode, toggleCalmMode: () => setCalmMode(!calmMode) }}>
      <MotionConfig reducedMotion={calmMode ? "always" : "user"}>
        <BrowserRouter>
          <div className={`min-h-screen font-sans text-brand-charcoal transition-colors duration-1000 ${calmMode ? 'bg-[#F0EBE6]' : 'bg-brand-beige'}`}>
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/quiz" element={<QuizPage />} />
                <Route path="/about" element={<About />} />
                <Route path="/journal" element={<Journal />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </MotionConfig>
    </CalmModeContext.Provider>
  );
}
