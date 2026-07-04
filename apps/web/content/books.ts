export type Book = {
  title: string;
  author: string;
  thought: string;
};

export const BOOKS: readonly Book[] = [
  {
    title: "The Beginning of Infinity",
    author: "David Deutsch",
    thought: "Explanations, not observations, are the unit of progress.",
  },
  {
    title: "Gödel, Escher, Bach",
    author: "Douglas Hofstadter",
    thought: "A book that keeps rewriting itself while you read it.",
  },
  {
    title: "The Design of Everyday Things",
    author: "Don Norman",
    thought: "If a door needs a label, it wasn't designed. It was decorated.",
  },
  {
    title: "Meditations",
    author: "Marcus Aurelius",
    thought: "A journal that outlived the empire it was written in.",
  },
  {
    title: "The Almanack of Naval Ravikant",
    author: "Eric Jorgenson",
    thought: "Half feels obvious. That's the compliment.",
  },
];
