'use client';

import { useRef, useState } from 'react';
import { useChat } from 'ai/react';

export default function Page() {
  const [bio, setBio] = useState('');
  const bioRef = useRef<null | HTMLDivElement>(null);

  const scrollToBios = () => {
    if (bioRef.current !== null) {
      bioRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const { input, handleInputChange, handleSubmit, isLoading, messages } =
    useChat({
      body: {
        bio,
      },
      onResponse() {
        scrollToBios();
      },
    });

  const onSubmit = (e: any) => {
    setBio(input);
    handleSubmit(e);
  };

  
  const lastMessage = messages[messages.length - 1];
  const generatedBios = lastMessage?.role === "assistant" ? lastMessage.content : null;

  return (
    
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-2 sm:mt-2">

        <h1 className="sm:text-6xl text-4xl font-bold max-w-[708px]">
          Ask chatGPT questions about my resume
        </h1>
        <form className="max-w-xl w-full" onSubmit={onSubmit}>
          <textarea
            value={input}
            onChange={handleInputChange}
            rows={4}
            className="w-full my-5"
            placeholder={
              'eg: AWS experience'
            }
          />
    
          {!isLoading && (
            <button
              className="bg-black rounded-xl font-medium px-4 py-2 sm:mt-10 mt-8 w-full"
              type="submit"
            >
              Ask &rarr;
            </button>
          )}
          {isLoading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 w-full"
              disabled
            >
              <span className="loading">
                <span style={{ backgroundColor: 'white' }} />
                <span style={{ backgroundColor: 'white' }} />
                <span style={{ backgroundColor: 'white' }} />
              </span>
            </button>
          )}
        </form>
    
        <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
        <output className="space-y-10 my-10">
          {generatedBios && (
            <>
              <div>
                <h2
                  className="sm:text-4xl text-3xl font-bold  text-900 mx-auto"
                  ref={bioRef}
                >
                  Your answers
                </h2>
              </div>
              <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto">
                {generatedBios
                  .split('.')
                  .map((generatedBio) => {
                    return (
                      <div
                        className="bg-yellow rounded-xl shadow-md p-4 transition cursor-copy border"
                       
                        key={generatedBio}
                      >
                        <p>{generatedBio}</p>
                      </div>
                    );
                  })}
              </div>
            </>
          )}
        </output>
      </main>
    </div>
  );
}
