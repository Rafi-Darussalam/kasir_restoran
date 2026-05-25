import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/mysql';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const { name } = body;
  await pool.query('UPDATE pelanggan SET name=? WHERE id=?', [name, id]);
  return NextResponse.json({ success: true });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await pool.query('DELETE FROM pelanggan WHERE id=?', [id]);
  return NextResponse.json({ success: true });
}
