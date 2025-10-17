"use client"

import { Box, Card, CardContent, Divider, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const graphTypes = [
    {"id": 0, "name": "Artistas em comum", "sharedGraph": true},
    {"id": 1, "name": "Distância entre artistas", "sharedGraph": true},
    {"id": 2, "name": "Recomendações", "sharedGraph": false},
    {"id": 3, "name": "Clusterização", "sharedGraph": false},
    {"id": 4, "name": "Árvore de descoberta musical", "sharedGraph": false},
    {"id": 5, "name": "Conexões sociais", "sharedGraph": true}
  ];

  const createGraph = (graphTypeId: number) => {
    router.push(`/create_graph/${graphTypeId}`);
  };

  return (
    <Box
      display="flex"
      justifyContent="flex-start"
      alignItems="center"
      flexDirection="column"
      height="100vh"
      width="90%"
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
        {graphTypes.map((graphType) => (
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
              <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14, textAlign: "center" }}>
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
