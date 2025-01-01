// import OpenAI from 'openai';
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import cv from 'marco_peretti.resume.json';
import {samplePrompts} from 'lib/prompts'

const env = process.env.NODE_ENV

// IMPORTANT! Set the runtime to edge
// https://sdk.vercel.ai/docs/guides/providers/openai
export const runtime = 'edge';
 
export async function POST(req: Request) {

  try {
    // Extract the `prompt` from the body of the request
    const { prompt } = await req.json();

    if (env != "development" && !samplePrompts.includes(prompt)) {
      
      await fetch("https://randompunctuation.com/api/db", {
        method: "POST",
        mode: "cors",
        credentials: "same-origin", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(prompt),
      })
    }

    //console.log(prompt);

    const textStream = streamText({
      model: openai('gpt-4-turbo'),
      temperature: 0.6,
      maxTokens: 350,
      prompt: `You are a helpful assistant who is tasked to answer questions about my resume as if you were The Oracle from The Matrix movie sharing her wisdom. Answer using the third person form and refer to him either as Marco or he and limit the answer to about 150 words. Base your answers on my resume and do your very best to answer any question. Question:${prompt}  Resume: ${JSON.stringify(cv)}. If the answer cannot be found in the resume, write "Sorry, cannot not answer that question. Check spelling, rephrase or simply submit again. chatGPT's behaviour is somewhat erratic"`,
      async onFinish({ text, toolCalls, toolResults, usage, finishReason }) {
        // implement your own logic here, e.g. for storing messages
        // or recording token usage
      },
    });

    return textStream.toDataStreamResponse();
  } catch (error) {
    console.error('Error processing request:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}