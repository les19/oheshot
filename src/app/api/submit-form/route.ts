import { NextRequest, NextResponse } from 'next/server';
import { sendFormEmail } from '@/actions/sendEmail';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    // Send email via nodemailer
    const emailResult = await sendFormEmail(formData);

    if (!emailResult.success) {
      return NextResponse.json(
        { error: emailResult.error || 'Failed to send email' },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing form submission:', error);
    return NextResponse.json(
      { error: 'Failed to process form submission' },
      { status: 500 },
    );
  }
}
