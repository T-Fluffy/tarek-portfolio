import React, { useState } from "react";
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  Button, 
  Chip, 
  Stack,
  Grid,
} from "@mui/material";
import BookIcon from "@mui/icons-material/Book";
import StarIcon from "@mui/icons-material/Star";
import TerminalIcon from '@mui/icons-material/Terminal';
import { booksData } from "../Data/booksData";
import BookMetadataModal from "../components/UI/BookMetadataModal";
import type { BookData } from "../types/BookData";

const BooksPage: React.FC = () => {
  const cyberBlue = "#00BFFF";
  const [selectedBook, setSelectedBook] = useState<BookData | null>(null);

  return (
    <>
      <Container maxWidth="lg" sx={{ py: 8}}>
      
      {/* --- HEADER SECTION --- */}
      <Box 
        mb={6} 
        display="flex" 
        alignItems="center" 
        justifyContent={{ xs: "center", md: "flex-start" }}
        flexWrap="wrap"
        gap={2}
      >
        <TerminalIcon sx={{ color: cyberBlue, fontSize: 40, mr: 1 }} />
        <Box>
          <Typography 
            variant="h3" 
            fontWeight="bold" 
            color="white"
            fontFamily="monospace"
            letterSpacing="-1px"
            sx={{fontSize: { xs: "1.70rem", md: "3.25rem" } }}
          >
            / READS_DATABASE
          </Typography>
          <Typography variant="body2" color="#888">
            Accurate knowledge base for the modern developer.
          </Typography>
        </Box>
      </Box>

      {/* --- BOOK GRID --- */}
      <Grid container spacing={3}>
        {booksData.map((book) => (
          <Grid key={book.id} size={{ xs: 12, md: 6, lg: 4 }}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 3, 
                bgcolor: 'rgba(10, 10, 15, 0.9)',
                border: `1px solid rgba(${cyberBlue.slice(1)}, 0.2)`, // Convert Hex to RGB roughly for MUI border color usage
                borderRadius: '8px',
                position: "relative",
                overflow: "hidden",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": { 
                  transform: "translateY(-5px)", 
                  boxShadow: `0 10px 20px rgba(0, 191, 255, 0.1)`,
                  borderColor: cyberBlue,
                }
              }}
            >
              {/* Decorative Corner Glow */}
              <Box sx={{ position: 'absolute', top: -5, left: -5, width: 30, height: 30, bgcolor: cyberBlue, opacity: 0.1 }} />

              <Stack spacing={2}>
                {/* Book Cover */}
                {book.image && (
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Box
                      component="img"
                      src={book.image}
                      alt={`${book.title} cover`}
                      sx={{
                        width: "100%",
                        maxWidth: 240,
                        height: "auto",
                        borderRadius: 1,
                        border: "1px solid rgba(0, 191, 255, 0.3)",
                        boxShadow: "0 0 18px rgba(0, 191, 255, 0.15)",
                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-3px)",
                          boxShadow: "0 0 28px rgba(0, 191, 255, 0.35)",
                        },
                      }}
                    />
                  </Box>
                )}

                <Box>
                  {/* Category Badge */}
                  <Chip 
                    label={`[${book.category}]`} 
                    size="small" 
                    sx={{ 
                      bgcolor: 'rgba(0, 191, 255, 0.1)', 
                      color: cyberBlue, 
                      fontWeight: 'bold',
                      fontSize: '0.7rem',
                      textTransform: "uppercase",
                      mb: 1
                    }} 
                  />

                  {/* Title & Author */}
                  <Typography variant="h5" gutterBottom sx={{ color: "white", fontFamily: "'Courier New', monospace" }}>
                    {book.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#aaa", fontSize: '0.9rem' }}>
                    by {book.author}
                  </Typography>

                  {/* Reading Status */}
                  <Box sx={{ mt: 1, mb: 1 }}>
                    {book.status === "Read" && (
                      <Chip label="COMPLETED" color="success" size="small" variant="outlined" />
                    )}
                    {book.status === "Reading" && (
                      <Chip label="IN PROGRESS" color="primary" size="small" variant="outlined" />
                    )}
                    {book.status === "To Read" && (
                      <Chip label="PENDING" color="default" size="small" sx={{ borderColor: '#666', color: '#666' }} />
                    )}
                  </Box>

                  {/* Rating */}
                  <Stack direction="row" alignItems="center" spacing={0.5} justifyContent="flex-end">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon 
                        key={i} 
                        fontSize="small" 
                        sx={{ 
                          color: i < book.rating ? cyberBlue : "rgba(255,255,255,0.1)", 
                          verticalAlign: 'middle' 
                        }} 
                      />
                    ))}
                  </Stack>

                  {/* Description */}
                  <Typography variant="body2" sx={{ color: "#ccc", fontSize: "0.8rem", mt: 1 }}>
                    {book.description}...
                  </Typography>
                </Box>

                {/* Actions */}
                <Button 
                  fullWidth 
                  size="small" 
                  variant="outlined" 
                  startIcon={<BookIcon />}
                  onClick={() => setSelectedBook(book)}
                  sx={{
                    color: cyberBlue,
                    borderColor: "rgba(0, 191, 255, 0.3)",
                    "&:hover": {
                      bgcolor: "rgba(0, 191, 255, 0.1)",
                      borderColor: cyberBlue,
                      color: "white"
                    }
                  }}
                >
                  VIEW_METADATA
                </Button>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>

    </Container>

      <BookMetadataModal book={selectedBook} onClose={() => setSelectedBook(null)} />
    </>
  );
};

export default BooksPage;
