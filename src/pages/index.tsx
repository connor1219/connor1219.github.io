import { Box, IconButton, Link, Typography } from "@mui/material";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Image from "next/image";
import { useState } from "react";
import ProjectCarousel from "@/components/ProjectCarousel";
import { PROJECTS, Category } from "@/data/projects";

const Home = () => {
  const [category, setCategory] = useState<Category>(Category.GENERAL);
  const [resetCounter, setResetCounter] = useState(0);
  const items = PROJECTS[category];

  const handleFishClick = () => {
    if (category === Category.GENERAL) {
      setCategory(Category.FISHING);
    } else {
      setCategory(Category.GENERAL);
    }
    setResetCounter(prev => prev + 1);
  };

  const getTitle = () => {
    if (category === Category.FISHING) {
      return "Fisherman";
    }
    return "Software Developer";
  };

  const getIconSrc = () => {
    if (category === Category.FISHING) {
      return "/icon/mac.png";
    }
    return "/icon/rainbow-trout.png";
  };

  const getIconAlt = () => {
    if (category === Category.FISHING) {
      return "Mac";
    }
    return "Fishing";
  };

     return (
     <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
         <Box sx={{ flexGrow: 1, position: "relative", display: "flex", alignItems: "center" }}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        justifyContent: "center",
                        height: "100%",
                        width: "100vw",
                        position: "relative",
                        zIndex: 1,
                    }}
                >
                    <Box
                        sx={{
                            flex: { xs: "0 0 auto", md: "1 1 50%" },
                            minWidth: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            px: 3,
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                textAlign: "center",
                                gap: 2,
                                maxWidth: 520,
                                width: "100%",
                                marginTop: { xs: 10, md: 0 },
                            }}
                        >
                                                         <Typography variant="h3">Connor Morgan</Typography>
                             <Typography variant="h6">
                                 {getTitle()}
                             </Typography>
                            <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
                                <Link
                                    href="https://www.linkedin.com/in/connor-morgan-custom"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="LinkedIn"
                                >
                                    <FaLinkedin size={24} />
                                </Link>
                                <Link
                                    href="https://github.com/connor1219"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="GitHub"
                                >
                                    <FaGithub size={24} />
                                </Link>
                            </Box>
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            flex: { xs: "0 0 auto", md: "1 1 75%" },
                            minWidth: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            px: 3,
                            py: { xs: 2, md: 0 },
                            flexDirection: "column",
                        }}
                    >
                        <Box sx={{ width: "100%" }}>
                             <ProjectCarousel items={items} resetTrigger={resetCounter} />
                        </Box>
                    </Box>
                                </Box>


        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton onClick={handleFishClick}>
                <Image 
                    src={getIconSrc()} 
                    alt={getIconAlt()} 
                    width={64} 
                    height={64} 
                    unoptimized 
                />
            </IconButton>
        </Box>
    </Box>
  );
};

export default Home;
