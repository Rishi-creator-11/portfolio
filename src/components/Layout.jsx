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
    // The target may live in a lazily loaded route, and layout above it can still shift while fonts and
    // images settle. Wait for it to exist, then re-assert for ~1.5s unless the visitor scrolls first.
    let tries = 0;
    let settle = 0;
    let stop = () => {};
    const timer = setInterval(() => {
      const el = document.getElementById(hash.slice(1));
      if (!el) {
        if (++tries > 60) clearInterval(timer);
        return;
      }
      if (settle === 0) {
        const cancel = () => { clearInterval(timer); stop(); };
        ["wheel", "touchstart", "keydown"].forEach((ev) => window.addEventListener(ev, cancel, { once: true, passive: true }));
        stop = () => ["wheel", "touchstart", "keydown"].forEach((ev) => window.removeEventListener(ev, cancel));
      }
      if (settle === 0 || Math.abs(el.getBoundingClientRect().top - 72) > 4) el.scrollIntoView();
      if (++settle > 15) { clearInterval(timer); stop(); }
    }, 100);
    return () => { clearInterval(timer); stop(); };
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
