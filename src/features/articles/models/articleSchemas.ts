import { z } from "zod";

const MIN_TITLE_LENGTH = 1;
const MAX_TITLE_LENGTH = 255;
const MIN_CONTENT_LENGTH = 1;
const MAX_CONTENT_LENGTH = 10000;

export const articleSchema = () => {
  return z.object({
    title: z.string().min(MIN_TITLE_LENGTH).max(MAX_TITLE_LENGTH),
    content: z.string().min(MIN_CONTENT_LENGTH).max(MAX_CONTENT_LENGTH),
  });
};
