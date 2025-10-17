import { Box, Card, CardContent, Divider, Typography } from "@mui/material";

export default function Home() {
  const graphTypes = [
    {"id": 0, "name": "Artistas em comum"},
    {"id": 1, "name": "Distância entre artistas"},
    {"id": 2, "name": "Recomendações"},
    {"id": 3, "name": "Clusterização"},
    {"id": 4, "name": "Árvore de descoberta musical"},
    {"id": 5, "name": "Conexões sociais"}
  ];

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
