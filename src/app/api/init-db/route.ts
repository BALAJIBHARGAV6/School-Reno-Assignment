import { createTables } from '@/lib/db';

export async function GET() {
  try {
    await createTables();
    return Response.json({ message: 'Database tables created successfully' });
  } catch (error) {
    console.error('Error creating tables:', error);
    return Response.json({ error: 'Failed to create tables' }, { status: 500 });
  }
}
