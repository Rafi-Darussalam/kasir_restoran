import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/mysql';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const search = searchParams.get('search') || '';
  const offset = (page - 1) * limit;

  let whereClause = '';
  const queryParams: any[] = [];
  const countParams: any[] = [];

  if (search) {
    whereClause = 'WHERE p.name LIKE ? OR k.nama LIKE ? OR m.lokasi LIKE ?';
    const likeSearch = `%${search}%`;
    queryParams.push(likeSearch, likeSearch, likeSearch);
    countParams.push(likeSearch, likeSearch, likeSearch);
  }

  queryParams.push(limit, offset);

  const [[{ total }]] = await pool.query<any[]>(
    `SELECT COUNT(*) as total FROM transaksi t
     LEFT JOIN pelanggan p ON t.id_pelanggan = p.id
     LEFT JOIN kasir k ON t.id_kasir = k.id
     LEFT JOIN meja m ON t.id_meja = m.id
     ${whereClause}`,
    countParams
  );

  const [rows] = await pool.query(
    `SELECT t.*, p.name as nama_pelanggan, k.nama as nama_kasir, m.lokasi as lokasi_meja
     FROM transaksi t
     LEFT JOIN pelanggan p ON t.id_pelanggan = p.id
     LEFT JOIN kasir k ON t.id_kasir = k.id
     LEFT JOIN meja m ON t.id_meja = m.id
     ${whereClause}
     LIMIT ? OFFSET ?`,
    queryParams
  );

  return NextResponse.json({ data: rows, total, page, limit });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { id_pelanggan, id_kasir, id_meja, metode_pembayaran, status_pembayaran } = body;
  const [result] = await pool.query<any>(
    'INSERT INTO transaksi (id_pelanggan, id_kasir, id_meja, metode_pembayaran, status_pembayaran) VALUES (?, ?, ?, ?, ?)',
    [id_pelanggan, id_kasir, id_meja, metode_pembayaran, status_pembayaran]
  );
  return NextResponse.json({ success: true, id: result.insertId });
}

export async function DELETE(req: NextRequest) {
  const body = await req.json();
  const { ids } = body as { ids: number[] };
  if (!ids || ids.length === 0)
    return NextResponse.json({ error: 'No ids provided' }, { status: 400 });
  // delete related detail_transaksi first
  await pool.query('DELETE FROM detail_transaksi WHERE id_transaksi IN (?)', [ids]);
  await pool.query('DELETE FROM transaksi WHERE id IN (?)', [ids]);
  return NextResponse.json({ success: true });
}
