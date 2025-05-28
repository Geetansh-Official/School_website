import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/organisms/Header';
import Footer from '@/components/organisms/Footer';
import { cn } from '@/lib/utils';

const MainLayout = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header isScrolled={isScrolled} />
      <main className={cn("flex-1 transition-all duration-300")}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;