import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

const ScrollManager = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return undefined;
    }
    // The target may live in a lazily loaded route, so wait for it to exist (up to ~3s).
    let tries = 0;
    const timer = setInterval(() => {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView();
        clearInterval(timer);
      } else if (++tries > 60) {
        clearInterval(timer);
      }
    }, 50);
    return () => clearInterval(timer);
  }, [pathname, hash]);
  return null;
};

export const Layout = () => {
  const { pathname } = useLocation();
  return (
    <div className="min-h-screen">
      <a href="#main" className="skip-link">Skip to content</a>
      <ScrollManager />
      <Navbar />
      <main id="main" key={pathname} className="page-in">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
