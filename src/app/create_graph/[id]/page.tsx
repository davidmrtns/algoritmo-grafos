"use client"

import { Box, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import GRAPH_TYPES from "../../../../constants/graphTypes";

export default function Home() {
  const params = useParams();
  const graphId = params.id;

  const graph = GRAPH_TYPES.find((g) => g.id === Number(graphId));

  /*
    Aqui, deve ser feita uma requisição ao backend para coletar os dados do usuário na API do Spotify,
    tratar e salvar no banco de dados. Se o grafo escolhido for um grafo compartilhado (precisa de duas
    pessoas para funcionar), será gerado e exibido um link para enviar ao outro usuário que, ao clicar
    e confirmar o uso, irá buscar os próprios dados dele no Spotify e fazer o cruzamento de dados.
  */

  return (
    <Box>
      <Typography variant="h4">
        {!graph ? "Não encontrado" : graph.name}
      </Typography>
    </Box>
  );
}