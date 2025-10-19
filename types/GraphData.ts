export type GraphData = {
  nodes: { id: string; image: string }[];
  links: { source: string; target: string }[];
};

export enum LinkType {
  Likes = "Curte",
  Colab = "Colaboraram",
  Influence = "Inspira",
  SimilarGenres = "Gêneros Similares"
}
