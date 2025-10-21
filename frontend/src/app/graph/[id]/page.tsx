"use client";

import GraphRenderer from "@/components/GraphRenderer/GraphRenderer";
import { ProtectedPageWrapper } from "@/components/ProtectedPageWrapper/ProtectedPageWrapper";
import { fetchWrapper } from "@/utils/fetchWrapper";
import resolveMockData from "@/utils/mockResolver";
import { CircularProgress, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [graphData, setGraphData] = useState(undefined);
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const graphId = params.id;
  const isDev = process.env.NODE_ENV === "development";

  useEffect(() => {
    const fetchGraphData = async () => {
      setLoading(true);

      try {
        const graphData =  isDev
          ? resolveMockData(Number(graphId))
          : await fetchWrapper<any>(`get-graph/${graphId}`);
        setGraphData(graphData);
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
      <Typography variant="h4" textAlign="center" gutterBottom>
        {!graphData ? "Não encontrado" : "Seu grafo"} {/*TODO: display graph type or name*/}
      </Typography>
      {
        loading ?
          <CircularProgress color="secondary" /> :
        graphData ? <GraphRenderer graphData={graphData} /> :
          <Typography variant="h6">O grafo não foi encontrado.</Typography>
      }
    </ProtectedPageWrapper>
  );
}
