import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SEOProps, generateMetaTags, BASE_URL } from "@/lib/seo";

interface PageSEOProps extends SEOProps {
  children?: React.ReactNode;
  schemas?: Record<string, unknown>[];
}

export const PageSEO = ({
  title,
  description,
  keywords,
  ogImage,
  ogType,
  canonicalUrl,
  publishedTime,
  modifiedTime,
  author,
  noindex,
  nofollow,
  schemas = []
}: PageSEOProps) => {
  const location = useLocation();
  const currentUrl = `${BASE_URL}${location.pathname}`;
  
  const meta = generateMetaTags({
    title,
    description,
    keywords,
    ogImage,
    ogType,
    canonicalUrl: canonicalUrl || currentUrl,
    noindex,
    nofollow
  });

  useEffect(() => {
    // Use requestAnimationFrame to defer DOM manipulation
    // This prevents blocking the main thread in Firefox
    const rafId = requestAnimationFrame(() => {
      // Update document title
      document.title = meta.title;

      // Helper function to update or create meta tags
      const updateMeta = (name: string, content: string, isProperty = false) => {
        if (!content) return;
        const attr = isProperty ? "property" : "name";
        let element = document.querySelector(`meta[${attr}="${name}"]`);
        if (!element) {
          element = document.createElement("meta");
          element.setAttribute(attr, name);
          document.head.appendChild(element);
        }
        element.setAttribute("content", content);
      };

      // Update standard meta tags
      updateMeta("description", meta.description);
      updateMeta("keywords", meta.keywords || "");
      updateMeta("robots", meta.robots);

      // Update Open Graph tags
      updateMeta("og:title", meta.ogTitle, true);
      updateMeta("og:description", meta.ogDescription, true);
      updateMeta("og:type", meta.ogType, true);
      updateMeta("og:url", canonicalUrl || currentUrl, true);
      updateMeta("og:image", meta.ogImage ? `${BASE_URL}${meta.ogImage}` : "", true);
      updateMeta("og:site_name", "Dunamis School of Ministry", true);
      updateMeta("og:locale", "en_NG", true);

      // Update Twitter Card tags
      updateMeta("twitter:card", meta.twitterCard);
      updateMeta("twitter:title", meta.twitterTitle);
      updateMeta("twitter:description", meta.twitterDescription);
      updateMeta("twitter:image", meta.twitterImage ? `${BASE_URL}${meta.twitterImage}` : "");

      // Update canonical URL
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement("link");
        canonicalLink.setAttribute("rel", "canonical");
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute("href", canonicalUrl || currentUrl);

      // Add article-specific meta tags if applicable
      if (ogType === "article") {
        if (publishedTime) {
          updateMeta("article:published_time", publishedTime, true);
        }
        if (modifiedTime) {
          updateMeta("article:modified_time", modifiedTime, true);
        }
        if (author) {
          updateMeta("article:author", author, true);
        }
      }

      // Add structured data schemas - only add if not already present
      schemas.forEach((schema, index) => {
        const schemaId = `page-schema-${index}`;
        // Check if schema already exists to avoid duplicates
        let scriptEl = document.querySelector(`script[data-schema="${schemaId}"]`);
        const schemaString = JSON.stringify(schema);
        if (!scriptEl) {
          scriptEl = document.createElement("script");
          scriptEl.setAttribute("type", "application/ld+json");
          scriptEl.setAttribute("data-schema", schemaId);
          document.head.appendChild(scriptEl);
          scriptEl.textContent = schemaString;
        } else if (scriptEl.textContent !== schemaString) {
          // Only update if content changed
          scriptEl.textContent = schemaString;
        }
      });
    });

    // Cleanup function
    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [
    meta,
    canonicalUrl,
    currentUrl,
    ogType,
    publishedTime,
    modifiedTime,
    author,
    schemas
  ]);

  return null;
};

export default PageSEO;
