"use client";

import GraphRenderer from "@/components/GraphRenderer/GraphRenderer";
import { ProtectedPageWrapper } from "@/components/ProtectedPageWrapper/ProtectedPageWrapper";
import { CircularProgress, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [graphData, setGraphData] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const graphId = params.id;

  // TODO: create fetch wrapper
  useEffect(() => {
    const fetchGraphData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8000/spotify/get-graph/${graphId}`);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setGraphData(data);
      } catch (error) {
        console.error("Error fetching graph data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (graphId) {
      fetchGraphData();
    }
  }, [graphId]);

  return (
    <ProtectedPageWrapper>
      {
        loading ?
          <CircularProgress color="secondary" /> :
        graphData ? <GraphRenderer graphData={graphData} /> :
          <Typography variant="h6">O grafo não foi encontrado.</Typography>
      }
    </ProtectedPageWrapper>
  );
}
