import { NextRequest, NextResponse } from 'next/server';

const WEBHOOK_URL = process.env.NEXT_PUBLIC_FORM_WEBHOOK_URL ?? '';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const res = await fetch(WEBHOOK_URL, {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Webhook returned an error' },
        { status: res.status },
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Failed to forward form data' },
      { status: 500 },
    );
  }
}
