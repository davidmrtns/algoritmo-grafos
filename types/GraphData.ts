export type GraphData = {
  nodes: GraphNode[];
  links: { source: string; target: string }[];
};

export type GraphNode = {
  id: string;
  imageUrl: string;
  isUser: boolean;
}

export type ArtistNode = GraphNode & {
  profileUrl: string;
}

export enum LinkType {
  Likes = "Curte",
  Colab = "Colaboraram",
  Influence = "Inspira",
  SimilarGenres = "Gêneros Similares"
}
