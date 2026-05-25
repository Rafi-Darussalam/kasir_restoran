import { NextResponse } from 'next/server';
import pool from '@/lib/mysql';

export async function GET() {
  try {
    // Menu stats: total, makanan, minuman
    const [[menuTotal]] = await pool.query<any[]>('SELECT COUNT(*) as count FROM menu');
    const [[menuMakanan]] = await pool.query<any[]>("SELECT COUNT(*) as count FROM menu WHERE kategori='makanan'");

    // Meja stats: total, tersedia
    const [[mejaTotal]] = await pool.query<any[]>('SELECT COUNT(*) as count FROM meja');
    const [[mejaTersedia]] = await pool.query<any[]>("SELECT COUNT(*) as count FROM meja WHERE status='tersedia'");

    // Transaksi stats: total, lunas
    const [[transaksiTotal]] = await pool.query<any[]>('SELECT COUNT(*) as count FROM transaksi');
    const [[transaksiLunas]] = await pool.query<any[]>("SELECT COUNT(*) as count FROM transaksi WHERE status_pembayaran='lunas'");

    // Weekly transactions chart (last 7 days)
    const [weeklyData] = await pool.query<any[]>(
      `SELECT DATE(created_at) as date, COUNT(*) as total
       FROM transaksi
       WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 6 DAY)
       GROUP BY DATE(created_at)
       ORDER BY date ASC`
    );

    // Latest transactions (last 10)
    const [latestTransactions] = await pool.query<any[]>(
      `SELECT t.id, t.metode_pembayaran, t.status_pembayaran, t.created_at,
              p.name as nama_pelanggan
       FROM transaksi t
       LEFT JOIN pelanggan p ON t.id_pelanggan = p.id
       ORDER BY t.created_at DESC
       LIMIT 10`
    );

    return NextResponse.json({
      stats: {
        menu: { total: menuTotal.count, makanan: menuMakanan.count },
        meja: { total: mejaTotal.count, tersedia: mejaTersedia.count },
        transaksi: { total: transaksiTotal.count, lunas: transaksiLunas.count },
      },
      weeklyData,
      latestTransactions,
    });
  } catch (error: unknown) {
    const err = error as { message?: string };
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
