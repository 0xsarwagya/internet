import {
  createContentSource,
  type ContentEntry,
} from "@0xsarwagya/ui/content";

export type LearningMeta = ContentEntry;

const source = createContentSource("content/learnings");

export const getAllLearnings = source.all;
export const getLearningBySlug = source.bySlug;
