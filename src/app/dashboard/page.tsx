"use client"

import { Box, Card, CardContent, Divider, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import GRAPH_TYPES from "../../../constants/graphTypes";

export default function Home() {
  const router = useRouter();

  const createGraph = (graphTypeId: number) => {
    router.push(`/create_graph/${graphTypeId}`);
  };

  return (
    <Box
      display="flex"
      justifyContent="flex-start"
      alignItems="center"
      flexDirection="column"
    >
      <Typography variant="h4" component="h1">
        Página inicial
      </Typography>
      <Box
        display="flex"
        flexWrap="wrap"
        gap={2}
        justifyContent="center"
      >
        {GRAPH_TYPES.map((graphType) => (
          <Card
            key={graphType.id}
            onClick={() => createGraph(graphType.id)}
            sx={{
              cursor: "pointer",
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)"
              },
              width: 250,
            }}
          >
            <CardContent>
              <Typography
                gutterBottom
                sx={{
                  color: 'text.secondary',
                  fontSize: 14,
                  textAlign: "center",
                  fontStyle: "italic"
                }}
              >
                {graphType.sharedGraph ? "Compartilhado" : "Individual"}
              </Typography>
              <Typography textAlign="center">
                {graphType.name}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
