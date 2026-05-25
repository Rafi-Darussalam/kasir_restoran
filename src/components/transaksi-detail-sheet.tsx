"use client";

import React, { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { PlusCircle, Search, Trash2, ShoppingCart, PackageOpen } from "lucide-react";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription,
} from "@/components/ui/sheet";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";

type Transaksi = {
  id: number;
  nama_pelanggan?: string;
  nama_kasir?: string;
  lokasi_meja?: string;
  metode_pembayaran: string;
  status_pembayaran: string;
};

type DetailItem = {
  id: number;
  id_menu: number;
  nama_menu: string;
  jumlah: number;
  total: number;
};

type Menu = {
  id: number;
  nama_menu: string;
  harga: number;
  kategori: string;
};

interface TransaksiDetailSheetProps {
  transaksi: Transaksi | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStatusChange: () => void;
}

const formatRp = (n: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);

export function TransaksiDetailSheet({
  transaksi,
  open,
  onOpenChange,
  onStatusChange,
}: TransaksiDetailSheetProps) {
  const [details, setDetails] = useState<DetailItem[]>([]);
  const [loadingDetails, setLoadingDetails] = useState(false);

  // Menu picker dialog
  const [menuOpen, setMenuOpen] = useState(false);
  const [menus, setMenus] = useState<Menu[]>([]);
  const [search, setSearch] = useState("");
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);
  const [jumlah, setJumlah] = useState(1);
  const [loadingMenus, setLoadingMenus] = useState(false);
  const [saving, setSaving] = useState(false);

  const canAddMenu = transaksi?.status_pembayaran === "belum bayar";

  const fetchDetails = useCallback(async () => {
    if (!transaksi) return;
    setLoadingDetails(true);
    try {
      const res = await fetch(`/api/detail-transaksi?page=1&limit=100&id_transaksi=${transaksi.id}`);
      const json = await res.json();
      setDetails(json.data || []);
    } catch {
      toast.error("Gagal memuat detail transaksi");
    } finally {
      setLoadingDetails(false);
    }
  }, [transaksi]);

  const fetchMenus = useCallback(async () => {
    setLoadingMenus(true);
    try {
      const res = await fetch("/api/menu?page=1&limit=100");
      const json = await res.json();
      setMenus(json.data || []);
    } catch {
      toast.error("Gagal memuat daftar menu");
    } finally {
      setLoadingMenus(false);
    }
  }, []);

  useEffect(() => {
    if (open && transaksi) fetchDetails();
  }, [open, transaksi, fetchDetails]);

  const openMenuPicker = () => {
    fetchMenus();
    setSelectedMenu(null);
    setJumlah(1);
    setSearch("");
    setMenuOpen(true);
  };

  const handleAddMenu = async () => {
    if (!selectedMenu || !transaksi) return;
    setSaving(true);
    try {
      await fetch("/api/detail-transaksi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_transaksi: transaksi.id,
          id_menu: selectedMenu.id,
          jumlah,
          total: selectedMenu.harga * jumlah,
        }),
      });
      toast.success(`${selectedMenu.nama_menu} ditambahkan ke transaksi`);
      setMenuOpen(false);
      fetchDetails();
    } catch {
      toast.error("Gagal menambahkan menu");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteDetail = async (detailId: number) => {
    try {
      await fetch(`/api/detail-transaksi/${detailId}`, { method: "DELETE" });
      toast.success("Item dihapus dari transaksi");
      fetchDetails();
    } catch {
      toast.error("Gagal menghapus item");
    }
  };

  const handleLunas = async () => {
    if (!transaksi) return;
    try {
      await fetch(`/api/transaksi/${transaksi.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_pelanggan: transaksi.id,
          id_kasir: transaksi.id,
          id_meja: transaksi.id,
          metode_pembayaran: transaksi.metode_pembayaran,
          status_pembayaran: "lunas",
        }),
      });
      toast.success("Transaksi ditandai lunas");
      onStatusChange();
      onOpenChange(false);
    } catch {
      toast.error("Gagal mengubah status");
    }
  };

  const grandTotal = details.reduce((acc, d) => acc + Number(d.total), 0);

  const filteredMenus = menus.filter((m) =>
    m.nama_menu.toLowerCase().includes(search.toLowerCase())
  );

  if (!transaksi) return null;

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="w-full sm:max-w-lg flex flex-col p-0 gap-0">
          {/* Header Fixed */}
          <div className="p-6 shrink-0 border-b bg-background">
            <SheetHeader className="p-0">
              <SheetTitle>Detail Transaksi #{transaksi.id}</SheetTitle>
              <SheetDescription asChild>
                <div className="flex flex-col gap-2 mt-2 text-sm">
                  <div className="grid grid-cols-2 gap-2 bg-muted/50 p-3 rounded-lg">
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground">Pelanggan</span>
                      <span className="font-medium">{transaksi.nama_pelanggan}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground">Kasir</span>
                      <span className="font-medium">{transaksi.nama_kasir}</span>
                    </div>
                    <div className="flex flex-col col-span-2">
                      <span className="text-xs text-muted-foreground">Meja</span>
                      <span className="font-medium">{transaksi.lokasi_meja}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 items-center mt-1">
                    <Badge variant="outline" className="uppercase font-medium">
                      {transaksi.metode_pembayaran}
                    </Badge>
                    <Badge className={transaksi.status_pembayaran === "lunas"
                      ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-400 dark:border-green-800"
                      : "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-800"
                    }>
                      {transaksi.status_pembayaran}
                    </Badge>
                  </div>
                </div>
              </SheetDescription>
            </SheetHeader>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-3">
            {loadingDetails ? (
              <div className="flex items-center justify-center h-32 text-muted-foreground text-sm">Memuat...</div>
            ) : details.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-40 gap-3 text-muted-foreground bg-muted/20 rounded-xl border border-dashed">
                <PackageOpen className="h-10 w-10 opacity-30" />
                <p className="text-sm font-medium">Belum ada item pesanan</p>
              </div>
            ) : (
              details.map((item) => (
                <div key={item.id} className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:border-primary/30 transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">{item.nama_menu}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {item.jumlah} × {formatRp(Number(item.total) / item.jumlah)}
                    </p>
                  </div>
                  <p className="font-bold text-sm shrink-0 text-primary">{formatRp(Number(item.total))}</p>
                  {canAddMenu && (
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10 shrink-0 ml-1"
                      onClick={() => handleDeleteDetail(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Footer Fixed */}
          <div className="shrink-0 p-6 border-t bg-background space-y-4">
            {details.length > 0 && (
              <div className="flex items-center justify-between font-bold text-lg">
                <span>Total Biaya</span>
                <span className="text-primary">{formatRp(grandTotal)}</span>
              </div>
            )}

            <div className="flex gap-3">
              {canAddMenu && (
                <Button className="flex-1 gap-2 h-11" variant={details.length > 0 ? "outline" : "default"} onClick={openMenuPicker}>
                  <PlusCircle className="h-4 w-4" /> Tambah Menu
                </Button>
              )}
              {canAddMenu && details.length > 0 && (
                <Button className="flex-1 gap-2 h-11 bg-green-600 hover:bg-green-700 text-white" onClick={handleLunas}>
                  <ShoppingCart className="h-4 w-4" /> Tandai Lunas
                </Button>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Menu Picker Dialog */}
      <Dialog open={menuOpen} onOpenChange={setMenuOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Pilih Menu</DialogTitle>
          </DialogHeader>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="search_menu"
              className="pl-9"
              placeholder="Cari nama menu..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="max-h-60 overflow-y-auto space-y-1.5 pr-1">
            {loadingMenus ? (
              <div className="text-center py-8 text-muted-foreground text-sm">Memuat...</div>
            ) : filteredMenus.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground text-sm">Menu tidak ditemukan</div>
            ) : (
              filteredMenus.map((menu) => (
                <button
                  key={menu.id}
                  onClick={() => setSelectedMenu(menu)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg border text-left transition-colors ${
                    selectedMenu?.id === menu.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:bg-muted/50"
                  }`}
                >
                  <div>
                    <p className="text-sm font-medium">{menu.nama_menu}</p>
                    <p className="text-xs text-muted-foreground capitalize">{menu.kategori}</p>
                  </div>
                  <span className="text-sm font-semibold shrink-0">{formatRp(menu.harga)}</span>
                </button>
              ))
            )}
          </div>
          {selectedMenu && (
            <FieldGroup className="gap-3">
              <div className="rounded-lg bg-muted/50 p-3 text-sm">
                <p className="font-medium">{selectedMenu.nama_menu}</p>
                <p className="text-muted-foreground">{formatRp(selectedMenu.harga)} / item</p>
              </div>
              <Field>
                <FieldLabel>Jumlah</FieldLabel>
                <Input
                  id="picker_jumlah"
                  type="number"
                  min={1}
                  value={jumlah}
                  onChange={(e) => setJumlah(Math.max(1, Number(e.target.value)))}
                />
              </Field>
              <div className="flex items-center justify-between text-sm font-semibold">
                <span>Subtotal</span>
                <span>{formatRp(selectedMenu.harga * jumlah)}</span>
              </div>
            </FieldGroup>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setMenuOpen(false)}>Batal</Button>
            <Button onClick={handleAddMenu} disabled={!selectedMenu || saving}>
              {saving ? "Menyimpan..." : "Tambahkan"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
