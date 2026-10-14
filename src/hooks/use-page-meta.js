import { useEffect } from "react";

/** Sets the document title and meta description for the current route. */
export const usePageMeta = (title, description) => {
  useEffect(() => {
    document.title = title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", description);
  }, [title, description]);
};
