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
        teams: defineCollection({
            type: 'data',
            source: 'teams.json',
            schema: z.object({
                teams: z.array(z.object({
                    id: z.string(),
                    name: z.string(),
                    tagline: z.string().optional(),
                    logo: z.string().optional(),
                    region: z.string().optional(),
                    captain: z.string().optional(),
                    founded: z.number().optional(),
                    division: z.string().optional(),
                    achievements: z.array(z.string()).optional(),
                    playstyle: z.string().optional(),
                    primaryColors: z.array(z.string()).optional(),
                    members: z.array(z.object({
                        role: z.string(),
                        gamerTag: z.string(),
                    })).optional(),
                    links: z.object({
                        twitter: z.string().url().optional(),
                        discord: z.string().url().optional(),
                        youtube: z.string().url().optional(),
                        twitch: z.string().url().optional(),
                        instagram: z.string().url().optional(),
                        website: z.string().url().optional(),
                    }).partial().optional(),
                })),
            }),
        }),
    }
})
