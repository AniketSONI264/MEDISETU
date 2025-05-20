import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

// Initialize the Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// Rate limiting configuration
const RATE_LIMIT = 10; // requests per minute
const RATE_WINDOW = 60 * 1000; // 1 minute in milliseconds
const requestCounts = new Map();

// System prompt for the chatbot
const SYSTEM_PROMPT = `You are a helpful medical assistant for MediSetu, a healthcare platform. 
Your role is to:
1. Provide accurate medical information
2. Help users understand their health concerns
3. Guide users to appropriate medical services
4. Maintain a professional and empathetic tone
5. Clarify when you're not sure about something
6. Never provide direct medical advice or diagnoses

Remember to:
- Be clear and concise
- Use simple language
- Show empathy
- Direct users to professionals when needed
- Stay within your knowledge boundaries

Format your responses in a clear, structured way using markdown when appropriate.`;

// Fallback responses for common scenarios
const FALLBACK_RESPONSES = {
  greeting: "Hello! I'm your MediSetu healthcare assistant. How can I help you today?",
  error: "I apologize, but I'm having trouble connecting right now. Please try again in a moment.",
  rateLimit: "I'm receiving too many requests right now. Please wait a moment before trying again.",
  invalidInput: "I'm not sure I understand. Could you please rephrase your question?",
};

// Rate limiting middleware
function checkRateLimit(ip) {
  const now = Date.now();
  const userRequests = requestCounts.get(ip) || [];
  
  // Remove old requests outside the window
  const recentRequests = userRequests.filter(time => now - time < RATE_WINDOW);
  
  if (recentRequests.length >= RATE_LIMIT) {
    return false;
  }
  
  recentRequests.push(now);
  requestCounts.set(ip, recentRequests);
  return true;
}

export async function POST(req) {
  try {
    // Get client IP for rate limiting
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    
    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: FALLBACK_RESPONSES.rateLimit },
        { status: 429 }
      );
    }

    const { message } = await req.json();

    // Validate input
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Message is required and must be a non-empty string' },
        { status: 400 }
      );
    }

    // Check API key
    if (!process.env.GOOGLE_API_KEY) {
      console.error('GOOGLE_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Service is temporarily unavailable' },
        { status: 503 }
      );
    }

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      
      // Handle greetings separately
      if (/^(hi|hello|hey|greetings)/i.test(message.trim())) {
        return NextResponse.json({ response: FALLBACK_RESPONSES.greeting });
      }

      // Create the prompt with system context and user message
      const prompt = `${SYSTEM_PROMPT}\n\nUser: ${message}\n\nAssistant:`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      if (!text || text.trim().length === 0) {
        return NextResponse.json(
          { error: FALLBACK_RESPONSES.error },
          { status: 500 }
        );
      }

      return NextResponse.json({ response: text });
    } catch (apiError) {
      console.error('Gemini API Error:', apiError);
      
      // Handle specific API errors
      if (apiError.message.includes('API key')) {
        return NextResponse.json(
          { error: 'Service is temporarily unavailable' },
          { status: 503 }
        );
      }
      
      return NextResponse.json(
        { error: FALLBACK_RESPONSES.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Server Error:', error);
    return NextResponse.json(
      { error: FALLBACK_RESPONSES.error },
      { status: 500 }
    );
  }
}
 