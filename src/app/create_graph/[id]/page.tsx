"use client"

import { Box, CircularProgress, FilledInput, IconButton, InputAdornment, Typography } from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useParams } from "next/navigation";
import GRAPH_TYPES from "../../../../constants/graphTypes";
import { useEffect, useState } from "react";
import GraphRenderer from "../../../../components/GraphRenderer/GraphRenderer";
import { GraphData } from "../../../../types/GraphData";
import { MY_ARTISTS_MOCK } from "../../../../constants/graphMockData";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [sharedLink, setSharedLink] = useState("");
  const [graphData, setGraphData] = useState<GraphData | null>(MY_ARTISTS_MOCK);

  const params = useParams();
  const graphId = params.id;

  const graph = GRAPH_TYPES.find((g) => g.id === Number(graphId));

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
    <Box
      display="flex"
      justifyContent="center"
      justifyItems="center"
      flexDirection="column"
    >
      <Typography variant="h4">
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
  );
}