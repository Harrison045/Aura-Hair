import { useState, createContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MotionConfig } from 'motion/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Journal from './pages/Journal';
import Shop from './pages/Shop';
import QuizPage from './pages/QuizPage';
import ScrollToTop from './components/ScrollToTop';
import { CartProvider } from './context/CartContext';
import Cart from './components/Cart';

export const CalmModeContext = createContext({
  calmMode: false,
  toggleCalmMode: () => {},
});

export default function App() {
  const [calmMode, setCalmMode] = useState(false);

  useEffect(() => {
    console.log('App: calmMode changed to', calmMode);
    if (calmMode) {
      document.body.classList.add('calm-mode');
    } else {
      document.body.classList.remove('calm-mode');
    }
  }, [calmMode]);

  return (
    <CalmModeContext.Provider value={{ calmMode, toggleCalmMode: () => setCalmMode(!calmMode) }}>
      <CartProvider>
        <MotionConfig reducedMotion={calmMode ? "always" : "user"}>
          <BrowserRouter>
            <ScrollToTop />
            <div className="min-h-screen font-sans text-theme-text theme-transition bg-theme-bg">
              <Navbar />
              <Cart />
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
      </CartProvider>
    </CalmModeContext.Provider>
  );
}
