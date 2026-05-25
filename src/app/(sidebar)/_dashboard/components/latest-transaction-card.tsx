"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

type Transaction = {
  id: number;
  nama_pelanggan: string;
  metode_pembayaran: string;
  status_pembayaran: string;
  created_at: string;
};

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Baru saja";
  if (mins < 60) return `${mins} menit lalu`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} jam lalu`;
  return `${Math.floor(hours / 24)} hari lalu`;
}

export function LatestTransactionCard() {
  const [data, setData] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((r) => r.json())
      .then((d) => setData(d.latestTransactions || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col gap-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 bg-muted animate-pulse rounded-lg" />
        ))}
      </div>
    );
  }

  if (!data.length) {
    return <p className="text-sm text-muted-foreground text-center py-8">Belum ada transaksi</p>;
  }

  return (
    <div className="flex flex-col gap-3">
      {data.map((item) => (
        <Card key={item.id}>
          <CardHeader>
            <CardTitle className="text-sm">{item.nama_pelanggan || "Pelanggan"}</CardTitle>
            <CardDescription className="text-xs">{timeAgo(item.created_at)}</CardDescription>
          </CardHeader>
          <CardContent className="flex gap-2 items-center">
            <p className="text-[0.9rem] text-muted-foreground uppercase text-xs font-medium">
              {item.metode_pembayaran}
            </p>
            <Badge
              className={
                item.status_pembayaran === "lunas"
                  ? "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400"
                  : "border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400"
              }
            >
              {item.status_pembayaran}
            </Badge>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
