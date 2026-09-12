import { NextResponse } from 'next/server';

const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3000/api/v1';
const accessToken = process.env.SUPER_ADMIN_ACCESS_TOKEN;

export async function PATCH(
  request: Request,
  context: { params: Promise<{ schoolId: string }> },
) {
  if (!accessToken)
    return NextResponse.json(
      {
        error: {
          code: 'CONFIGURATION_ERROR',
          message:
            'SUPER_ADMIN_ACCESS_TOKEN must be configured for the bootstrap Super Admin UI.',
        },
      },
      { status: 500 },
    );
  const { schoolId } = await context.params;
  const response = await fetch(`${apiBaseUrl}/schools/${schoolId}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(await request.json()),
  });
  return NextResponse.json(await response.json(), { status: response.status });
}
