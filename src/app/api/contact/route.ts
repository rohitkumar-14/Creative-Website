import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // Server-side validation
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!/^\S+@\S+\.\S+$/.test(data.email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Simulate network delay and API processing (1.5 seconds)
    // In a real app, you would save this to a database or call a 3rd party service.
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Log the message for demonstration
    console.log('--- NEW CONTACT FORM SUBMISSION ---');
    console.log('Name:', data.name);
    console.log('Email:', data.email);
    console.log('Message:', data.message);
    console.log('-----------------------------------');

    // Success response
    return NextResponse.json({ success: true, message: 'Message submitted successfully (Simulation Mode)' }, { status: 200 });
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
