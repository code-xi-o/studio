// src/ai/flows/personalized-roadmap-recommendation.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing personalized roadmap recommendations to students based on their skills and interests.
 *
 * - personalizedRoadmapRecommendation - A function that takes user skills and interests as input and returns a personalized roadmap recommendation.
 * - PersonalizedRoadmapRecommendationInput - The input type for the personalizedRoadmapRecommendation function.
 * - PersonalizedRoadmapRecommendationOutput - The output type for the personalizedRoadmapRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedRoadmapRecommendationInputSchema = z.object({
  skills: z
    .string()
    .describe('The current skills of the student, as a comma separated list.'),
  interests: z
    .string()
    .describe('The interests of the student, as a comma separated list.'),
});
export type PersonalizedRoadmapRecommendationInput =
  z.infer<typeof PersonalizedRoadmapRecommendationInputSchema>;

const PersonalizedRoadmapRecommendationOutputSchema = z.object({
  roadmap: z
    .string()
    .describe(
      'A personalized roadmap recommendation based on the student\'s skills and interests.'
    ),
});
export type PersonalizedRoadmapRecommendationOutput =
  z.infer<typeof PersonalizedRoadmapRecommendationOutputSchema>;

export async function personalizedRoadmapRecommendation(
  input: PersonalizedRoadmapRecommendationInput
): Promise<PersonalizedRoadmapRecommendationOutput> {
  return personalizedRoadmapRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedRoadmapRecommendationPrompt',
  input: {schema: PersonalizedRoadmapRecommendationInputSchema},
  output: {schema: PersonalizedRoadmapRecommendationOutputSchema},
  prompt: `You are an expert career counselor specializing in providing personalized roadmaps for students in Computer Science.

You will use the student's current skills and interests to provide a personalized roadmap recommendation.

Current Skills: {{{skills}}}
Interests: {{{interests}}}

Roadmap Recommendation:`,
});

const personalizedRoadmapRecommendationFlow = ai.defineFlow(
  {
    name: 'personalizedRoadmapRecommendationFlow',
    inputSchema: PersonalizedRoadmapRecommendationInputSchema,
    outputSchema: PersonalizedRoadmapRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
