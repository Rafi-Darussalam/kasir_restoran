import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/mysql';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const { nama_menu, harga, deskripsi, kategori } = body;
  await pool.query(
    'UPDATE menu SET nama_menu=?, harga=?, deskripsi=?, kategori=? WHERE id=?',
    [nama_menu, harga, deskripsi, kategori, id]
  );
  return NextResponse.json({ success: true });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await pool.query('DELETE FROM menu WHERE id=?', [id]);
  return NextResponse.json({ success: true });
}
