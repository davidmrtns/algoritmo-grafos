import { Card, CardContent, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { GraphType } from "../../types/types";

interface GraphCardProps {
  graphCardType: 'newGraph' | 'existingGraph';
  graphId?: number;
  graphType: GraphType;
};

export default function GraphCard({ graphCardType, graphId, graphType }: GraphCardProps) {
  const router = useRouter();
  
  const openGraph = () => {
    if (graphCardType === 'existingGraph' && graphId !== undefined) {
      router.push(`/graph/${graphId}`);
    } else {
      router.push(`/create_graph/${graphType.id}`);
    }
  };
  
  return (
    <Card
      onClick={openGraph}
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
          {graphType.isSharedGraph ? "Compartilhado" : "Individual"}
        </Typography>
        <Typography textAlign="center">
          {graphType.displayName}
        </Typography>
      </CardContent>
    </Card>
  );
};
