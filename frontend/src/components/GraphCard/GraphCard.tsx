import { Card, CardContent, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { GraphType } from "../../types/types";

export default function GraphCard({ graphType }: { graphType: GraphType }) {
  const router = useRouter();
  
  const openGraph = (graphTypeId: number) => {
    router.push(`/graph/${graphTypeId}`);
  };
  
  return (
    <Card
      onClick={() => openGraph(graphType.id)}
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
  );
};
