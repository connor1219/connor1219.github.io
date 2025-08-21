import { Box, IconButton, Paper } from "@mui/material";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { useCallback, useState, useEffect } from "react";
import ProjectInfoCard, { ProjectInfoCardProps } from "./ProjectInfoCard";

type ProjectCarouselProps = {
  items: ProjectInfoCardProps[];
  resetTrigger?: number;
};

const ProjectCarousel = ({ items, resetTrigger }: ProjectCarouselProps) => {
  const [index, setIndex] = useState(0);
  const count = items.length;

  const handlePrev = useCallback(() => setIndex((i) => (i - 1 + count) % count), [count]);
  const handleNext = useCallback(() => setIndex((i) => (i + 1) % count), [count]);

  useEffect(() => {
    setIndex(0);
  }, [resetTrigger]);

  if (count === 0) return null;
  const current = items[index];

  return (
    <Box role="region" aria-label="Projects">
      <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mt: 2, alignItems: "center" }}>
        <IconButton aria-label="Previous" onClick={handlePrev} disabled={count <= 1}>
          <ArrowBackIosNew sx={{ fontSize: 32 }} />
        </IconButton>

        <Paper elevation={3} sx={{ position: "relative", width: "100%", overflow: "hidden", borderRadius: 2 }}>
          <ProjectInfoCard {...current} />
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
