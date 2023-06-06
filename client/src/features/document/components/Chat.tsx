import { Send } from 'lucide-react';
import { useState } from 'react';

import { Skeleton } from '@/components';

import { fetchDataFromOpenAiApi } from '../api/chat';

type ChatFormProps = {
  setPrompt: (value: string) => void;
  fetchData: (e: React.FormEvent<HTMLFormElement>) => void;
  prompt: string;
  placeholder?: string;
};

const ChatForm = ({
  fetchData,
  prompt,
  setPrompt,
  placeholder = 'Type message',
}: ChatFormProps) => {
  return (
    <form onSubmit={(e) => fetchData(e)} className='flex w-full'>
      <input
        type='text'
        name='prompt'
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className='w-full bg-transparent text-sm focus:outline-0'
        placeholder={placeholder}
      />
      <button type='submit'>
        <Send className='h-5 rotate-45 cursor-pointer text-slate-600' />
      </button>
    </form>
  );
};

type ChatTextSelectionProps = {
  selectedText: string;
  setPrompt: (value: string) => void;
  fetchData: (e: React.FormEvent<HTMLFormElement>) => void;
  prompt: string;
};

const ChatTextSelection = ({
  selectedText,
  setPrompt,
  fetchData,
  prompt,
}: ChatTextSelectionProps) => {
  return (
    <div className='flex h-[80%] flex-col rounded border-2 bg-slate-100 p-2'>
      <div className='flex-1 overflow-y-auto rounded bg-white'>
        <div className='border-b p-2 text-sm'>Selected Text</div>
        <div className='p-2 text-sm'>{selectedText}</div>
      </div>
      <div className='mt-3 flex items-center px-2'>
        <ChatForm
          fetchData={fetchData}
          setPrompt={setPrompt}
          prompt={prompt}
          placeholder='Do something with selected text'
        />
      </div>
    </div>
  );
};

type ConversationProps = {
  question: string;
  isLoading: boolean;
  aiAssistantResponse: string;
  prompt: string;
  setPrompt: (value: string) => void;
  fetchData: (e: React.FormEvent<HTMLFormElement>) => void;
};

const Conversation = ({
  question,
  isLoading,
  aiAssistantResponse,
  fetchData,
  setPrompt,
  prompt,
}: ConversationProps) => {
  return (
    <>
      <div className='mb-2 flex-1 overflow-y-auto'>
        {question && (
          <div className='float-left  max-w-[80%] rounded-r-lg rounded-bl-lg bg-slate-200 p-2 text-sm'>
            {question}
          </div>
        )}
        {isLoading ? (
          <Skeleton className='float-right mt-2 h-8 w-[80%] rounded-l-lg rounded-br-lg' />
        ) : (
          aiAssistantResponse && (
            <div className='float-right me-2 mt-2 w-[80%] rounded-l-lg rounded-br-lg bg-slate-100 p-2 text-sm'>
              {aiAssistantResponse}
            </div>
          )
        )}
      </div>

      <div className='flex h-10 items-center rounded border-2 bg-slate-100 px-4'>
        <ChatForm fetchData={fetchData} setPrompt={setPrompt} prompt={prompt} />
      </div>
    </>
  );
};

type ChatProps = {
  selectedText: string;
  resetEditorSelection: () => void;
};

export const Chat = ({ selectedText, resetEditorSelection }: ChatProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [question, setQuestion] = useState<string>('');
  const [aiAssistantResponse, setAIAssistantResponse] = useState<string>('');
  const [prompt, setPrompt] = useState<string>('');

  const fetchData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    let question = '';

    if (selectedText.length) {
      question = `${prompt}: "${selectedText}"`;
    } else {
      question = `${prompt}`;
    }

    setPrompt('');
    resetEditorSelection();
    setQuestion(question);

    try {
      const response = await fetchDataFromOpenAiApi(question);
      setIsLoading(false);
      setAIAssistantResponse(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {selectedText.length ? (
        <ChatTextSelection
          selectedText={selectedText}
          setPrompt={setPrompt}
          fetchData={fetchData}
          prompt={prompt}
        />
      ) : (
        <Conversation
          question={question}
          isLoading={isLoading}
          aiAssistantResponse={aiAssistantResponse}
          prompt={prompt}
          setPrompt={setPrompt}
          fetchData={fetchData}
        />
      )}
    </>
  );
};
