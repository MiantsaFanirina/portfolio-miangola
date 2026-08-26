import { useEffect } from 'react';
import { Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { Navigation } from './components/Navigation/Navigation';
import { Footer } from './components/Footer/Footer';
import { Cursor } from './components/Cursor/Cursor';
import { LoadingScreen } from './components/LoadingScreen/LoadingScreen';
import { Home } from './pages/Home/Home';
import { Project } from './pages/Project/Project';
import { AboutPage } from './pages/About/About';
import { scrollToId } from './utils/scroll';

function Layout() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      window.setTimeout(() => scrollToId(id), 80);
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [location.pathname, location.hash]);

  return (
    <>
      <LoadingScreen />
      <Cursor />
      <Navigation />
      <Outlet />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/work/:slug" element={<Project />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}
