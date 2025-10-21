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

  return mockData;
};
