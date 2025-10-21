import { Box } from "@mui/material";
import ResponsiveAppBar from "../ResponsiveAppBar/ResponsiveAppBar";
import { getDecodedToken } from "../../utils/tokenUtils";

export function ProtectedPageWrapper({ children }: { children: React.ReactNode }) {
  const decodedToken = getDecodedToken();

  return (
    <>
      {decodedToken && <ResponsiveAppBar />}
      <Box padding={2}>
        {children}
      </Box>
    </>
  );
};
