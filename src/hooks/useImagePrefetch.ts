import { useEffect, useRef } from "react";
import { PROJECTS, ProjectItem } from "@/data/projects";

// Warm the HTTP cache AND force decode
const warmImage = (url: string): Promise<void> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.decoding = 'async';
    img.loading = 'eager';
    img.onload = () => {
      // decode() resolves once the bitmap is decoded
      if (img.decode) {
        img.decode().then(() => resolve()).catch(() => resolve());
      } else {
        resolve();
      }
    };
    img.onerror = () => resolve(); // Don't fail on errors
    // Use the exact same URL that will be requested in the component
    img.src = url;
  });
};

export const useImagePrefetch = () => {
  const isWarmingRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined" || isWarmingRef.current) return;
    
    isWarmingRef.current = true;

    // Get all unique image sources (unoptimized, direct URLs)
    const allImageSrcs = Array.from(
      new Set(
        Object.values(PROJECTS)
          .flat()
          .map((p: ProjectItem) => p.imageSrc)
      )
    );

    // Warm all images with requestIdleCallback for non-blocking
    const warmAll = () => {
      allImageSrcs.forEach((src, index) => {
        const delay = index * 50; // Stagger to avoid overwhelming network
        setTimeout(() => {
          (window.requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 0)))(() => {
            warmImage(src);
          });
        }, delay);
      });
    };

    warmAll();
  }, []);

  return { initialized: true };
};

// Hook for warming specific neighbor images in carousel
export const useCarouselImageWarming = (currentIndex: number, items: { imageSrc: string }[]) => {
  useEffect(() => {
    if (typeof window === "undefined" || items.length === 0) return;

    const prevIndex = (currentIndex - 1 + items.length) % items.length;
    const nextIndex = (currentIndex + 1) % items.length;
    
    const neighbors = [
      items[prevIndex]?.imageSrc,
      items[nextIndex]?.imageSrc,
    ].filter(Boolean);

    neighbors.forEach((src) => {
      (window.requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 0)))(() => {
        warmImage(src);
      });
    });
  }, [currentIndex, items]);
};
