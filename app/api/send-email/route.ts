import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Log the contact form submission
    // In production, integrate with your email service (SendGrid, Mailgun, AWS SES, Resend, etc.)
    console.log('Email submission:', { name, email, phone, message });
    
    // TODO: Integrate with email service
    // Email would be sent to: sam@voltaminelectric.com
    // Contents:
    // - Name: {name}
    // - Email: {email}
    // - Phone: {phone}
    // - Message: {message}

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Your message has been received. We will contact you soon!',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Failed to process your request' },
      { status: 500 }
    );
  }
}

