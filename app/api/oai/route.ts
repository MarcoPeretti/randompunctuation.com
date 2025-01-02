export const runtime = 'edge';
import { NextResponse } from 'next/server'
import {SessionResponse} from 'lib/interfaces'

export async function GET() {
    try {

      const response = await fetch('https://api.openai.com/v1/realtime/sessions', {
        method: 'POST',
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
      //const data = await response.json() as SessionResponse
      //const clientSecret = data.client_secret.value

      //console.log(clientSecret);
      return NextResponse.json({ data })  

    } catch (error) {
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      )
    }
  }