import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Layout } from "@/components/Layout";
import { Home } from "@/pages/Home";

// The Projects page carries the diagram engine; load it only when visited.
const Projects = lazy(() => import("@/pages/Projects"));

const Loading = () => <div className="min-h-[60vh]" role="status" aria-label="Loading page" />;

function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="projects" element={<Projects />} />
              <Route path="contact" element={<Navigate to="/#contact" replace />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
