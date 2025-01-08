'use client';

import { useState, useEffect } from 'react';
import oracle from 'public/images/oracle1.jpg';
import Image from 'next/image';
import OpenAIAudioChat from '../components/OpenAIAudioChat';
import {SessionResponse} from 'lib/interfaces'

export default function Chat() {

  const [data, setData] = useState<SessionResponse>( {
    client_secret: {
      value: '',
      expires_at: 0
    }
  })

  const [isFetching, setFetching] = useState(true) 

  useEffect(() => {
    const fetchMessage = async () => {
      const res = await fetch('/api/oai');
      const data = await res.json();
      //console.log ("data", data.data);
      setData(data.data);
    };
    fetchMessage();
  }, []); // Empty dependency array ensures this runs only once
   
  if (data?.client_secret.expires_at == 0) return <div>Loading...</div>
  console.log ("Got da secret...");

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
        You may ask The Oracle questions about my work experience. It's 2025, and The Oracle uses OpenAI Realtime Audio over WebRTC. 
      </h4>

      <h4 className="text-xl font-bold text-900 md:text-xl pb-4">
        The APIs are also quite buggy, and therefore it does not always work :-( 
      </h4>

      <div className="container mx-auto py-2">
        <OpenAIAudioChat 
          token={data?.client_secret.value}
          voice="alloy" 
      />
      </div>
  </div>
  
       
    </div>
  );
}
