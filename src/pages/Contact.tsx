import React, { useState } from "react";
import { Container, Typography, Box, TextField, Button, Grid, Paper, Stack, Alert } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

const Contact: React.FC = () => {
  const cyberBlue = "#00BFFF";
  
  // 1. Status management for the transmission
  const [status, setStatus] = useState<"IDLE" | "SENDING" | "SUCCESS" | "ERROR">("IDLE");

  const fieldStyles = {
    "& .MuiOutlinedInput-root": {
      color: "white",
      fontFamily: "'Fira Code', monospace",
      "& fieldset": { borderColor: "rgba(0, 191, 255, 0.2)" },
      "&:hover fieldset": { borderColor: "rgba(0, 191, 255, 0.5)" },
      "&.Mui-focused fieldset": { 
        borderColor: cyberBlue, 
        boxShadow: `0 0 15px ${cyberBlue}44` 
      },
    },
    "& .MuiInputLabel-root": { color: "rgba(255, 255, 255, 0.5)", fontFamily: 'monospace' },
    "& .MuiInputLabel-root.Mui-focused": { color: cyberBlue },
    mb: 2
  };

  // 2. The Logic to talk to the .NET Backend
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("SENDING");

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // Construct the JSON object to match the .NET 'ContactRequest' class
    const transmissionData = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message")
    };

    try {
      // NOTE: Ensure the port (5000/5123) matches the dotnet run output!
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contact/send`, { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transmissionData),
      });

      if (response.ok) {
        setStatus("SUCCESS");
        form.reset();
        setTimeout(() => setStatus("IDLE"), 6000); // Reset UI after 6 seconds
      } else {
        setStatus("ERROR");
      }
    } catch (error) {
      console.error("Uplink Error:", error);
      setStatus("ERROR");
    }
  };

  const InfoCard = ({ icon, title, value, link }: { icon: any, title: string, value: string, link?: string }) => (
    <Paper
      component={link ? "a" : "div"}
      href={link}
      target={link ? "_blank" : undefined}
      sx={{
        p: 2.5,
        display: "flex",
        alignItems: "center",
        textDecoration: "none",
        bgcolor: "rgba(20, 20, 25, 0.7)",
        border: "1px solid rgba(0, 191, 255, 0.2)",
        backdropFilter: "blur(10px)",
        transition: "0.3s",
        cursor: link ? "pointer" : "default",
        "&:hover": {
          borderColor: cyberBlue,
          transform: "translateX(10px)", 
          boxShadow: `0 0 20px ${cyberBlue}33`,
          "& .icon-box": { color: "white", bgcolor: cyberBlue }
        }
      }}
    >
      <Box className="icon-box" sx={{ p: 1.5, borderRadius: 1, display: "flex", mr: 2, color: cyberBlue, bgcolor: "rgba(0, 191, 255, 0.1)", transition: "0.3s" }}>
        {icon}
      </Box>
      <Box>
        <Typography variant="caption" sx={{ color: cyberBlue, fontWeight: "bold", display: "block", mb: 0.5 }}>{title}</Typography>
        <Typography variant="body2" sx={{ color: "white", fontFamily: "monospace" }}>{value}</Typography>
      </Box>
    </Paper>
  );

  return (
    <Container maxWidth="lg" sx={{ mt: { xs: 10, md: 18 }, mb: 10, position: "relative", zIndex: 1 }}>
      
      <Box sx={{ mb: 6, textAlign: 'left' }}>
        <Typography variant="h3" sx={{ color: "white", fontWeight: "bold", mb: 1 }}>
          Let's <span style={{ color: cyberBlue }}>Connect.</span>
        </Typography>
        <Typography variant="body1" sx={{ color: "#aaa", maxWidth: "600px" }}>
          Ready to initialize a project or just want to chat about game dev? 
          Send a transmission or find me on the grid.
        </Typography>
      </Box>

      <Grid container spacing={5}>
        <Grid size={{ xs: 12, md: 7 }}>
          <Box sx={{ p: 4, bgcolor: "rgba(10, 10, 15, 0.7)", border: `1px solid rgba(255,255,255,0.1)`, borderRadius: 1, backdropFilter: "blur(12px)" }}>
            
            <form onSubmit={handleSubmit}>
              <TextField fullWidth name="name" label="// YOUR FULL NAME" variant="outlined" sx={fieldStyles} required />
              <TextField fullWidth name="email" type="email" label="// YOUR_EMAIL_ADDRESS@EXAMPLE.COM" variant="outlined" sx={fieldStyles} required />
              <TextField fullWidth name="subject" label="// PROJECT_SUBJECT" variant="outlined" sx={fieldStyles} required />
              <TextField 
                fullWidth 
                name="message"
                label="// TELL ME MORE ..." 
                multiline 
                rows={4} 
                variant="outlined" 
                sx={fieldStyles} 
                required
              />
              
              <Button 
                type="submit"
                fullWidth 
                variant="contained" 
                size="large"
                disabled={status === "SENDING"}
                endIcon={<SendIcon />}
                sx={{ 
                  mt: 2,
                  bgcolor: status === "SUCCESS" ? "#4caf50" : cyberBlue,
                  color: "black",
                  fontWeight: "bold",
                  transition: "0.3s",
                  "&:hover": { bgcolor: "white", boxShadow: `0 0 20px white` }
                }}
              >
                {status === "SENDING" ? "TRANSMITTING..." : status === "SUCCESS" ? "TRANSMISSION SUCCESSFUL" : "INITIALIZE TRANSMISSION"}
              </Button>
            </form>

            {status === "SUCCESS" && (
              <Alert severity="success" sx={{ mt: 2, bgcolor: "rgba(76, 175, 80, 0.1)", color: "#4caf50" }}>
                Packet delivered. I will respond to your coordinates shortly.
              </Alert>
            )}
            {status === "ERROR" && (
              <Alert severity="error" sx={{ mt: 2, bgcolor: "rgba(244, 67, 54, 0.1)", color: "#f44336" }}>
                Transmission failure. Please try again.
              </Alert>
            )}
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 5 }}>
          <Stack spacing={2}>
            <InfoCard icon={<EmailIcon />} title="EMAIL_STATION" value="Halloultarek1@gmail.com" />
            <InfoCard icon={<LocationOnIcon />} title="LOCATION_COORDINATES" value="Sousse, Tunisia" />
            <InfoCard icon={<LinkedInIcon />} title="LINKEDIN_PROFILE" value="linkedin.com/in/tarek-halloul" link="https://www.linkedin.com/in/tarekhalloul/" />
            <InfoCard icon={<GitHubIcon />} title="GITHUB_CORE" value="github.com/T-Fluffy" link="https://github.com/T-Fluffy" />
            
            <Paper sx={{ p: 2, mt: 2, bgcolor: "rgba(0, 191, 255, 0.05)", border: `1px dashed ${cyberBlue}55`, color: "#ccc" }}>
              <Typography variant="caption" sx={{ color: cyberBlue, fontWeight: 'bold', display: 'block' }}>SYSTEM_RESPONSE_TIME</Typography>
              <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>&lt; 24h (Avg. Latency)</Typography>
            </Paper>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Contact;