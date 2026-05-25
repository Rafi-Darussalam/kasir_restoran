import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/mysql';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const { id_pelanggan, id_kasir, id_meja, metode_pembayaran, status_pembayaran } = body;
  await pool.query(
    'UPDATE transaksi SET id_pelanggan=?, id_kasir=?, id_meja=?, metode_pembayaran=?, status_pembayaran=? WHERE id=?',
    [id_pelanggan, id_kasir, id_meja, metode_pembayaran, status_pembayaran, id]
  );
  return NextResponse.json({ success: true });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await pool.query('DELETE FROM detail_transaksi WHERE id_transaksi=?', [id]);
  await pool.query('DELETE FROM transaksi WHERE id=?', [id]);
  return NextResponse.json({ success: true });
}
