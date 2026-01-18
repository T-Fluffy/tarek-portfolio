import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { 
  Container, Typography, Box, TextField, Button, 
  Grid, CircularProgress 
} from "@mui/material";
// Import your icons here...

// --- IMPROVED TYPEWRITER ---
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
    '& .MuiOutlinedInput-root': {
      color: "white", // Changed to white for better readability against dark bg
      fontFamily: "'Fira Code', monospace",
      '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
      '&:hover fieldset': { borderColor: cyberBlue },
      '&.Mui-focused fieldset': { borderColor: cyberBlue },
    },
    '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)', fontFamily: 'monospace' },
    '& .MuiInputLabel-root.Mui-focused': { color: cyberBlue },
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Clear any existing toasts before starting
    toast.dismiss();
    setStatus("SENDING");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const transmissionData = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message")
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contact/send`, { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transmissionData),
      });

      if (response.ok) {
        setStatus("SUCCESS");
        
        toast.success(<Typewriter text="> UPLINK_SUCCESS: Message transmitted." />, {
            position: "bottom-right",
            autoClose: 5000,
            theme: "dark",
            style: { border: `1px solid #4caf50`, background: "#0a0a0f" }
        });

        form.reset();
        setTimeout(() => setStatus("IDLE"), 6000); 
      } else {
        throw new Error("Server rejected packet");
      }
    } catch (error) {
      setStatus("ERROR");
      toast.error("> ERROR: Signal lost. Retry transmission.");
      setTimeout(() => setStatus("IDLE"), 4000);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: { xs: 10, md: 18 }, mb: 10, position: "relative" }}>
      <ToastContainer pauseOnFocusLoss={false} pauseOnHover={false} />

      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" sx={{ color: "white", fontWeight: "bold" }}>
          Let's <span style={{ color: cyberBlue }}>Connect.</span>
        </Typography>
      </Box>

      <Grid container spacing={5}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ p: 4, bgcolor: "rgba(10, 10, 15, 0.8)", border: `1px solid rgba(0, 191, 255, 0.1)`, borderRadius: 1, backdropFilter: "blur(10px)" }}>
            <form onSubmit={handleSubmit}>
              <TextField fullWidth name="name" label="// NAME" variant="outlined" sx={fieldStyles} required disabled={status === "SENDING"} />
              <TextField fullWidth name="email" type="email" label="// EMAIL" variant="outlined" sx={fieldStyles} required disabled={status === "SENDING"} />
              <TextField fullWidth name="subject" label="// SUBJECT" variant="outlined" sx={fieldStyles} required disabled={status === "SENDING"} />
              <TextField fullWidth name="message" label="// MESSAGE" multiline rows={4} variant="outlined" sx={fieldStyles} required disabled={status === "SENDING"} />
              
              <Button 
                type="submit"
                fullWidth 
                variant="contained" 
                disabled={status === "SENDING" || status === "SUCCESS"}
                sx={{ 
                  mt: 2, height: "56px",
                  bgcolor: status === "SUCCESS" ? "#4caf50" : cyberBlue,
                  color: "black",
                  fontWeight: "bold",
                  "&:hover": { bgcolor: "white" }
                }}
              >
                {status === "SENDING" ? <CircularProgress size={24} sx={{ color: "black" }} /> : 
                 status === "SUCCESS" ? "TRANSMISSION COMPLETE" : "INITIALIZE UPLINK"}
              </Button>
            </form>
          </Box>
        </Grid>
        
        {/* Your Stack / InfoCards go here */}
      </Grid>
    </Container>
  );
};

export default Contact;