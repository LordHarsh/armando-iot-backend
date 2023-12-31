import { z } from "zod";

export const createLinkSchema = z.object({
    user_id: z.string(),
    chat: z.object({
        role: z.string(),
        content: z.string(),
    }).array(),
});