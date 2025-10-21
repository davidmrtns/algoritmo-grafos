"use client"

import { Box, Card, CardContent, Divider, Typography } from "@mui/material";
import { GRAPH_TYPES } from "../../constants/graphTypes";
import { ProtectedPageWrapper } from "../../components/ProtectedPageWrapper/ProtectedPageWrapper";
import GraphCard from "../../components/GraphCard/GraphCard";

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
        <>
          <Typography variant="subtitle1" component="h1" marginBottom={1}>
            Criar grafo
          </Typography>
          <Box
            display="flex"
            flexWrap="wrap"
            gap={2}
            justifyContent="center"
          >
            {Object.values(GRAPH_TYPES).map((graphType) => (
              <GraphCard
                key={graphType.id}
                graphCardType="newGraph"
                graphType={graphType}
              />
            ))}
          </Box>
        </>
        <Divider sx={{ width: '100%', my: 4 }} />
        <>
          <Typography variant="subtitle1" component="h1" marginBottom={1}>
            Seus grafos
          </Typography>
          <Box
            display="flex"
            flexWrap="wrap"
            gap={2}
            justifyContent="center"
          >
            {Object.values(GRAPH_TYPES).map((graphType) => (
              <GraphCard
                key={graphType.id}
                graphCardType="existingGraph"
                graphId={graphType.id} // TODO: replace with actual graph ID
                graphType={graphType}
              />
            ))}
          </Box>
        </>
      </Box>
    </ProtectedPageWrapper>
  );
}
