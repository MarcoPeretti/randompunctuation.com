'use client';
 
import { useCompletion } from 'ai/react';
import { useRef } from 'react';
 
// use         {completion}

export default function Chat() {


  const bioRef = useRef<null | HTMLDivElement>(null);

  const scrollToBios = () => {
    if (bioRef.current !== null) {
      bioRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

    const { completion, input, handleInputChange, handleSubmit, error } =
      useCompletion({
        onResponse() {
          scrollToBios();
        },
      });
   
    
    return (
      <div className="flex flex-col w-full max-w-md py-6 mx-auto stretch">
        <h4 className="text-xl font-bold text-900 md:text-xl pb-4">
          Ask chatGPT questions about my resume:
        </h4>
        {error && (
          <div className="fixed top-0 left-0 w-full p-4 text-center bg-red-500 text-white">
            {error.message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <input
            className="space-y-10 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
            value={input}
            placeholder="Ask something about my resume and click enter..."
            onChange={handleInputChange}
          />
        </form>

        <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
        <output className="space-y-10 my-10">
          {completion && (
            <>
              <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto">
                {completion
                  .split('.')
                  .map((generatedBio) => {
                    return (
                      <div
                        className="rounded-xl shadow-md p-4 transition cursor-copy border"
                        
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

      </div>
    );
  }


/*
  const [bio, setBio] = useState('');
  const bioRef = useRef<null | HTMLDivElement>(null);

  const scrollToBios = () => {
    if (bioRef.current !== null) {
      bioRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const { messages, input, handleInputChange, handleSubmit } = 
  
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
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {messages.map(m => (
        <div key={m.id} className="whitespace-pre-wrap">
          {m.role === 'user' ? 'Question: ' : 'Answer: '}
          {m.content}
        </div>
      ))}
 
      <form onSubmit={onSubmit}>
        <input
          className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
          value={input}
          placeholder="Ask something..."
          onChange={handleInputChange}
        />
      </form>

    </div>
  );
}

*/