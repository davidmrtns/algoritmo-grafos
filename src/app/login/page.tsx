import { Box, Button, Typography } from "@mui/material";

export default function Home() {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Button variant="contained" color="primary" href="/dashboard">
          Logar com Spotify
        </Button>
      </Box>
    );
}