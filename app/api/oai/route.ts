import { NextResponse } from 'next/server'

// The edge runtime is deprecated in Next 16, and this handler only needs
// fetch, NextResponse and process.env, all of which the Node runtime provides.
export const runtime = 'nodejs';

export async function GET(request: Request) {

    try {

      const response = await fetch('https://api.openai.com/v1/realtime/sessions', {
        method: 'POST',
        cache: 'no-store',
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-realtime',
          voice: 'alloy',
        }),
      })
  
      if (!response.ok) {
        return NextResponse.json(
          { error: 'OpenAI API request failed' },
          { status: response.status }
        )
      }
  
      const data = await response.json()
      return NextResponse.json({ data })  

    } catch (error) {
      console.log("Err:", error)
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      )
    }
  }