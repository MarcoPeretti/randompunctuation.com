'use client';
 
import { useCompletion } from 'ai/react';
import { useRef } from 'react';
 
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
      <div className="relative inline-block text-left">
 
      <h4 className="text-xl font-bold text-900 md:text-xl pb-4">
        Ask chatGPT questions about my resume:
      </h4>
      {error && (
        <div className="fixed top-0 left-0 w-full p-4 text-center bg-red-500 text-white">
          {error.message}
        </div>
      )}
      </div>

      <label htmlFor="prompts"  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select a sample prompt or type your question, then hit Enter</label>
      <select id="prompts" onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <option value="On a scale of 1-10 how good is Marco?">On a scale of 1-10 how good is Marco?</option>
        <option value="How does Marco cope with high-pressure environments?">How does Marco cope with high-pressure environments?</option>
        <option value="Why should our senior team hire Marco?">Why should our senior team hire Marco?</option>
      </select>
      
      <div className="prose prose-bold dark:prose-invert dark:text-black">

      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
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
