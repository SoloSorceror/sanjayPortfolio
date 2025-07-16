'use server';

import { generateBlogSummary as generateBlogSummaryFlow, type GenerateBlogSummaryInput } from '@/ai/flows/generate-blog-summary';
import { rankBlogTitles as rankBlogTitlesFlow, type RankBlogTitlesInput } from '@/ai/flows/rank-blog-titles';

export async function generateBlogSummary(input: GenerateBlogSummaryInput) {
    try {
        return await generateBlogSummaryFlow(input);
    } catch (error) {
        console.error("Error generating blog summary:", error);
        throw new Error("Failed to generate blog summary.");
    }
}

export async function rankBlogTitles(input: RankBlogTitlesInput) {
    try {
        return await rankBlogTitlesFlow(input);
    } catch (error) {
        console.error("Error ranking blog titles:", error);
        throw new Error("Failed to rank blog titles.");
    }
}
