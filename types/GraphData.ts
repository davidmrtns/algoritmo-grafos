export type GraphData = {
  nodes: GraphNode[];
  links: { source: string; target: string }[];
};

export type GraphNode = {
  id: string;
  name: string;
  imageUrl: string;
  isUser: boolean;
}

export type ArtistNode = GraphNode & {
  profileUrl: string;
}

export type GraphType = {
  id: number;
  name: string;
  sharedGraph: boolean;
  apiUrl: string;
}

export enum LinkType {
  Likes = "Curte",
  Colab = "Colaboraram",
  Influence = "Inspira",
  SimilarGenres = "Gêneros Similares"
}
