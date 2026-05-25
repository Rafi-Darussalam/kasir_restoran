"use client";

import { useEffect, useState } from "react";
import {
  Card, CardHeader, CardTitle, CardContent, CardDescription,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { UtensilsCrossed, TableProperties, Receipt } from "lucide-react";

type Stats = {
  menu: { total: number; makanan: number };
  meja: { total: number; tersedia: number };
  transaksi: { total: number; lunas: number };
};

export default function HomeCardStats() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((r) => r.json())
      .then((d) => setStats(d.stats))
      .catch(() => {});
  }, []);

  if (!stats) {
    return (
      <div className="flex min-w gap-3 flex-wrap">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="flex-1 min-w-[200px] animate-pulse">
            <CardHeader><div className="h-4 w-24 bg-muted rounded" /></CardHeader>
            <CardContent><div className="h-8 w-16 bg-muted rounded mt-1" /></CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const cards = [
    {
      title: "Menu",
      icon: UtensilsCrossed,
      count: stats.menu.total,
      progressValue: stats.menu.total === 0 ? 0 : Math.round((stats.menu.makanan / stats.menu.total) * 100),
      progressLabel: `${stats.menu.makanan} Makanan · ${stats.menu.total - stats.menu.makanan} Minuman`,
      description: "Total item menu aktif",
      color: "text-orange-500",
    },
    {
      title: "Meja",
      icon: TableProperties,
      count: stats.meja.total,
      progressValue: stats.meja.total === 0 ? 0 : Math.round((stats.meja.tersedia / stats.meja.total) * 100),
      progressLabel: `${stats.meja.tersedia} Tersedia · ${stats.meja.total - stats.meja.tersedia} Terisi/Dipesan`,
      description: "Kapasitas meja restoran",
      color: "text-blue-500",
    },
    {
      title: "Transaksi",
      icon: Receipt,
      count: stats.transaksi.total,
      progressValue: stats.transaksi.total === 0 ? 0 : Math.round((stats.transaksi.lunas / stats.transaksi.total) * 100),
      progressLabel: `${stats.transaksi.lunas} Lunas · ${stats.transaksi.total - stats.transaksi.lunas} Belum Bayar`,
      description: "Total transaksi keseluruhan",
      color: "text-green-500",
    },
  ];

  return (
    <div className="flex min-w gap-3 flex-wrap">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <Card key={index} className="flex-1 min-w-[200px]">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">{card.title}</CardTitle>
                <Icon className={`h-4 w-4 ${card.color}`} />
              </div>
              <p className="text-3xl font-bold">{card.count}</p>
              <CardDescription className="text-xs">{card.description}</CardDescription>
            </CardHeader>
            <CardContent className="pt-0 space-y-1.5">
              <Progress value={card.progressValue} className="h-2" />
              <p className="text-xs text-muted-foreground">{card.progressLabel}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
