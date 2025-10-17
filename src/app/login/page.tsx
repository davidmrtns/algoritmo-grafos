import { Box, Button, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";

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
        <Button variant="contained" sx={{ backgroundColor: "#18D860" }} href="/dashboard">
          <FontAwesomeIcon icon={faSpotify} style={{ width: "18px" }} />
          <Typography variant="button" sx={{ ml: 1 }}>
            Logar com Spotify
          </Typography>
        </Button>
      </Box>
    );
}