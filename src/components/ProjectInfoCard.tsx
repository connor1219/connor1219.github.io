import { Box, Link, Typography } from "@mui/material";

export type ProjectInfoCardProps = {
  imageSrc: string;
  title: string;
  body: string;
  link?: string;
};

const ProjectInfoCard = ({ imageSrc, title, body, link }: ProjectInfoCardProps) => {
    return (
        <Box
            sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    aspectRatio: "16 / 9",
                    overflow: "hidden",
                }}
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={imageSrc}
                    alt={title}
                    style={{ 
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                    }}
                    loading="eager"
                    decoding="async"
                />
            </Box>
            <Box
                sx={{
                    width: "100%",
                    borderTop: "1px solid",
                    borderColor: "divider",
                    p: 2,
                    backgroundColor: "background.paper",
                    boxShadow: (theme) => theme.shadows[1],
                }}
            >
                {link ? (
                    <Link 
                        href={link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        sx={{ 
                            textDecoration: "none", 
                            "&:hover": { textDecoration: "underline" } 
                        }}
                    >
                        <Typography variant="h6" sx={{ mb: 1, fontWeight: 700 }}>
                            {title}
                        </Typography>
                    </Link>
                ) : (
                    <Typography variant="h6" sx={{ mb: 1, fontWeight: 700 }}>
                        {title}
                    </Typography>
                )}
                <Typography variant="body1" sx={{ color: "text.secondary" }}>
                    {body}
                </Typography>
            </Box>
        </Box>
    );
};

export default ProjectInfoCard;