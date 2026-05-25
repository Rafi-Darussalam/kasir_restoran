import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/mysql';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const offset = (page - 1) * limit;
  const idTransaksi = searchParams.get('id_transaksi');

  const whereClause = idTransaksi ? 'WHERE dt.id_transaksi = ?' : '';
  const params: (string | number)[] = idTransaksi ? [idTransaksi, limit, offset] : [limit, offset];
  const countParams: (string | number)[] = idTransaksi ? [idTransaksi] : [];

  const [[{ total }]] = await pool.query<any[]>(
    `SELECT COUNT(*) as total FROM detail_transaksi dt ${idTransaksi ? 'WHERE id_transaksi = ?' : ''}`,
    countParams
  );
  const [rows] = await pool.query(
    `SELECT dt.*, m.nama_menu, t.id as transaksi_id
     FROM detail_transaksi dt
     LEFT JOIN menu m ON dt.id_menu = m.id
     LEFT JOIN transaksi t ON dt.id_transaksi = t.id
     ${whereClause}
     LIMIT ? OFFSET ?`,
    params
  );

  return NextResponse.json({ data: rows, total, page, limit });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { id_transaksi, id_menu, jumlah, total } = body;
  const [result] = await pool.query<any>(
    'INSERT INTO detail_transaksi (id_transaksi, id_menu, jumlah, total) VALUES (?, ?, ?, ?)',
    [id_transaksi, id_menu, jumlah, total]
  );
  return NextResponse.json({ success: true, id: result.insertId });
}

export async function DELETE(req: NextRequest) {
  const body = await req.json();
  const { ids } = body as { ids: number[] };
  if (!ids || ids.length === 0)
    return NextResponse.json({ error: 'No ids provided' }, { status: 400 });
  await pool.query('DELETE FROM detail_transaksi WHERE id IN (?)', [ids]);
  return NextResponse.json({ success: true });
}
