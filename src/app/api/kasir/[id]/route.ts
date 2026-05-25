import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/mysql';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const { nama, no_telepon } = body;
  await pool.query(
    'UPDATE kasir SET nama=?, no_telepon=? WHERE id=?',
    [nama, no_telepon, id]
  );
  return NextResponse.json({ success: true });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await pool.query('DELETE FROM kasir WHERE id=?', [id]);
  return NextResponse.json({ success: true });
}
