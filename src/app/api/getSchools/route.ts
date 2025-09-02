import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const city = searchParams.get('city') || '';
    const state = searchParams.get('state') || '';

    const connection = await connectDB();
    
    let query = 'SELECT * FROM schools WHERE 1=1';
    const params: string[] = [];

    if (search) {
      query += ' AND name LIKE ?';
      params.push(`%${search}%`);
    }

    if (city) {
      query += ' AND city = ?';
      params.push(city);
    }

    if (state) {
      query += ' AND state = ?';
      params.push(state);
    }

    query += ' ORDER BY id DESC';

    const [rows] = await connection.execute(query, params);
    await connection.end();

    return NextResponse.json(rows);

  } catch (error) {
    console.error('Error fetching schools:', error);
    return NextResponse.json({ error: 'Failed to fetch schools' }, { status: 500 });
  }
}
