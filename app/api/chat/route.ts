import { Configuration, OpenAIApi } from 'openai-edge';
import { OpenAIStream, StreamingTextResponse } from 'ai';


import cv from 'marco_peretti.resume.json';
import OpenAI from 'openai';
import { NextResponse } from 'next/server';

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

// Set the runtime to edge for best performance
export const runtime = 'edge';

export async function POST(req: Request) {

  try {

    const { messages } = await req.json();
    console.log('prompt route', messages);
    
    // Ask OpenAI for a streaming completion given the prompt
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      stream: true,
      temperature: 0.5,
      max_tokens: 300,
      messages: [
        {
          role: 'user',
          content: `Describe my experience and skills with regards to ${messages[0].content} Answer using third person form and refer to me as Marco. You may also refer to my projects when relevant.`
        },
        {
          role: 'system',
          content: `Base answers only from my resume. Resume ${JSON.stringify(cv)}`
        }
      ],
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
