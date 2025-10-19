import { LinkType } from "../types/GraphData";
import { BEYONCE_NODE, BILLIE_EILISH_NODE, DJ_KHALED_NODE, DOJA_CAT_NODE, DRAKE_NODE, DUA_LIPA_NODE, ED_SHEERAN_NODE, JUSTIN_BIEBER_NODE, KENDRICK_LAMAR_NODE, OLIVIA_RODRIGO_NODE, POST_MALONE_NODE, SABRINA_CARPENTER_NODE, SZA_NODE, TAYLOR_SWIFT_NODE, THE_WEEKND_NODE, TRAVIS_SCOTT_NODE } from "./artistsMockData";
import { DAVID_NODE, LUCAS_NODE } from "./usersMockData";

export const MY_ARTISTS_MOCK = {
  nodes: [
    DAVID_NODE,
    TAYLOR_SWIFT_NODE,
    SABRINA_CARPENTER_NODE
  ],
  links: [
    { source: DAVID_NODE.id, target: TAYLOR_SWIFT_NODE.id },
    { source: DAVID_NODE.id, target: SABRINA_CARPENTER_NODE.id }
  ],
}

export const COMMON_ARTISTS_MOCK = {
  nodes: [
    // Users
    DAVID_NODE,
    LUCAS_NODE,

    // Artists
    TAYLOR_SWIFT_NODE,
    SABRINA_CARPENTER_NODE,
    OLIVIA_RODRIGO_NODE,
    BILLIE_EILISH_NODE,
    THE_WEEKND_NODE,
    DUA_LIPA_NODE
  ],

  links: [
    // David → artists
    { source: DAVID_NODE.id, target: TAYLOR_SWIFT_NODE.id },
    { source: DAVID_NODE.id, target: SABRINA_CARPENTER_NODE.id },
    { source: DAVID_NODE.id, target: OLIVIA_RODRIGO_NODE.id },
    { source: DAVID_NODE.id, target: BILLIE_EILISH_NODE.id },

    // Lucas → artists
    { source: LUCAS_NODE.id, target: TAYLOR_SWIFT_NODE.id },
    { source: LUCAS_NODE.id, target: SABRINA_CARPENTER_NODE.id },
    { source: LUCAS_NODE.id, target: THE_WEEKND_NODE.id },
    { source: LUCAS_NODE.id, target: DUA_LIPA_NODE.id }
  ],
};

export const DISTANCE_BETWEEN_ARTISTS_MOCK = {
  nodes: [
    TAYLOR_SWIFT_NODE,
    ED_SHEERAN_NODE,
    JUSTIN_BIEBER_NODE,
    DJ_KHALED_NODE,
    DRAKE_NODE,
    TRAVIS_SCOTT_NODE,
    THE_WEEKND_NODE,
    POST_MALONE_NODE,
    BEYONCE_NODE,
    KENDRICK_LAMAR_NODE,
    SZA_NODE
  ],

  // More colabs
  /*links: [
    { source: TAYLOR_SWIFT_NODE.id, target: ED_SHEERAN_NODE.id }, // “End Game”
    { source: TAYLOR_SWIFT_NODE.id, target: POST_MALONE_NODE.id }, // “Fortnight”
    { source: ED_SHEERAN_NODE.id, target: JUSTIN_BIEBER_NODE.id }, // “I Don’t Care”
    { source: ED_SHEERAN_NODE.id, target: THE_WEEKND_NODE.id }, // “Dark Times”
    { source: ED_SHEERAN_NODE.id, target: TRAVIS_SCOTT_NODE.id }, // “Antisocial”
    { source: ED_SHEERAN_NODE.id, target: BEYONCE_NODE.id }, // Perfect Duet
    { source: JUSTIN_BIEBER_NODE.id, target: DJ_KHALED_NODE.id }, // “I’m the One”
    { source: JUSTIN_BIEBER_NODE.id, target: DRAKE_NODE.id }, // “Right Here”
    { source: JUSTIN_BIEBER_NODE.id, target: TRAVIS_SCOTT_NODE.id }, // “No Sense”
    { source: JUSTIN_BIEBER_NODE.id, target: POST_MALONE_NODE.id }, // “Forever”
    { source: JUSTIN_BIEBER_NODE.id, target: SZA_NODE.id }, // “Snooze (Acoustic)”
    { source: DJ_KHALED_NODE.id, target: DRAKE_NODE.id }, // “For Free”
    { source: DRAKE_NODE.id, target: TRAVIS_SCOTT_NODE.id }, // “Sicko Mode”
    { source: TRAVIS_SCOTT_NODE.id, target: THE_WEEKND_NODE.id }, // “Pray 4 Love”
    { source: THE_WEEKND_NODE.id, target: POST_MALONE_NODE.id }, // “One Right Now”
    { source: POST_MALONE_NODE.id, target: BEYONCE_NODE.id }, // “Leviis Jeans”
    { source: BEYONCE_NODE.id, target: KENDRICK_LAMAR_NODE.id }, // “America Has a Problem”
    { source: KENDRICK_LAMAR_NODE.id, target: SZA_NODE.id }, // “30 for 30”
  ]*/

  // Single colabs
  links: [
    { source: TAYLOR_SWIFT_NODE.id, target: ED_SHEERAN_NODE.id, label: "End Game" }, // “End Game”
    { source: ED_SHEERAN_NODE.id, target: JUSTIN_BIEBER_NODE.id, label: "I Don’t Care" }, // “I Don’t Care”
    { source: JUSTIN_BIEBER_NODE.id, target: DJ_KHALED_NODE.id, label: "I’m the One" }, // “I’m the One”
    { source: DJ_KHALED_NODE.id, target: DRAKE_NODE.id, label: "For Free" }, // “For Free”
    { source: DRAKE_NODE.id, target: TRAVIS_SCOTT_NODE.id, label: "Sicko Mode" }, // “Sicko Mode”
    { source: TRAVIS_SCOTT_NODE.id, target: THE_WEEKND_NODE.id, label: "Pray 4 Love" }, // “Pray 4 Love”
    { source: THE_WEEKND_NODE.id, target: POST_MALONE_NODE.id, label: "One Right Now" }, // “One Right Now”
    { source: POST_MALONE_NODE.id, target: BEYONCE_NODE.id, label: "Leviis Jeans" }, // “Leviis Jeans”
    { source: BEYONCE_NODE.id, target: KENDRICK_LAMAR_NODE.id, label: "America Has a Problem" }, // “America Has a Problem”
    { source: KENDRICK_LAMAR_NODE.id, target: SZA_NODE.id, label: "30 for 30" }, // “30 for 30”
  ]
};

export const RECOMMENDED_ARTISTS_MOCK = {
  nodes: [
    DAVID_NODE,
    TAYLOR_SWIFT_NODE,
    OLIVIA_RODRIGO_NODE,
    ED_SHEERAN_NODE,
    SZA_NODE,
    THE_WEEKND_NODE,
    DOJA_CAT_NODE,
    POST_MALONE_NODE,
    BILLIE_EILISH_NODE,
    DUA_LIPA_NODE
  ],

  links: [
    // David → known artists
    { source: DAVID_NODE.id, target: TAYLOR_SWIFT_NODE.id, label: LinkType.Likes },
    { source: DAVID_NODE.id, target: OLIVIA_RODRIGO_NODE.id, label: LinkType.Likes },
    { source: DAVID_NODE.id, target: BILLIE_EILISH_NODE.id, label: LinkType.Likes },

    // natural connections (colabs / affinities)
    { source: TAYLOR_SWIFT_NODE.id, target: ED_SHEERAN_NODE.id, label: "End Game" },
    { source: OLIVIA_RODRIGO_NODE.id, target: TAYLOR_SWIFT_NODE.id, label: LinkType.Influence },
    { source: OLIVIA_RODRIGO_NODE.id, target: BILLIE_EILISH_NODE.id, label: LinkType.SimilarGenres },
    { source: ED_SHEERAN_NODE.id, target: THE_WEEKND_NODE.id, label: LinkType.Colab }, // indirect feat (pop crossover)
    { source: ED_SHEERAN_NODE.id, target: DUA_LIPA_NODE.id, label: LinkType.SimilarGenres }, // british pop
    { source: THE_WEEKND_NODE.id, target: SZA_NODE.id, label: "Die For You (Remix)" }, // “Die For You (Remix)”
    { source: THE_WEEKND_NODE.id, target: POST_MALONE_NODE.id, label: "One Right Now" }, // “One Right Now”
    { source: DOJA_CAT_NODE.id, target: THE_WEEKND_NODE.id, label: "In Your Eyes (Remix)" }, // “In Your Eyes (Remix)”
    { source: DOJA_CAT_NODE.id, target: SZA_NODE.id, label: "Kiss Me More" }, // “Kiss Me More”
    { source: DUA_LIPA_NODE.id, target: DOJA_CAT_NODE.id, label: "Levitating (Remix)" }, // “Levitating (Remix)”
    { source: POST_MALONE_NODE.id, target: BILLIE_EILISH_NODE.id, label: LinkType.SimilarGenres } // similar pop/alt mix
  ],
};
