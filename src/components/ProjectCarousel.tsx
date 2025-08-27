import { Box, IconButton, Paper } from "@mui/material";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { useCallback, useState, useEffect } from "react";
import ProjectInfoCard, { ProjectInfoCardProps } from "./ProjectInfoCard";
import { useCarouselImageWarming } from "@/hooks/useImagePrefetch";

type ProjectCarouselProps = {
  items: ProjectInfoCardProps[];
  resetTrigger?: number;
};

const ProjectCarousel = ({ items, resetTrigger }: ProjectCarouselProps) => {
  const [index, setIndex] = useState(0);
  const count = items.length;

  const handlePrev = useCallback(() => setIndex((i) => (i - 1 + count) % count), [count]);
  const handleNext = useCallback(() => setIndex((i) => (i + 1) % count), [count]);

  // Warm neighbor images for smooth transitions
  useCarouselImageWarming(index, items);

  useEffect(() => {
    setIndex(0);
  }, [resetTrigger]);

  if (count === 0) return null;

  // Get current, prev, and next items for mounting
  const prevIndex = (index - 1 + count) % count;
  const nextIndex = (index + 1) % count;
  
  const currentItem = items[index];
  const prevItem = items[prevIndex];
  const nextItem = items[nextIndex];

  return (
    <Box role="region" aria-label="Projects">
      <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mt: 2, alignItems: "center" }}>
        <IconButton aria-label="Previous" onClick={handlePrev} disabled={count <= 1}>
          <ArrowBackIosNew sx={{ fontSize: 32 }} />
        </IconButton>

        <Paper 
          elevation={3} 
          sx={{ 
            position: "relative", 
            width: "100%", 
            overflow: "hidden", 
            borderRadius: 2,
            minHeight: 300, // Prevent layout shift
          }}
        >
          {/* Mount current, prev, and next slides for smooth transitions */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              willChange: "transform",
              visibility: "visible",
              pointerEvents: "auto",
              zIndex: 2,
            }}
          >
            <ProjectInfoCard {...currentItem} />
          </Box>
          
          {count > 1 && (
            <>
              {/* Previous slide - pre-mounted but hidden */}
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  willChange: "transform",
                  visibility: "hidden",
                  pointerEvents: "none",
                  zIndex: 1,
                }}
                aria-hidden="true"
              >
                <ProjectInfoCard {...prevItem} />
              </Box>
              
              {/* Next slide - pre-mounted but hidden */}
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  willChange: "transform",
                  visibility: "hidden",
                  pointerEvents: "none",
                  zIndex: 1,
                }}
                aria-hidden="true"
              >
                <ProjectInfoCard {...nextItem} />
              </Box>
            </>
          )}
        </Paper>

        <IconButton aria-label="Next" onClick={handleNext} disabled={count <= 1}>
          <ArrowForwardIos sx={{ fontSize: 32 }} />
        </IconButton>
      </Box>

      <Box component="nav" sx={{ display: "flex", gap: 1, justifyContent: "center", mt: 2 }}>
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              border: "none",
              background: i === index ? "rgba(0,0,0,0.54)" : "rgba(0,0,0,0.12)",
              cursor: "pointer",
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ProjectCarousel;
