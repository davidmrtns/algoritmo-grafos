"use client"

import { Box, Button, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { addTokenToCookies } from "../../../utils/token_utils";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  // Temporary function to mock auth token
  const generateToken = () => {
    addTokenToCookies("mocked_token");
    router.push("/dashboard");
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Button variant="contained" sx={{ backgroundColor: "#18D860" }} onClick={generateToken}>
        <FontAwesomeIcon icon={faSpotify} style={{ width: "18px" }} />
        <Typography variant="button" sx={{ ml: 1 }}>
          Logar com Spotify
        </Typography>
      </Button>
    </Box>
  );
}