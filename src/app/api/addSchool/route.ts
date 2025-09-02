import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const name = formData.get('name') as string;
    const address = formData.get('address') as string;
    const city = formData.get('city') as string;
    const state = formData.get('state') as string;
    const contact = formData.get('contact') as string;
    const emailId = formData.get('emailId') as string;
    const imageFile = formData.get('image') as File;

    if (!name || !address || !city || !state || !contact || !emailId || !imageFile) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Save image file
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = `${Date.now()}-${imageFile.name}`;
    const imagePath = join(process.cwd(), 'public/schoolImages', filename);
    
    await writeFile(imagePath, buffer);

    // Save to database
    const connection = await connectDB();
    const insertQuery = `
      INSERT INTO schools (name, address, city, state, contact, image, email_id)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    
    await connection.execute(insertQuery, [
      name,
      address,
      city,
      state,
      contact,
      `/schoolImages/${filename}`,
      emailId
    ]);
    
    await connection.end();

    return NextResponse.json({ 
      message: 'School added successfully',
      data: { name, city, state, image: `/schoolImages/${filename}` }
    });

  } catch (error) {
    console.error('Error adding school:', error);
    return NextResponse.json({ error: 'Failed to add school' }, { status: 500 });
  }
}
