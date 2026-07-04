import {
  createContentSource,
  type ContentEntry,
} from "@0xsarwagya/ui/content";

export type TakeMeta = ContentEntry;

const source = createContentSource("content/takes");

export const getAllTakes = source.all;
export const getTakeBySlug = source.bySlug;
