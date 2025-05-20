
// src/ai/flows/local-assistant.ts
'use server';

/**
 * @fileOverview Provides AI-driven local information and recommendations.
 *
 * - getLocalAssistantResponse - A function that takes a user query and returns information or a recommendation.
 * - LocalAssistantInput - The input type for the getLocalAssistantResponse function.
 * - LocalAssistantOutput - The return type for the getLocalAssistantResponse function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const LocalAssistantInputSchema = z.object({
  userQuery: z
    .string()
    .describe('The user\'s question or request about the city (e.g., \'What are some good parks nearby?\', \'Tell me about the local history\', or \'craving something sweet\', \'feeling adventurous\').'),
});
export type LocalAssistantInput = z.infer<typeof LocalAssistantInputSchema>;

const LocalAssistantOutputSchema = z.object({
  recommendation: z.string().describe('A helpful response, recommendation, or information based on the user\'s query.'),
  reason: z.string().describe('The reasoning or additional context for the response/recommendation.'),
});
export type LocalAssistantOutput = z.infer<typeof LocalAssistantOutputSchema>;

export async function getLocalAssistantResponse(input: LocalAssistantInput): Promise<LocalAssistantOutput> {
  return localAssistantFlow(input);
}

const localAssistantPrompt = ai.definePrompt({
  name: 'localAssistantPrompt',
  input: {schema: LocalAssistantInputSchema},
  output: {schema: LocalAssistantOutputSchema},
  prompt: `You are a helpful and knowledgeable local assistant for the city. A user will ask you a question, state a mood, or mention a craving. Provide a relevant recommendation, information, or answer. If they mention a mood or craving, suggest a specific spot or activity. Explain your reasoning or provide context.

User Query: {{{userQuery}}}
`,
});

const localAssistantFlow = ai.defineFlow(
  {
    name: 'localAssistantFlow',
    inputSchema: LocalAssistantInputSchema,
    outputSchema: LocalAssistantOutputSchema,
  },
  async input => {
    const {output} = await localAssistantPrompt(input);
    return output!;
  }
);
