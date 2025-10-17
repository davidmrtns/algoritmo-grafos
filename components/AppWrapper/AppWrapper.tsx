"use client"

import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme";
import ResponsiveAppBar from "../ResponsiveAppBar/ResponsiveAppBar";


export default function AppWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ResponsiveAppBar />
      <Box padding={2}>
        {children}
      </Box>
    </ThemeProvider>
  );
}