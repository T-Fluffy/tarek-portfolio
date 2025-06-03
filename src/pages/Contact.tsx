import React from "react";
import CanvasBackground from "../components/UI/CanvasBackground";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
  Grid,
} from "@mui/material";

const Contact: React.FC = () => {
  return (
    <>
      <CanvasBackground />
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem",
          textAlign: "center",
        }}
      >
        <Card
          sx={{
            maxWidth: 600,
            width: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            color: "white",
            borderRadius: 3,
            boxShadow: 6,
          }}
        >
          <CardContent
            sx={{ backgroundColor: "#22293A", color: "#000" }}
          >
            <Typography variant="h4" gutterBottom color="cyan">
             # Contact Me
            </Typography>
            <Typography variant="body1" gutterBottom color="#60A5FA">
              I'd love to hear from you! Fill in the form below to send me a message.
            </Typography>
            <Box
              component="form"
              action="mailto:halloultarek1@gmail.com"
              method="POST"
              encType="text/plain"
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid size={{xs: 12, sm: 6}}>
                  <TextField
                    name="First Name"
                    label="First Name"
                    fullWidth
                    required
                    InputLabelProps={{ style: { color: "#60A5FA" } }}
                    InputProps={{ style: { color: "#fff" } }}
                    variant="outlined"
                    sx={{ backgroundColor: "#181F2B", color: "#60A5FA" }}                    
                  />
                </Grid>
                <Grid size={{xs: 12, sm: 6}}>
                  <TextField
                    name="Last Name"
                    label="Last Name"
                    fullWidth
                    required
                    InputLabelProps={{ style: { color: "#60A5FA" } }}
                    InputProps={{ style: { color: "#fff" } }}
                    variant="outlined"
                    sx={{ backgroundColor: "#181F2B", color: "#000" }}
                  />
                </Grid>
                <Grid  size={ 12}>
                  <TextField
                    name="Message"
                    label="Message"
                    fullWidth
                    required
                    multiline
                    rows={5}
                    InputLabelProps={{ style: { color: "#60A5FA" } }}
                    InputProps={{ style: { color: "#fff" } }}
                    variant="outlined"
                    sx={{ backgroundColor: "#181F2B", color: "#000" }}
                  />
                </Grid>
              </Grid>
              <Box mt={3} textAlign="right">
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ backgroundColor: "#00bfff", color: "#000" }}
                >
                  Send
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default Contact;
