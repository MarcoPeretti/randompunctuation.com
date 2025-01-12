export const runtime = 'edge';
import { NextResponse } from 'next/server'

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
          model: 'gpt-4o-realtime-preview-2024-12-17',
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