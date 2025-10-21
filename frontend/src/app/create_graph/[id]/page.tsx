"use client"

import { Box, CircularProgress, FilledInput, IconButton, InputAdornment, Typography } from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useParams, useRouter } from "next/navigation";
import { GRAPH_TYPES } from "../../../constants/graphTypes";
import { useEffect, useState } from "react";
import { ProtectedPageWrapper } from "../../../components/ProtectedPageWrapper/ProtectedPageWrapper";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [generatedGraphId, setGeneratedGraphId] = useState("");

  const router = useRouter();

  const params = useParams();
  const graphTypeId = params.id;

  const graphType = Object.values(GRAPH_TYPES).find((g) => g.id === Number(graphTypeId));

  const invokeCreateGraph = async () => {
    setLoading(true);
    
    if (!graphType) {
      setLoading(false);
      return;
    };

    try {
      /*
        Aqui, deve ser feita uma requisição ao backend para coletar os dados do usuário na API do Spotify,
        tratar e salvar no banco de dados. Se o grafo escolhido for um grafo compartilhado (precisa de duas
        pessoas para funcionar), será gerado e exibido um link para enviar ao outro usuário que, ao clicar
        e confirmar o uso, irá buscar os próprios dados dele no Spotify e fazer o cruzamento de dados.
      */
      const response = ""; // Generated graph ID
      setGeneratedGraphId(response);
    } catch (error) {
      console.error("Erro ao chamar a API:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    invokeCreateGraph();
  }, []);

  const generateContent = () => {
    if (loading) {
      return <CircularProgress color="secondary" />;
    } else if (graphType?.isSharedGraph) {
      if (generatedGraphId) {
        return (
          <Box>
            <Typography variant="button" color="textSecondary">
              Aqui está o seu link para gerar o grafo! Envie para um amigo para completar a geração.
            </Typography>
            <FilledInput
              color="secondary"
              value={generatedGraphId}
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
        );
      } else {
        return (
          <Typography variant="subtitle1">
            Um erro ocorreu ao gerar o link compartilhado. Tente novamente mais tarde.
          </Typography>
        );
      }
    } else {
      if (generatedGraphId) {
        router.push(`/graph/${generatedGraphId}`);
      } else {
        return (
          <Typography variant="subtitle1">
            Um erro ocorreu ao gerar seu grafo. Tente novamente mais tarde.
          </Typography>
        ); 
      }
    }

    return;
  };

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
          {!graphType ? "Não encontrado" : graphType.displayName}
        </Typography>
        {generateContent()}
      </Box>
    </ProtectedPageWrapper>
  );
}
