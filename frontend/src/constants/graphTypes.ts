import { GraphType } from "../types/types";

export const GRAPH_TYPES: { [key: string]: GraphType } = {
  CommonArtists: {
    id: 0,
    displayName: "Artistas em comum",
    isSharedGraph: true,
    apiEndpoint: "/common-artists"
  },
  DistanceBetweenArtists: {
    id: 1,
    displayName: "Distância entre artistas",
    isSharedGraph: true,
    apiEndpoint: "/distance-between-artists"
  },
  Recommendations: {
    id: 2,
    displayName: "Recomendações",
    isSharedGraph: false,
    apiEndpoint: "/recommendations"
  },
  MusicClustering: {
    id: 3,
    displayName: "Clusterização musical",
    isSharedGraph: false,
    apiEndpoint: "/music-clustering"
  },
  DiscoveryTree: {
    id: 4,
    displayName: "Árvore de descoberta musical",
    isSharedGraph: false,
    apiEndpoint: "/discovery-tree"
  },
  SocialConnections: {
    id: 5,
    displayName: "Conexões sociais",
    isSharedGraph: true,
    apiEndpoint: "/social-connections"
  }
};
