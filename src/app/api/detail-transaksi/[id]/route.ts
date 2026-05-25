import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/mysql';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const { id_transaksi, id_menu, jumlah, total } = body;
  await pool.query(
    'UPDATE detail_transaksi SET id_transaksi=?, id_menu=?, jumlah=?, total=? WHERE id=?',
    [id_transaksi, id_menu, jumlah, total, id]
  );
  return NextResponse.json({ success: true });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await pool.query('DELETE FROM detail_transaksi WHERE id=?', [id]);
  return NextResponse.json({ success: true });
}
