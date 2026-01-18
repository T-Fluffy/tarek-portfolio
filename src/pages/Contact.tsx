import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { 
  Container, Typography, Box, TextField, Button, 
  Grid, CircularProgress, Stack, Fade 
} from "@mui/material";

const Typewriter = ({ text, speed = 30 }: { text: string; speed?: number }) => {
  const [displayedText, setDisplayedText] = useState("");
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setDisplayedText(text.substring(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(timer);
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);
  return <span style={{ fontFamily: "'Fira Code', monospace" }}>{displayedText}</span>;
};

const Contact: React.FC = () => {
  const cyberBlue = "#00BFFF";
  const [status, setStatus] = useState<"IDLE" | "SENDING" | "SUCCESS" | "ERROR">("IDLE");

  const fieldStyles = {
    mb: 2,
    "& .MuiInputBase-root": {
        color: `${cyberBlue} !important`,
        fontFamily: "'Fira Code', monospace",
    },
    "& .MuiOutlinedInput-root": {
      "& input, & textarea": {
          color: `${cyberBlue} !important`,
          WebkitTextFillColor: `${cyberBlue} !important`,
      },
      "& input:-webkit-autofill": {
          WebkitBoxShadow: `0 0 0 100px #050505 inset !important`,
          WebkitTextFillColor: `${cyberBlue} !important`,
      },
      "& fieldset": { borderColor: "rgba(0, 191, 255, 0.2)" },
      "&:hover fieldset": { borderColor: cyberBlue },
      "&.Mui-focused fieldset": { borderColor: cyberBlue },
    },
    "& .MuiInputLabel-root": { color: "rgba(0, 191, 255, 0.5)", fontFamily: "monospace" },
    "& .MuiInputLabel-root.Mui-focused": { color: cyberBlue },
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("SENDING");
    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contact/send`, { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData)),
      });

      if (response.ok) {
        setStatus("SUCCESS");
        (e.target as HTMLFormElement).reset();
        // Return to IDLE after 6 seconds
        setTimeout(() => setStatus("IDLE"), 6000); 
      } else { throw new Error(); }
    } catch (error) {
      setStatus("ERROR");
      toast.error("> ERROR: Signal Lost");
      setTimeout(() => setStatus("IDLE"), 4000);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ position: "relative", zIndex: 10 }}>
      <ToastContainer />

      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" sx={{ color: "white", fontWeight: "bold" }}>
          Let's <span style={{ color: cyberBlue }}>Connect.</span>
        </Typography>
      </Box>

      <Grid container spacing={5}>
        <Grid size={{ xs: 12, md: 7 }}>
          {/* Main Form Box */}
          <Box sx={{ 
            p: 4, 
            bgcolor: "#050505", 
            border: `1px solid ${cyberBlue}33`, 
            borderRadius: 1,
            boxShadow: `0 0 50px rgba(0, 0, 0, 1)`,
            position: "relative", // 🚀 Required for the center overlay
            overflow: "hidden",
            minHeight: "450px",
            display: "flex",
            flexDirection: "column"
          }}>
            
            {/* 🚀 THE CENTER OVERLAY FIX */}
            <Fade in={status === "SUCCESS"}>
              <Box sx={{
                position: "absolute",
                top: 0, left: 0, right: 0, bottom: 0,
                bgcolor: "rgba(5, 5, 5, 0.9)",
                backdropFilter: "blur(10px)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 20,
                textAlign: "center",
                p: 3
              }}>
                <Box sx={{ 
                  mb: 2, p: 2, 
                  border: `1px solid #4caf50`, 
                  borderRadius: "50%",
                  display: "flex"
                }}>
                  <CircularProgress variant="determinate" value={100} sx={{ color: "#4caf50" }} />
                </Box>
                <Typography variant="h5" sx={{ color: "#4caf50", fontFamily: "monospace", fontWeight: "bold", mb: 1 }}>
                  TRANSMISSION_COMPLETE
                </Typography>
                <Typography sx={{ color: "white", fontFamily: "monospace", opacity: 0.8 }}>
                  {status === "SUCCESS" && <Typewriter text="> Your data packet has been successfully routed to my mainframe. Expect a response soon." />}
                </Typography>
                <Button 
                  onClick={() => setStatus("IDLE")}
                  sx={{ mt: 4, color: cyberBlue, fontFamily: "monospace" }}
                >
                  &gt; SEND_ANOTHER_PACKET
                </Button>
              </Box>
            </Fade>

            <form onSubmit={handleSubmit} style={{ visibility: status === "SUCCESS" ? "hidden" : "visible" }}>
              <TextField fullWidth name="name" label="// NAME" variant="outlined" sx={fieldStyles} required />
              <TextField fullWidth name="email" type="email" label="// EMAIL" variant="outlined" sx={fieldStyles} required />
              <TextField fullWidth name="subject" label="// SUBJECT" variant="outlined" sx={fieldStyles} required />
              <TextField fullWidth name="message" label="// MESSAGE" multiline rows={4} variant="outlined" sx={fieldStyles} required />
              
              <Button 
                type="submit"
                fullWidth 
                variant="contained" 
                disabled={status === "SENDING"}
                sx={{ 
                  mt: 2, height: "56px",
                  bgcolor: "transparent",
                  color: cyberBlue,
                  border: `1px solid ${cyberBlue}`,
                  fontWeight: "bold",
                  "&:hover": { bgcolor: cyberBlue, color: "black" }
                }}
              >
                {status === "SENDING" ? <CircularProgress size={24} sx={{ color: cyberBlue }} /> : "INITIALIZE UPLINK"}
              </Button>
            </form>
          </Box>
        </Grid>
        
        <Grid size={{ xs: 12, md: 5 }}>
           <Stack spacing={3}>
              {/* Info Cards... */}
           </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Contact;