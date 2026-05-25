import { NextResponse } from 'next/server';
import pool from '@/lib/mysql';

export async function GET() {
  try {
    await pool.query(
      'ALTER TABLE transaksi ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
    );
    return NextResponse.json({ success: true, message: 'Column created_at added' });
  } catch (error: unknown) {
    const err = error as { code?: string; message?: string };
    if (err.code === 'ER_DUP_FIELDNAME') {
      return NextResponse.json({ success: true, message: 'Column already exists' });
    }
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
