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
    whereClause = 'WHERE lokasi LIKE ?';
    const likeSearch = `%${search}%`;
    queryParams.push(likeSearch);
    countParams.push(likeSearch);
  }

  queryParams.push(limit, offset);

  const [[{ total }]] = await pool.query<any[]>(
    `SELECT COUNT(*) as total FROM meja ${whereClause}`,
    countParams
  );
  const [rows] = await pool.query(
    `SELECT * FROM meja ${whereClause} LIMIT ? OFFSET ?`,
    queryParams
  );

  return NextResponse.json({ data: rows, total, page, limit });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { lokasi, kapasitas, status } = body;
  const [result] = await pool.query<any>(
    'INSERT INTO meja (lokasi, kapasitas, status) VALUES (?, ?, ?)',
    [lokasi, kapasitas, status]
  );
  return NextResponse.json({ success: true, id: result.insertId });
}

export async function DELETE(req: NextRequest) {
  const body = await req.json();
  const { ids } = body as { ids: number[] };
  if (!ids || ids.length === 0)
    return NextResponse.json({ error: 'No ids provided' }, { status: 400 });
  await pool.query('DELETE FROM meja WHERE id IN (?)', [ids]);
  return NextResponse.json({ success: true });
}
