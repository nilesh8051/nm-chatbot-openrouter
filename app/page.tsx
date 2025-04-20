'use client';
import { useState } from 'react';

export default function Home() {
  const [messages, setMessages] = useState([{ role: 'system', content: 'You are a helpful AI assistant.' }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    setLoading(true);
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: newMessages })
    });

    const data = await res.json();
    setMessages([...newMessages, { role: 'assistant', content: data.response }]);
    setLoading(false);
  }

  return (
    <main className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">NM ChatBot (Powered by OpenRouter)</h1>
      <div className="space-y-2 mb-4">
        {messages.filter(m => m.role !== 'system').map((msg, i) => (
          <div key={i} className={`p-2 rounded ${msg.role === 'user' ? 'bg-blue-100 text-right' : 'bg-green-100 text-left'}`}>
            <p><strong>{msg.role === 'user' ? 'You' : 'Bot'}:</strong> {msg.content}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 p-2 border rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage} disabled={loading} className="bg-blue-600 text-white px-4 rounded">
          {loading ? '...' : 'Send'}
        </button>
      </div>
    </main>
  );
}