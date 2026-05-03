import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function Layout() {
  const { mode } = useSelector(s => s.theme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', mode === 'dark');
  }, [mode]);

  return (
    <div className="min-h-screen flex flex-col bg-primary-50 dark:bg-dark-950 transition-colors duration-300">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
