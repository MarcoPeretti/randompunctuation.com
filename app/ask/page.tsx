'use client';
 
import { useCompletion } from 'ai/react';
import { useRef } from 'react';
import oracle from 'public/images/oracle1.jpg';
import Image from 'next/image';


export default function Chat() {

  const bioRef = useRef<null | HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function onChange(e) {
    handleInputChange(e);

    if (inputRef.current) {
      inputRef.current.focus(); // Set focus to the input field
    }
  }

  const scrollToBios = () => {
    if (bioRef.current !== null) {
      bioRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const { completion, input, handleInputChange, handleSubmit, isLoading, error } =
    useCompletion({
      onResponse() {
        scrollToBios();
      },
    });
   
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
        Ask The Oracle questions about my resume

        <a
        href="/docs/MarcoPeretti.pdf"
        target="_blank"
        rel="noopener noreferrer"
      >, or click here for pdf</a>

      </h4>
      {error && (
        <div className="fixed top-0 left-0 w-full p-4 text-center bg-red-500 text-white">
          {error.message}
        </div>
      )}
      </div>

      <label htmlFor="prompts"  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select a sample prompt or type your question, then hit Enter<br />Do not take the answers too literally.</label>
      <select id="prompts" onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <option value="Give me 5 reasons why we should hire him">Give me 5 reasons why we should hire him</option>
        <option value="How does Marco cope with high-pressure environments?">How does Marco cope with high-pressure environments?</option>
        <option value="Why should our senior team hire Marco?">Why should our senior team hire Marco?</option>
      </select>
      
      <div className="prose prose-bold dark:prose-invert dark:text-white">

      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          id="prompt"
          maxLength={50} 
          className="space-y-10 w-full max-w-md p-2 mb-8 border rounded shadow-xl"
          value={input}
          placeholder="Eg: Tell me about your management experience"
          onChange={handleInputChange}
          disabled={isLoading}
        />
      </form>
      </div>

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
