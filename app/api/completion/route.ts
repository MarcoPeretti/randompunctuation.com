import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import cv from 'marco_peretti.resume.json';
import { savePromptEntry } from 'app/actions';

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
 
// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';
 
export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const { prompt } = await req.json();

  await savePromptEntry(prompt);

  // Ask OpenAI for a streaming completion given the prompt
  const response = await openai.completions.create({
    model: 'gpt-3.5-turbo-instruct',
    max_tokens: 300,
    temperature: 0.5,
    stream: true,   
    prompt: `${prompt} and limit the answer to about 200 words. Answer using the third person form and refer to me either as Marco or he. Base your answers only on my resume. Resume: ${JSON.stringify(cv)}. If the answer cannot be found in the resume, write "Sorry, cannot not answer that question. Check spelling or rephrase."`,
   
  });
 
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
 
  // Respond with the stream
  return new StreamingTextResponse(stream);
}