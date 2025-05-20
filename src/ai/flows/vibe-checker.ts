
'use server';

/**
 * @fileOverview Retrieves live insights about the vibe of a place, including trending spots, crowd levels, wait times, and comments.
 *
 * - getLiveVibe - A function that retrieves live insights about a place.
 * - LiveVibeInput - The input type for the getLiveVibe function.
 * - LiveVibeOutput - The return type for the getLiveVibe function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const LiveVibeInputSchema = z.object({
  placeName: z.string().describe('The name of the place or area to check the vibe for.'),
  cityName: z
    .string()
    .optional()
    .describe('The optional name of the city where the place is located, for better context.'),
});
export type LiveVibeInput = z.infer<typeof LiveVibeInputSchema>;

const LiveVibeOutputSchema = z.object({
  trendingPlaces: z.array(
    z.object({
      name: z.string().describe('The name of the trending place.'),
      type: z.string().describe('The type of place (e.g., cafe, bar, food truck, restaurant).')
    })
  ).describe('A list of trending nearby or related bars, restaurants, cafes, and food trucks, particularly those that are popular and generally accessible (e.g., no high cover charges unless typical for the venue type). Focus on quality over quantity, max 3-4 diverse options.').optional(),
  crowdLevel: z.string().describe('An assessment of the current crowd level (e.g., "Not busy", "Moderately busy", "Very busy", "Not applicable").').optional(),
  estimatedWaitTime: z.string().describe('An estimated wait time, if applicable (e.g., "No wait", "5-10 minutes", "30+ minutes", "Not applicable").').optional(),
  comments: z.array(z.string()).describe('An array of live comments about the vibe of the main queried place, typically in English. These comments should express user sentiments and try to reflect aspects like mood, music, and crowd character. Aim for 3-5 diverse comments.'),
  simulatedMoodRating: z.number().min(0).max(5).optional().describe('A simulated average mood rating for the place (0-5 stars), reflecting general sentiment.'),
  simulatedMusicRating: z.number().min(0).max(5).optional().describe('A simulated average music rating for the place (0-5 stars), if applicable.'),
  simulatedCrowdRating: z.number().min(0).max(5).optional().describe('A simulated average crowd rating for the place (0-5 stars), reflecting how people feel about the crowd (e.g., lively, too packed, good energy).'),
});
export type LiveVibeOutput = z.infer<typeof LiveVibeOutputSchema>;

export async function getLiveVibe(input: LiveVibeInput): Promise<LiveVibeOutput> {
  return liveVibeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'liveVibePrompt',
  input: {schema: LiveVibeInputSchema}, 
  output: {schema: LiveVibeOutputSchema},
  prompt: `You are a helpful assistant that provides live insights about a place or area.
  {{#if cityName}}
  The place, "{{placeName}}", is located in or near the city of {{{cityName}}}. Use this city context if relevant for determining local trends or typical vibes.
  {{/if}}

  Given the name of the place or area, you will respond with:
  1. Trending nearby or related places: List 3-4 diverse and popular/accessible bars, restaurants, cafes, and food trucks. If none, provide an empty array.
  2. Crowd level: Assess the current crowd level (e.g., "Not busy", "Moderately busy", "Very busy"). If not applicable, state "Not applicable".
  3. Estimated wait time: Provide an estimated wait time if applicable (e.g., "No wait", "5-10 minutes"). If not applicable, state "Not applicable".
  4. Simulated average ratings (0-5 stars):
     - Mood: General mood/atmosphere.
     - Music: If applicable, what's the music like.
     - Crowd: How people generally feel about the crowd (e.g., lively, too packed).
     Provide these as numerical scores. If a rating is not applicable (e.g. music for a park), omit it or set it to 0.
  5. Live comments: An array of 3-5 live comments reflecting the current vibe of the main queried place, in English. These comments should sound like they are from different individuals and express their feelings or observations about the place's atmosphere, music, crowd, etc. (e.g., "Music is too loud!", "Love the chill mood here.", "Surprisingly not crowded tonight."). If no relevant comments can be generated, provide an empty array.

  Place/Area Name: {{{placeName}}}
  `,
});

const liveVibeFlow = ai.defineFlow(
  {
    name: 'liveVibeFlow',
    inputSchema: LiveVibeInputSchema,
    outputSchema: LiveVibeOutputSchema,
  },
  async (input: LiveVibeInput) => {
    const {output} = await prompt(input); // Pass input directly
    return output!;
  }
);
