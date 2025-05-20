'use server';

/**
 * @fileOverview AI-powered PG/Room matching flow.
 *
 * This file exports:
 * - `findPgRoomMatches`: An async function to find PG/room matches based on user criteria.
 * - `PgRoomMatcherInput`: The input type for the findPgRoomMatches function.
 * - `PgRoomMatcherOutput`: The output type for the findPgRoomMatches function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PgRoomMatcherInputSchema = z.object({
  budget: z.number().describe('The maximum budget for the PG/room.'),
  location: z.string().describe('The preferred location for the PG/room.'),
  facilities: z
    .string()
    .describe(
      'A comma-separated list of desired facilities (e.g., wifi, laundry, attached bathroom).' +
        ' If the user has no specific requirements, this field should be an empty string.'
    ),
  roommatePreference: z
    .string()
    .describe(
      'Preferences for roommates (e.g., gender, age, interests). If the user has no specific' +
        ' preferences, this field should be an empty string.'
    ),
});
export type PgRoomMatcherInput = z.infer<typeof PgRoomMatcherInputSchema>;

const PgRoomMatcherOutputSchema = z.object({
  matches: z.array(
    z.object({
      pgName: z.string().describe('The name of the PG/room.'),
      address: z.string().describe('The address of the PG/room.'),
      price: z.number().describe('The monthly price of the PG/room.'),
      facilities: z.string().describe('A comma-separated list of available facilities.'),
      contact: z.string().describe('Contact information for the PG/room.'),
      matchScore: z
        .number()
        .describe(
          'A score (0-1) indicating how well this PG/room matches the user preferences. Higher is better.'
        ),
    })
  ).describe('A list of PG/room matches based on the user specified criteria.'),
});
export type PgRoomMatcherOutput = z.infer<typeof PgRoomMatcherOutputSchema>;

export async function findPgRoomMatches(input: PgRoomMatcherInput): Promise<PgRoomMatcherOutput> {
  return pgRoomMatcherFlow(input);
}

const prompt = ai.definePrompt({
  name: 'pgRoomMatcherPrompt',
  input: {schema: PgRoomMatcherInputSchema},
  output: {schema: PgRoomMatcherOutputSchema},
  prompt: `You are an AI assistant helping users find suitable PG/room options based on their
  preferences. Given the following user criteria, find the best PG/room matches:

  Budget: {{{budget}}}
  Location: {{{location}}}
  Facilities: {{{facilities}}}
  Roommate Preference: {{{roommatePreference}}}

  Return a list of PG/room matches, including the name, address, price, facilities, contact
  information, and a match score (0-1) indicating how well each option fits the user's needs.
  The facilities string should only include the facilities that are actually present in the PG/room. `,
});

const pgRoomMatcherFlow = ai.defineFlow(
  {
    name: 'pgRoomMatcherFlow',
    inputSchema: PgRoomMatcherInputSchema,
    outputSchema: PgRoomMatcherOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
