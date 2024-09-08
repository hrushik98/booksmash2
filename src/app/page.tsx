'use client';

import { useState } from 'react';
import { Button } from './components/Button';
import { Input } from './components/Input';
import { Alert } from './components/Alert';
import { BookOpen, Home as HomeIcon, Library, LogOut, Bookmark, Volume2 } from 'lucide-react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY || '';
export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [bookName, setBookName] = useState('');
  const [error, setError] = useState('');
  const [summary, setSummary] = useState('');
  const [isSavePopupVisible, setIsSavePopupVisible] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookName.trim()) {
      setError('Please enter a book name');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: 'You are a helpful book summarizer' },
            {
              role: 'user',
              content: `Please summarize this book "${bookName}" and give me the summary in markdown`,
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`, 
          },
        }
      );

      setSummary(response.data.choices[0].message.content);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch the summary. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const popularBooks = [
    'Power of now',
    'The Subtle Art of Not Giving a F*ck',
    'Atomic Habits',
    'The Richest Man in Babaylon',
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md hidden lg:block">
        <div className="p-4">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <BookOpen className="mr-2" />
            BookAI
          </h2>
        </div>
        <nav className="mt-8">
          <a href="#" className="flex items-center px-4 py-2 text-gray-700 bg-gray-200">
            <HomeIcon className="mr-2" />
            Home
          </a>
          <a href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200">
            <Library className="mr-2" />
            Library
          </a>
          <a href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200">
            <LogOut className="mr-2" />
            Logout
          </a>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 p-4 lg:p-10">
        <h1 className="text-2xl lg:text-4xl font-bold text-gray-800 mb-8">Where knowledge begins</h1>

        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <Input
              type="text"
              placeholder="Enter your book name"
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
              className="flex-grow text-lg"
            />
            <Button
              type="submit"
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              {loading ? 'Generating...' : "Let's Go!"}
            </Button>
          </div>

          {error && (
            <Alert variant="destructive" className="mt-4">
              {error}
            </Alert>
          )}
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {popularBooks.map((book, index) => (
            <Button
              key={index}
              variant="outline"
              className="text-left h-auto py-2 px-4 bg-white hover:bg-gray-100 hover:translate-y-[-3px] hover:shadow-md transition-transform duration-200"
              onClick={() => setBookName(book)}
            >
              {book}
            </Button>
          ))}
        </div>

        {summary && (
          <div className="flex gap-4 mb-8">
            <Button
              onClick={() => {
                setIsSavePopupVisible(true);
                setTimeout(() => setIsSavePopupVisible(false), 3000);
              }}
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white"
            >
              <Bookmark />
              Save
            </Button>
            <Button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white">
              <Volume2 />
              Listen
            </Button>
          </div>
        )}

        {loading && (
          <div className="text-center text-blue-600 font-semibold animate-pulse mt-8">
            Generating summary, please wait...
          </div>
        )}

    {summary && (
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md max-h-96 overflow-auto">
        <h2 className="text-2xl font-bold mb-4">Summary:</h2>
        <ReactMarkdown className="prose prose-sm max-w-full break-words">{summary}</ReactMarkdown>
      </div>
    )}

        {isSavePopupVisible && (
          <div className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded shadow-lg">
            Save successful! You can find your saved books in the Library section.
          </div>
        )}
      </div>
    </div>
  );
}
