import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  Typography,
  Chip,
  IconButton,
  Stack,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import StarIcon from "@mui/icons-material/Star";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import type { BookData } from "../../types/BookData";

interface BookMetadataModalProps {
  book: BookData | null;
  onClose: () => void;
}

const cyberBlue = "#00BFFF";

const BookMetadataModal: React.FC<BookMetadataModalProps> = ({ book, onClose }) => {
  return (
    <Dialog
      open={!!book}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: "rgba(10, 10, 15, 0.98)",
          border: "1px solid rgba(0, 191, 255, 0.3)",
          boxShadow: "0 0 40px rgba(0, 191, 255, 0.15)",
          color: "white",
        },
      }}
    >
      {book && (
        <>
          <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2 }}>
            <Typography variant="h6" fontFamily="'Courier New', monospace" fontWeight="bold" color="white">
              METADATA://BOOK_{book.id.padStart(2, "0")}
            </Typography>
            <IconButton onClick={onClose} aria-label="close" sx={{ color: "#888", "&:hover": { color: cyberBlue } }}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers sx={{ borderTop: "1px solid rgba(0, 191, 255, 0.2)", borderBottom: "none" }}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
              {book.image && (
                <Box
                  component="img"
                  src={book.image}
                  alt={`${book.title} cover`}
                  sx={{
                    width: { xs: "100%", sm: 140 },
                    maxWidth: 220,
                    height: "auto",
                    alignSelf: "flex-start",
                    borderRadius: 1,
                    border: "1px solid rgba(0, 191, 255, 0.4)",
                    boxShadow: "0 0 16px rgba(0, 191, 255, 0.25)",
                  }}
                />
              )}
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" fontFamily="'Courier New', monospace" fontWeight="bold" color="white">
                  {book.title}
                </Typography>
                <Typography variant="body2" color="#aaa" sx={{ mt: 0.5 }}>
                  by {book.author}
                </Typography>
                <Stack direction="row" spacing={1} sx={{ mt: 1.5, flexWrap: "wrap", rowGap: 0.5 }}>
                  <Chip
                    label={`[${book.category}]`}
                    size="small"
                    sx={{ bgcolor: "rgba(0, 191, 255, 0.1)", color: cyberBlue, fontWeight: "bold", fontSize: "0.7rem" }}
                  />
                  <Chip
                    label={book.status}
                    size="small"
                    variant="outlined"
                    color={book.status === "Read" ? "success" : book.status === "Reading" ? "primary" : "default"}
                    sx={{ fontSize: "0.7rem" }}
                  />
                </Stack>
                <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mt: 1 }}>
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      fontSize="small"
                      sx={{ color: i < book.rating ? cyberBlue : "rgba(255,255,255,0.1)" }}
                    />
                  ))}
                </Stack>
              </Box>
            </Stack>

            <Typography variant="body2" color="#ccc" sx={{ mt: 3 }}>
              {book.description}
            </Typography>

            <Divider sx={{ my: 2, borderColor: "rgba(0, 191, 255, 0.2)" }} />

            <Typography variant="subtitle2" fontFamily="'Courier New', monospace" fontWeight="bold" color={cyberBlue} sx={{ mb: 1.5 }}>
              &gt; KEY_STRENGTHS
            </Typography>
            <Stack spacing={1.25}>
              {book.highlights.map((highlight) => (
                <Stack key={highlight} direction="row" spacing={1} alignItems="flex-start">
                  <CheckCircleIcon fontSize="small" sx={{ color: cyberBlue, mt: 0.2 }} />
                  <Typography variant="body2" color="#ccc">
                    {highlight}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
};

export default BookMetadataModal;