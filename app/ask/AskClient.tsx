'use client';

import { useState, useEffect } from 'react';
import oracle from 'public/images/oracle1.jpg';
import Image from 'next/image';
import OpenAIAudioChat from '../components/OpenAIAudioChat';
import {SessionResponse} from 'lib/interfaces'


export default function AskClient() {

  const [isFetching, setFetching] = useState(true) 
  const [data, setData] = useState<SessionResponse>( {
    client_secret: {
      value: '',
      expires_at: 0
    }
  })

  useEffect(() => {
    // Guards against setting state after the component has unmounted, and
    // keeps every setState call behind an await so the effect body itself
    // stays synchronous (react-hooks/set-state-in-effect).
    let cancelled = false;

    const fetchToken = async () => {
      try {
        const res = await fetch('/api/oai');
        if (!res.ok) throw new Error('Failed to fetch token');

        const json = await res.json();
        if (!cancelled) setData(json.data);
      } catch (err) {
        console.log("error", err);
      } finally {
        if (!cancelled) setFetching(false);
      }
    };

    fetchToken();

    return () => {
      cancelled = true;
    };
  }, []); // Empty dependency array ensures this runs only once
   
  //if (data?.client_secret.expires_at == 0) return <div>Loading...</div>

  if (isFetching) return <p>Loading...</p>

  return (
  
  <div className="flex flex-col w-full max-w-md py-6 mx-auto stretch">
  
    <div className="columns-1 sm:columns-1 gap-4 my-4">
        <div className="relative w-full aspect-video mb-4">
          <Image
            alt="Morpheus"
            src={oracle}
            fill
            sizes="(max-width: 588px) 100vw"
            priority
            className="rounded-lg object-cover"
          />
        </div>
      </div>

      <div className="relative inline-block text-left">

      <h4 className="text-xl font-bold text-900 md:text-xl pb-4">
        You may ask The Oracle questions about my work experience. It&apos;s 2026, and The Oracle uses OpenAI Realtime Audio over WebRTC. 
      </h4>
      <div className="container mx-auto py-2">
        <OpenAIAudioChat 
          token={data?.client_secret.value}
      />
      </div>
  </div>
  
       
    </div>
  );
}
