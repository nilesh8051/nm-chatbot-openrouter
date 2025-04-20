import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const messages = body.messages;

  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_OPENROUTER_API_KEY',
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://your-vercel-app.vercel.app',
      'X-Title': 'NM Chatbot'
    },
    body: JSON.stringify({
      model: 'mistral-7b:free',
      messages: messages,
    }),
  });

  const data = await res.json();
  const response = data.choices?.[0]?.message?.content || 'No response';
  return NextResponse.json({ response });
}