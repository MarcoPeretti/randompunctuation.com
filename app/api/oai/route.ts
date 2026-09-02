import { NextResponse } from 'next/server'
import cv from 'marco_peretti.resume.json'

// The edge runtime is deprecated in Next 16, and this handler only needs
// fetch, NextResponse and process.env, all of which the Node runtime provides.
export const runtime = 'nodejs';

const MODEL = 'gpt-realtime';
const VOICE = 'alloy';

// The Realtime GA API binds the model, the voice and the instructions to the
// ephemeral key when it is minted. The beta API instead accepted them as query
// parameters on the SDP exchange, which no longer exists, so the whole session
// prompt lives here now rather than in the browser.
const INSTRUCTIONS = `You are a helpful assistant who is tasked to answer questions about my resume as if you were The Oracle from The Matrix movie sharing her wisdom. Answer using the third person form and refer to him either as Marco or he and limit the answer to about 150 words. Base your answers on my resume and do your very best to answer any question. Resume: ${JSON.stringify(cv)}. If the answer cannot be found in the resume, write "Sorry, cannot not answer that question."`;

export async function GET() {

    try {

      const response = await fetch('https://api.openai.com/v1/realtime/client_secrets', {
        method: 'POST',
        cache: 'no-store',
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          session: {
            type: 'realtime',
            model: MODEL,
            instructions: INSTRUCTIONS,
            audio: { output: { voice: VOICE } },
          },
        }),
      })
  
      if (!response.ok) {
        return NextResponse.json(
          { error: 'OpenAI API request failed' },
          { status: response.status }
        )
      }
  
      const secret = await response.json()

      // GA returns { value, expires_at, session }; the beta API nested the key
      // under client_secret. Normalise onto the shape the client already reads.
      return NextResponse.json({
        data: {
          client_secret: {
            value: secret.value,
            expires_at: secret.expires_at,
          },
        },
      })

    } catch (error) {
      console.log("Err:", error)
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      )
    }
  }
