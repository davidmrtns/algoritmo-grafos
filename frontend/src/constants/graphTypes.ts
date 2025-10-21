import { GraphType } from "../src/types/types";

const GRAPH_TYPES: GraphType[] = [
  { id: 0, name: "Artistas em comum", sharedGraph: true, apiUrl: "" },
  { id: 1, name: "Distância entre artistas", sharedGraph: true, apiUrl: "" },
  { id: 2, name: "Recomendações", sharedGraph: false, apiUrl: "" },
  { id: 3, name: "Clusterização musical", sharedGraph: false, apiUrl: "" },
  { id: 4, name: "Árvore de descoberta musical", sharedGraph: false, apiUrl: "" },
  { id: 5, name: "Conexões sociais", sharedGraph: true, apiUrl: "" }
];

export default GRAPH_TYPES;