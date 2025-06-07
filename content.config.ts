import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
    collections: {
        content: defineCollection({
            type: 'data',
            source: '**/*.md',
            schema: z.object({
                path: z.string(),
                title: z.string(),
                description: z.string(),
                image: z.string().optional(),
                date: z.string().optional(),
                tags: z.array(z.string()).optional(),
                body: z.object({
                    type: z.string(),
                    children: z.any(),
                    toc: z.any(),
                }),
                navigation: z.union([
                    z.boolean(),
                    z.object({
                        title: z.string(),
                        description: z.string(),
                        icon: z.string(),
                    }),
                ]).default(true),
            }),
        }),
    }
})
