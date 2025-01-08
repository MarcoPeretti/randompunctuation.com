import React, { useState, useRef, useEffect } from 'react';
import cv from 'marco_peretti.resume.json';

const OpenAIAudioChat = ({ token, voice = 'alloy' }) => {
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [dataChannel, setDataChannel] = useState<RTCDataChannel | null>(null);
  const peerConnectionRef = useRef(null);
  const audioRef = useRef<HTMLAudioElement>(new Audio());
  const audioContextRef = useRef(null);
  const audioIndicatorRef = useRef<HTMLSpanElement | null>(null);

  const createRealtimeSession = async (stream) => {
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
    });

    // Handle ICE candidates
    pc.onicecandidate = event => {
      if (event.candidate) {
        // Handle ICE candidate if needed
      }
    };

    // Set up audio
    audioRef.current = new Audio();
    pc.ontrack = e => {
      audioRef.current.srcObject = e.streams[0];
      audioRef.current.autoplay = true;
    };

    // Add local audio track
    pc.addTrack(stream.getTracks()[0], stream);

    // Create and set up data channel
    const dc = pc.createDataChannel('openai');
    setDataChannel(dc);

    dc.onopen = () => {
      if (dc.readyState === 'open') {
        sendInitialMessages(dc);
      }
    };

    dc.onmessage = (event) => {
      const message = JSON.parse(event.data);
      // Handle incoming messages
     // console.log('Received message:', message);
    };

    dc.onerror = (error) => {
      console.error('Data channel error:', error);
      stopSession();
    };

    // Create and send offer
    try {
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      const resp = await fetch(
        `https://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview-2024-12-17&voice=${voice}`,
        {
          method: 'POST',
          body: offer.sdp,
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/sdp'
          }
        }
      );

      if (!resp.ok) {
        throw new Error(`Failed to get answer: ${resp.statusText}`);
      }

      const answer = await resp.text();
      await pc.setRemoteDescription({
        type: 'answer',
        sdp: answer
      });

      return pc;
    } catch (error) {
      console.error('Connection setup failed:', error);
      pc.close();
      throw error;
    }
  };

  const startSession = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false
      });

      const pc = await createRealtimeSession(stream);
      peerConnectionRef.current = pc;
      setIsSessionActive(true);

      // Set up audio visualization after connection is established
      setupAudioVisualization(stream);
    } catch (error) {
      console.error('Session start failed:', error);
      stopSession();
      // Handle error UI feedback
    }
  };

  const stopSession = () => {
    if (dataChannel) {
      dataChannel.close();
      setDataChannel(null);
    }

    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }

    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    if (audioRef.current) {
      audioRef.current.srcObject = null;
    }

    setIsSessionActive(false);
  };

  useEffect(() => {
    return () => {
      stopSession();
    };
  }, []);



  const setupAudioVisualization = (stream) => {
    const audioContext = new AudioContext();
    const source = audioContext.createMediaStreamSource(stream);
    const analyzer = audioContext.createAnalyser();
    analyzer.fftSize = 256;
    
    source.connect(analyzer);
    
    const bufferLength = analyzer.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    function updateIndicator() {
      if (!audioContext) return;
      
      analyzer.getByteFrequencyData(dataArray);
      const average = dataArray.reduce((a, b) => a + b) / bufferLength;
      
      if (audioIndicatorRef.current) {
        audioIndicatorRef.current.classList.toggle('active', average > 30);
      }
      requestAnimationFrame(updateIndicator);
    }
    
    updateIndicator();
    return audioContext;
  };
  
  const sendInitialMessages = (dc) => {
    const systemItem = {
      type: "conversation.item.create",
      item: {
        type: "message",
        role: "system",
        content: [
          {
            type: "input_text",
            text: `You are a helpful assistant who is tasked to answer questions about my resume as if you were The Oracle from The Matrix movie sharing her wisdom. Answer using the third person form and refer to him either as Marco or he and limit the answer to about 150 words. Base your answers on my resume and do your very best to answer any question. Resume: ${JSON.stringify(cv)}. If the answer cannot be found in the resume, write "Sorry, cannot not answer that question."`,
          }
        ]
      },
    };
  
    const initialConversationItem = {
      type: "conversation.item.create",
      item: {
        type: "message",
        role: "user",
        content: [
          {
            type: "input_text",
            text: "Greet the user with the exact message: Hello, I am the Oracle and and I am here to answer your questions about Marco.",
          }
        ]
      },
    };
  
    dc.send(JSON.stringify(systemItem));
    dc.send(JSON.stringify(initialConversationItem));
    dc.send(JSON.stringify({"type": "response.create"}));
  };

  return (
<div className="max-w-2xl mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <span 
            ref={audioIndicatorRef}
            className="inline-block w-5 h-5 rounded-full bg-gray-300"
          />
          OpenAI Audio Chat
        </h1>
      </div>

      <div className="space-y-4">
        <button
          onClick={isSessionActive ? stopSession : startSession}
          className={`w-full px-4 py-2 rounded-md text-white font-medium transition-colors
            ${isSessionActive 
              ? 'bg-red-500 hover:bg-red-600 active:bg-red-700' 
              : 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700'
            }`}
        >
          {isSessionActive ? 'End Conversation' : 'Start Conversation'}
        </button>

  
      </div>

      <style jsx>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
        
        .active {
          background: #4CAF50 !important;
          animation: pulse 1s infinite;
        }
      `}</style>
    </div>
  );
};

export default OpenAIAudioChat;