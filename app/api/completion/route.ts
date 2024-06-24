import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { NextResponse } from 'next/server';
import cv from 'marco_peretti.resume.json';
import {samplePrompts} from 'lib/prompts'

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
 
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

    // Ask OpenAI for a streaming completion given the prompt
    const response = await openai.completions.create({
      model: 'gpt-3.5-turbo-instruct',
      max_tokens: 350,
      temperature: 0.6,
      stream: true,   
      prompt: `You are a helpful assistant who is tasked to answer questions about my resume as if you were The Oracle from The Matrix movie sharing her wisdom. Answer using the third person form and refer to him either as Marco or he and limit the answer to about 150 words. Base your answers on my resume and do your very best to answer any question. Question:${prompt}  Resume: ${JSON.stringify(cv)}. If the answer cannot be found in the resume, write "Sorry, cannot not answer that question. Check spelling, rephrase or simply submit again. chatGPT's behaviour is somewhat erratic"`,
    
    });
  
    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response);
  
    // Respond with the stream
    return new StreamingTextResponse(stream);
  } catch (error) {
    // Check if the error is an APIError
    if (error instanceof OpenAI.APIError) {
      const { name, status, headers, message } = error;
      return NextResponse.json({ name, status, headers, message }, { status });
    } else {
      throw error;
    }
  }
}