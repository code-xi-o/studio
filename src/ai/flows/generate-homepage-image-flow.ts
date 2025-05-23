
'use server';
/**
 * @fileOverview A Genkit flow to generate an image for the homepage.
 *
 * - generateHomepageImage - A function that generates an image.
 * - GenerateHomepageImageOutput - The return type for the generateHomepageImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateHomepageImageOutputSchema = z.object({
  imageUrl: z.string().url().describe("The Data URI of the generated image. Expected format: 'data:image/png;base64,<encoded_data>'."),
});
export type GenerateHomepageImageOutput = z.infer<typeof GenerateHomepageImageOutputSchema>;

export async function generateHomepageImage(): Promise<GenerateHomepageImageOutput> {
  // This function calls the Genkit flow.
  // Intentionally no input is passed to the flow for this specific use case.
  return generateHomepageImageFlow();
}

const generateHomepageImageFlow = ai.defineFlow(
  {
    name: 'generateHomepageImageFlow',
    inputSchema: z.void(), // No specific input needed for this flow
    outputSchema: GenerateHomepageImageOutputSchema,
  },
  async () => {
    const {media} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-exp', // MUST use this model for image generation
      prompt: 'Generate a visually appealing and optimistic image representing technology education, innovation, and a learning journey. The image should be suitable for a website homepage banner. Aim for an aspect ratio around 16:9 or similar to 600x400 pixels. The style should be modern and clean.',
      config: {
        responseModalities: ['TEXT', 'IMAGE'], // MUST provide both TEXT and IMAGE
      },
    });

    if (!media || !media.url) {
      console.error('Image generation failed or returned no URL.');
      throw new Error('Image generation failed or returned no URL.');
    }
    // The media.url will be a data URI, e.g., "data:image/png;base64,..."
    return { imageUrl: media.url };
  }
);
