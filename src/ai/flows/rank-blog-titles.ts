// src/ai/flows/rank-blog-titles.ts
'use server';

/**
 * @fileOverview Ranks blog titles based on clickthrough potential using generative AI.
 *
 * - rankBlogTitles - A function that ranks blog titles.
 * - RankBlogTitlesInput - The input type for the rankBlogTitles function.
 * - RankBlogTitlesOutput - The return type for the rankBlogTitles function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RankBlogTitlesInputSchema = z.object({
  titles: z
    .array(z.string())
    .describe('An array of blog titles to rank.'),
});

export type RankBlogTitlesInput = z.infer<typeof RankBlogTitlesInputSchema>;

const RankBlogTitlesOutputSchema = z.array(
  z.object({
    title: z.string().describe('The blog title.'),
    rank: z.number().describe('The clickthrough potential rank (higher is better).'),
    reason: z.string().describe('The reason for the assigned rank.'),
  })
);

export type RankBlogTitlesOutput = z.infer<typeof RankBlogTitlesOutputSchema>;

export async function rankBlogTitles(input: RankBlogTitlesInput): Promise<RankBlogTitlesOutput> {
  return rankBlogTitlesFlow(input);
}

const rankBlogTitlesPrompt = ai.definePrompt({
  name: 'rankBlogTitlesPrompt',
  input: {schema: RankBlogTitlesInputSchema},
  output: {schema: RankBlogTitlesOutputSchema},
  prompt: `You are an expert in creating catchy blog titles that maximize clickthrough rates.

  Given the following list of blog titles, rank them based on their clickthrough potential.
  Provide a reason for each ranking.

  Titles:
  {{#each titles}}- {{{this}}}\n{{/each}}

  Output the titles along with their rank and the reason for the rank in JSON format.
`,
});

const rankBlogTitlesFlow = ai.defineFlow(
  {
    name: 'rankBlogTitlesFlow',
    inputSchema: RankBlogTitlesInputSchema,
    outputSchema: RankBlogTitlesOutputSchema,
  },
  async input => {
    const {output} = await rankBlogTitlesPrompt(input);
    return output!;
  }
);
