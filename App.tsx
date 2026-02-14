
import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import About from './pages/About';
import ProjectDetail from './pages/ProjectDetail';
import Admin from './pages/Admin';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  React.useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col bg-black">
      {!isAdminPage && <Navbar />}
      <main className="flex-grow">
        {children}
      </main>
      {!isAdminPage && <Footer />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/work/:id" element={<ProjectDetail />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
