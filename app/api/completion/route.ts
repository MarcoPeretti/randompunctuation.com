import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import cv from 'marco_peretti.resume.json';

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
 
// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';
 
export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const { prompt } = await req.json();


  // Ask OpenAI for a streaming completion given the prompt
  const response = await openai.completions.create({
    model: 'gpt-3.5-turbo-instruct',
    max_tokens: 300,
    temperature: 0.5,
    stream: true,   
    prompt: `Describe my experience and skills regarding ${prompt}. Anser using the third person form and refer to me either as Marco or he. Base your answers only on my resume. Resume: ${JSON.stringify(cv)}.`,
   
  });
 
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
 
  // Respond with the stream
  return new StreamingTextResponse(stream);
}