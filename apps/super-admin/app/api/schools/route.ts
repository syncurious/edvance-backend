import { NextResponse } from 'next/server';

const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3000/api/v1';
const accessToken = process.env.SUPER_ADMIN_ACCESS_TOKEN;

function headers(): HeadersInit {
  if (!accessToken)
    throw new Error(
      'SUPER_ADMIN_ACCESS_TOKEN must be configured for the bootstrap Super Admin UI.',
    );
  return {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  };
}

export async function GET(request: Request) {
  try {
    const response = await fetch(
      `${apiBaseUrl}/schools?${new URL(request.url).searchParams}`,
      { headers: headers(), cache: 'no-store' },
    );
    return NextResponse.json(await response.json(), {
      status: response.status,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          code: 'CONFIGURATION_ERROR',
          message:
            error instanceof Error ? error.message : 'Unable to load schools.',
        },
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const response = await fetch(`${apiBaseUrl}/schools`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(await request.json()),
    });
    return NextResponse.json(await response.json(), {
      status: response.status,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          code: 'CONFIGURATION_ERROR',
          message:
            error instanceof Error
              ? error.message
              : 'Unable to create the school.',
        },
      },
      { status: 500 },
    );
  }
}
