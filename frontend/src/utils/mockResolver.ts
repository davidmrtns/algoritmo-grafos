import { GRAPH_TYPES } from "@/constants/graphTypes";
import {
  COMMON_ARTISTS_MOCK,
  DISTANCE_BETWEEN_ARTISTS_MOCK,
  RECOMMENDED_ARTISTS_MOCK,
  MY_CLUSTERS_MOCK,
  MY_DISCOVERY_TREE_MOCK
} from "@/constants/mockData/graphMockData";

export default function resolveMockData(graphTypeId: number) {
  let mockData;
  
  switch (graphTypeId) {
    case GRAPH_TYPES.CommonArtists.id:
      mockData = COMMON_ARTISTS_MOCK;
      break;
    case GRAPH_TYPES.DistanceBetweenArtists.id:
      mockData = DISTANCE_BETWEEN_ARTISTS_MOCK;
      break;
    case GRAPH_TYPES.Recommendations.id:
      mockData = RECOMMENDED_ARTISTS_MOCK;
      break;
    case GRAPH_TYPES.MusicClustering.id:
      mockData = MY_CLUSTERS_MOCK;
      break;
    case GRAPH_TYPES.DiscoveryTree.id:
      mockData = MY_DISCOVERY_TREE_MOCK;
      break;
    default:
      mockData = null;
      break;
  }

  return mockData;
};
