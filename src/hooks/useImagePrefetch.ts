import { useQueries } from "@tanstack/react-query";
import { PROJECTS, ProjectItem } from "@/data/projects";

// Fixed size for consistent URLs
const IMAGE_WIDTH = 800;
const IMAGE_QUALITY = 75;

// Build consistent Next.js Image URL
const buildImageUrl = (src: string) => {
  if (typeof window === "undefined") return ""; // SSR guard
  const u = new URL("/_next/image", window.location.origin);
  u.searchParams.set("url", src);
  u.searchParams.set("w", IMAGE_WIDTH.toString());
  u.searchParams.set("q", IMAGE_QUALITY.toString());
  return u.toString();
};

// Fetch image as blob for caching
const fetchImageBlob = async (src: string): Promise<Blob> => {
  const url = buildImageUrl(src);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch image: ${response.statusText}`);
  }
  return response.blob();
};

export const useImagePrefetch = () => {
  // Get all unique image sources
  const allImageSrcs = Array.from(
    new Set(
      Object.values(PROJECTS)
        .flat()
        .map((p: ProjectItem) => p.imageSrc)
    )
  );

  // Prefetch all images using TanStack Query useQueries (client-side only)
  const queries = useQueries({
    queries: allImageSrcs.map((src) => ({
      queryKey: ["image", src],
      queryFn: () => fetchImageBlob(src),
      enabled: typeof window !== "undefined", // Only run on client
      staleTime: Infinity, // Images never go stale
      gcTime: 1000 * 60 * 60 * 24, // Keep in cache for 24 hours
    })),
  });

  return {
    isLoading: queries.some(q => q.isLoading),
    isError: queries.some(q => q.isError),
    allLoaded: queries.every(q => q.isSuccess),
  };
};

export { IMAGE_WIDTH, IMAGE_QUALITY };
