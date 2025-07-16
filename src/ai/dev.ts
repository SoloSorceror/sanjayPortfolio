import { config } from 'dotenv';
config();

import '@/ai/flows/generate-blog-summary.ts';
import '@/ai/flows/rank-blog-titles.ts';