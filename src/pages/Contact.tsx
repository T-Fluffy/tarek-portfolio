import React from "react";
import { Container, Typography, Box, TextField, Button, Grid, Paper } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

const Contact: React.FC = () => {
  const cyberBlue = "#00BFFF";

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

  return (
    <Container maxWidth="md" sx={{ mt: 15, mb: 10, position: "relative", zIndex: 1 }}>
      {/* Suppression de 'item' et utilisation de 'size' pour les colonnes */}
      <Grid container spacing={4}>
        
        {/* Colonne de Gauche : Infos */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Box sx={{ textAlign: 'left', mb: 4 }}>
            <Typography variant="h3" sx={{ color: "white", fontWeight: "bold", mb: 2 }}>
              Let's <span style={{ color: cyberBlue }}>Connect.</span>
            </Typography>
            <Typography variant="body1" sx={{ color: "#aaa", mb: 4, lineHeight: 1.6 }}>
              Whether you have a question about **Unity shaders**, a **React** project, 
              or just want to talk about the future of gaming—my inbox is always open.
            </Typography>
            
            <Paper sx={{ p: 2, bgcolor: "rgba(0,0,0,0.3)", borderLeft: `3px solid ${cyberBlue}`, color: "#ccc" }}>
              <Typography variant="caption" display="block" sx={{ color: cyberBlue, fontWeight: 'bold' }}>
                EXPECTED_RESPONSE_TIME
              </Typography>
              <Typography variant="body2">
                &lt; 24 Hours (Standard Operating Cycles)
              </Typography>
            </Paper>
          </Box>
        </Grid>

        {/* Colonne de Droite : Formulaire */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Box sx={{ 
            p: 4, 
            bgcolor: "rgba(10, 10, 15, 0.7)", 
            border: `1px solid rgba(255,255,255,0.1)`, 
            borderRadius: 1, 
            backdropFilter: "blur(12px)" 
          }}>
            <form>
              <TextField fullWidth label="// USERNAME" variant="outlined" sx={fieldStyles} />
              <TextField fullWidth label="// EMAIL_ADDRESS" variant="outlined" sx={fieldStyles} />
              <TextField fullWidth label="// SUBJECT" variant="outlined" sx={fieldStyles} />
              <TextField 
                fullWidth 
                label="// MESSAGE_BODY" 
                multiline 
                rows={4} 
                variant="outlined" 
                sx={fieldStyles} 
                placeholder="Type your message here..."
              />
              
              <Button 
                fullWidth 
                variant="contained" 
                size="large"
                endIcon={<SendIcon />}
                sx={{ 
                  mt: 2,
                  bgcolor: cyberBlue,
                  color: "black",
                  fontWeight: "bold",
                  "&:hover": { 
                    bgcolor: "white",
                    boxShadow: `0 0 20px white`
                  }
                }}
              >
                INITIALIZE TRANSMISSION
              </Button>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Contact;