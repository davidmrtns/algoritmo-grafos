"use client"

import { Box, CircularProgress, FilledInput, IconButton, InputAdornment, Typography } from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useParams } from "next/navigation";
import GRAPH_TYPES from "../../../constants/graphTypes";
import { useEffect, useState } from "react";
import GraphRenderer from "../../../components/GraphRenderer/GraphRenderer";
import { GraphData } from "../../../types/types";
import { COMMON_ARTISTS_MOCK, DISTANCE_BETWEEN_ARTISTS_MOCK, MY_ARTISTS_MOCK, MY_CLUSTERS_MOCK, MY_DISCOVERY_TREE_MOCK, RECOMMENDED_ARTISTS_MOCK } from "../../../constants/mockData/graphMockData";
import { ProtectedPageWrapper } from "../../../components/ProtectedPageWrapper/ProtectedPageWrapper";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [sharedLink, setSharedLink] = useState("");
  const [graphData, setGraphData] = useState<GraphData | null>(null);

  const params = useParams();
  const graphId = params.id;

  const graph = GRAPH_TYPES.find((g) => g.id === Number(graphId));

  // Defines mock data while not connected to the backend
  useEffect(() => {
    let mockData;

    switch (graph?.id) {
      case 0:
        mockData = COMMON_ARTISTS_MOCK;
        break;
      case 1:
        mockData = DISTANCE_BETWEEN_ARTISTS_MOCK;
        break;
      case 2:
        mockData = RECOMMENDED_ARTISTS_MOCK;
        break;
      case 3:
        mockData = MY_CLUSTERS_MOCK;
        break;
      case 4:
        mockData = MY_DISCOVERY_TREE_MOCK;
        break;
      default:
        mockData = null;
        break;
    }

    setGraphData(mockData);
  }, [graph])

  /*
    Aqui, deve ser feita uma requisição ao backend para coletar os dados do usuário na API do Spotify,
    tratar e salvar no banco de dados. Se o grafo escolhido for um grafo compartilhado (precisa de duas
    pessoas para funcionar), será gerado e exibido um link para enviar ao outro usuário que, ao clicar
    e confirmar o uso, irá buscar os próprios dados dele no Spotify e fazer o cruzamento de dados.
  */

  const invokeCreateGraph = async () => {
    setLoading(true);
    
    if (!graph) {
      setLoading(false);
      return;
    };

    try {
      const response = await fetch(graph.apiUrl);
      
      if (!response.ok) {
        throw new Error("Erro ao criar o grafo");
      }

      const data = await response.json();

      if (data.sharedLink) setSharedLink(data.sharedLink);
      if (data.graphData) setGraphData(data.graphData);
    } catch (error) {
      console.error("Erro ao chamar a API:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    invokeCreateGraph();
  }, []);

  return (
    <ProtectedPageWrapper>
      <Box
        display="flex"
        justifyContent="center"
        justifyItems="center"
        alignItems="center"
        flexDirection="column"
      >
        <Typography variant="h4" textAlign="center" gutterBottom>
          {!graph ? "Não encontrado" : graph.name}
        </Typography>
        {loading || !graphData ? <CircularProgress color="secondary" /> : (
          <GraphRenderer graphData={graphData} />
        )}
        {sharedLink &&
          <Box>
            <Typography variant="button" color="textSecondary">
              Aqui está o seu link para gerar o grafo! Envie para um amigo para completar a geração.
            </Typography>
            <FilledInput
              color="secondary"
              value={sharedLink}
              readOnly
              endAdornment={
                <InputAdornment position="end">
                  <IconButton>
                    <ContentCopyIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </Box>
        }
      </Box>
    </ProtectedPageWrapper>
  );
}
