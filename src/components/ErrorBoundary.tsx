import { Component, type ErrorInfo, type ReactNode } from "react";
import { Box, Typography, Button } from "@mui/material";

// Explicitly define the props to include children
interface Props { 
  children: ReactNode; 
}

interface State { 
  hasError: boolean; 
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box 
          sx={{ 
            p: 4, 
            textAlign: 'center', 
            bgcolor: '#0a0a0a', 
            border: '1px solid #ff0055',
            borderRadius: '4px',
            my: 4 
          }}
        >
          <Typography variant="h5" color="error" sx={{ fontFamily: 'monospace', mb: 2 }}>
            [SYSTEM_CRASH]: CRITICAL_UI_FAILURE
          </Typography>
          <Typography variant="body2" sx={{ color: '#aaa', mb: 3 }}>
            A component failed to initialize. The rest of the terminal remains operational.
          </Typography>
          <Button 
            variant="outlined" 
            color="error" 
            sx={{ 
              borderColor: '#ff0055',
              '&:hover': { borderColor: '#ff0055', bgcolor: 'rgba(255,0,85,0.1)' }
            }} 
            onClick={() => window.location.reload()}
          >
            Reboot Module
          </Button>
        </Box>
      );
    }

    // Use this.props.children instead of this.children
    return this.props.children;
  }
}

export default ErrorBoundary;