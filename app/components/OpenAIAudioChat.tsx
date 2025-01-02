import React, { useState, useRef, useEffect } from 'react';

import cv from 'marco_peretti.resume.json';

const OpenAIAudioChat = ({ token, voice = 'alloy' }) => {
  const [isActive, setIsActive] = useState(false);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioStreamRef = useRef<MediaStream | null>(null);
  const dataConnectionRef = useRef<RTCDataChannel | null>(null);

  /*

  instuctions are not the same as the prompt. the instructions are succint
  and tey influcence how the model wil answer the prompt.

  */
  //const encodedPrompt = encodeURIComponent(`You are a helpful assistant who is tasked to answer questions about my resume as if you were The Oracle from The Matrix movie sharing her wisdom. Answer using the third person form and refer to him either as Marco or he and limit the answer to about 150 words. Base your answers on my resume and do your very best to answer any question. Resume: ${JSON.stringify(cv)}. If the answer cannot be found in the resume, write "Sorry, cannot not answer that question."`);
  const encodedPrompt = encodeURIComponent(`You are a helpful assistant who is tasked to answer questions as if you were The Oracle from The Matrix movie sharing her wisdom.`);


  const createRealtimeSession = async (inStream, token, voice) => {
    const pc = new RTCPeerConnection();
    
    // Handle incoming audio
    pc.ontrack = e => {
      const audio = new Audio();
      audio.srcObject = e.streams[0];
      audio.play();
    };
    
    pc.addTrack(inStream.getTracks()[0]);
    
    ///
    const initialConversationItem = {
      type: "conversation.item.create",
      item: {
        type: "message",
        role: "user",
        content: [
          {
            type: "input_text",
            text: "Great the user with the exact message: Hello, I am the Oracle and and I am here to answer your questions about Marco.",
          }
        ]
      },
    };

    const systemItem = {
      type: "conversation.item.create",
      item: {
        type: "message",
        role: "system",
        content: [
          {
            type: "input_text",
            text:  `You are a helpful assistant who is tasked to answer questions about my resume as if you were The Oracle from The Matrix movie sharing her wisdom. Answer using the third person form and refer to him either as Marco or he and limit the answer to about 150 words. Base your answers on my resume and do your very best to answer any question. Resume: ${JSON.stringify(cv)}. If the answer cannot be found in the resume, write "Sorry, cannot not answer that question."`,
          }
        ]
      },
    };
    
    const dc = pc.createDataChannel('openai');


    dc.onopen = (event) => {

      if (dc.readyState === 'open') {
        dc.send(JSON.stringify(systemItem))
        dc.send(JSON.stringify(initialConversationItem))
        dc.send(JSON.stringify({"type": "response.create"}))
      }
    };


    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/sdp'
    };
    
    const opts = {
      method: 'POST',
      body: offer.sdp,
      headers
    };
    
    const model = 'gpt-4o-realtime-preview-2024-12-17';
    const resp = await fetch(`https://api.openai.com/v1/realtime?model=${model}&voice=${voice}&instructions=${encodedPrompt}`, opts);
    
    await pc.setRemoteDescription({
      type: 'answer',
      sdp: await resp.text()
    });
    
    return pc;
  };

  const startSession = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false
      });
      
      audioStreamRef.current = stream;
            
      const pc = await createRealtimeSession(
        stream,
        token,
        voice
      );
      
    
      peerConnectionRef.current = pc;
      setIsActive(true);

      
      
    } catch (err) {
      console.error('Session error:', err);
      stopSession();
    }
  };

  const stopSession = () => {
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }
    
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    
    if (audioStreamRef.current) {
      audioStreamRef.current.getTracks().forEach(track => track.stop());
      audioStreamRef.current = null;
    }

    if (dataConnectionRef.current) {  
      dataConnectionRef.current.close();
      dataConnectionRef.current = null;
    }
    
    setIsActive(false);
  };

  return (
    <div className="p-4">
      <button
        onClick={isActive ? stopSession : startSession}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {isActive ? 'Stop Audio Chat' : 'Start Audio Chat'}
      </button>
    </div>
  );
};

export default OpenAIAudioChat;