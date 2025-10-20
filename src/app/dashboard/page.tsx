"use client"

import { Box, Card, CardContent, Divider, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import GRAPH_TYPES from "../../../constants/graphTypes";
import { ProtectedPageWrapper } from "../../../components/ProtectedPageWrapper/ProtectedPageWrapper";
import GraphCard from "../../../components/GraphCard/GraphCard";

export default function Home() {
  return (
    <ProtectedPageWrapper>
      <Box
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        flexDirection="column"
      >
        <Typography variant="h4" component="h1" marginBottom={1}>
          Página inicial
        </Typography>
        <Box
          display="flex"
          flexWrap="wrap"
          gap={2}
          justifyContent="center"
        >
          {GRAPH_TYPES.map((graphType) => (
            <GraphCard key={graphType.id} graphType={graphType} />
          ))}
        </Box>
      </Box>
    </ProtectedPageWrapper>
  );
}
