import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import OurStory from './pages/OurStory';
import Products from './pages/Products';
import Distributor from './pages/Distributor';
import ContactUs from './pages/ContactUs';
import LegalPage from './pages/LegalPage';
import type { Page } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} />;
      case 'about':
        return <AboutUs onNavigate={handleNavigate} />;
      case 'story':
        return <OurStory onNavigate={handleNavigate} />;
      case 'products':
        return <Products onNavigate={handleNavigate} />;
      case 'distributor':
        return <Distributor />;
      case 'contact':
        return <ContactUs />;
      case 'privacy':
        return <LegalPage page="privacy" onNavigate={handleNavigate} />;
      case 'terms':
        return <LegalPage page="terms" onNavigate={handleNavigate} />;
      case 'safety':
        return <LegalPage page="safety" onNavigate={handleNavigate} />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      <main className="flex-1">
        {renderPage()}
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
