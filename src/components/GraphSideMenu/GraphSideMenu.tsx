import { Avatar, Box, Button, Typography } from "@mui/material";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import CloseIcon from '@mui/icons-material/Close';
import { GRAPH_SIDE_MENU_WIDTH } from "../../constants/componentsConstants";
import { ArtistNode } from "../../src/types/types";

export default function GraphSideMenu({ node, onCloseMenu } : { node?: ArtistNode, onCloseMenu: () => void }) {
  const PROFILE_IMAGE_WIDTH = 136;
  
  return (
    <Box
      sx={{
        borderLeft: "1px solid rgba(255, 255, 255, 0.12)"
      }}
    >
      <CloseIcon
        sx={{
          cursor: "pointer"
        }}
        onClick={onCloseMenu}
      />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={2}
        sx={{
          width: GRAPH_SIDE_MENU_WIDTH,
          padding: 2
        }}
      >
        <Typography variant="h4">{node?.id}</Typography>
        <Avatar
          alt={node?.id}
          src={node?.imageUrl}
          sx={{ width: PROFILE_IMAGE_WIDTH, height: PROFILE_IMAGE_WIDTH }}
        />
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={1}
        >
          <Button variant="outlined">
            <BookmarkIcon />
            <Typography ml={1}>
              Salvar artista
            </Typography>
          </Button>
          <Button variant="outlined" href={node?.profileUrl}>
            <LibraryMusicIcon />
            <Typography ml={1}>
              Abrir perfil do artista
            </Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
