"use client";

import React, { useCallback, useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";
import { PlusCircle, Eye } from "lucide-react";
import { DataTable } from "@/components/data-table";
import { ActionDropdown } from "@/components/action-dropdown";
import { TransaksiDetailSheet } from "@/components/transaksi-detail-sheet";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Transaksi = {
  id: number;
  id_pelanggan: number;
  id_kasir: number;
  id_meja: number;
  metode_pembayaran: string;
  status_pembayaran: string;
  nama_pelanggan?: string;
  nama_kasir?: string;
  lokasi_meja?: string;
};

type Option = { id: number; label: string };

const emptyForm = {
  id_pelanggan: "",
  id_kasir: "",
  id_meja: "",
  metode_pembayaran: "qris",
  status_pembayaran: "belum bayar",
};

export default function TransaksiPage() {
  const [data, setData] = useState<Transaksi[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // Create/Edit dialog
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Transaksi | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [pelangganOpts, setPelangganOpts] = useState<Option[]>([]);
  const [kasirOpts, setKasirOpts] = useState<Option[]>([]);
  const [mejaOpts, setMejaOpts] = useState<Option[]>([]);

  // Detail sheet
  const [detailTransaksi, setDetailTransaksi] = useState<Transaksi | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams({ page: String(page), limit: "10" });
      if (search) query.set("search", search);
      const res = await fetch(`/api/transaksi?${query.toString()}`);
      const json = await res.json();
      setData(json.data); setTotal(json.total);
    } catch { toast.error("Gagal memuat data transaksi"); }
    finally { setLoading(false); }
  }, [page, search]);

  const fetchOptions = useCallback(async () => {
    const [p, k, m] = await Promise.all([
      fetch("/api/pelanggan?page=1&limit=100").then(r => r.json()),
      fetch("/api/kasir?page=1&limit=100").then(r => r.json()),
      fetch("/api/meja?page=1&limit=100").then(r => r.json()),
    ]);
    setPelangganOpts(p.data.map((x: { id: number; name: string }) => ({ id: x.id, label: x.name })));
    setKasirOpts(k.data.map((x: { id: number; nama: string }) => ({ id: x.id, label: x.nama })));
    setMejaOpts(m.data.map((x: { id: number; lokasi: string }) => ({ id: x.id, label: x.lokasi })));
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);
  useEffect(() => { fetchOptions(); }, [fetchOptions]);

  const openCreate = () => {
    setEditing(null);
    setForm({
      ...emptyForm,
      id_pelanggan: String(pelangganOpts[0]?.id || ""),
      id_kasir: String(kasirOpts[0]?.id || ""),
      id_meja: String(mejaOpts[0]?.id || ""),
    });
    setOpen(true);
  };

  const openEdit = (row: Transaksi) => {
    setEditing(row);
    setForm({
      id_pelanggan: String(row.id_pelanggan),
      id_kasir: String(row.id_kasir),
      id_meja: String(row.id_meja),
      metode_pembayaran: row.metode_pembayaran,
      status_pembayaran: row.status_pembayaran,
    });
    setOpen(true);
  };

  const openDetail = (row: Transaksi) => {
    setDetailTransaksi(row);
    setDetailOpen(true);
  };

  const handleSubmit = async () => {
    const url = editing ? `/api/transaksi/${editing.id}` : "/api/transaksi";
    try {
      const res = await fetch(url, {
        method: editing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_pelanggan: Number(form.id_pelanggan),
          id_kasir: Number(form.id_kasir),
          id_meja: Number(form.id_meja),
          metode_pembayaran: form.metode_pembayaran,
          status_pembayaran: form.status_pembayaran,
        }),
      });
      const json = await res.json();
      toast.success(editing ? "Transaksi berhasil diubah" : "Transaksi dibuat, tambahkan menu sekarang!");
      setOpen(false);

      if (!editing && json.id) {
        // Auto-open detail sheet for newly created transaksi
        const newTrx: Transaksi = {
          id: json.id,
          id_pelanggan: Number(form.id_pelanggan),
          id_kasir: Number(form.id_kasir),
          id_meja: Number(form.id_meja),
          metode_pembayaran: form.metode_pembayaran,
          status_pembayaran: form.status_pembayaran,
          nama_pelanggan: pelangganOpts.find(o => String(o.id) === form.id_pelanggan)?.label,
          nama_kasir: kasirOpts.find(o => String(o.id) === form.id_kasir)?.label,
          lokasi_meja: mejaOpts.find(o => String(o.id) === form.id_meja)?.label,
        };
        setDetailTransaksi(newTrx);
        setDetailOpen(true);
      }

      fetchData();
    } catch { toast.error("Gagal menyimpan data"); }
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`/api/transaksi/${id}`, { method: "DELETE" });
      toast.success("Transaksi berhasil dihapus"); fetchData();
    } catch { toast.error("Gagal menghapus"); }
  };

  const handleBulkDelete = async (ids: number[]) => {
    try {
      await fetch("/api/transaksi", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ids }) });
      toast.success(`${ids.length} transaksi berhasil dihapus`); fetchData();
    } catch { toast.error("Gagal menghapus"); }
  };

  const columns: ColumnDef<Transaksi>[] = [
    { accessorKey: "nama_pelanggan", header: "Pelanggan" },
    { accessorKey: "nama_kasir", header: "Kasir" },
    { accessorKey: "lokasi_meja", header: "Meja" },
    { accessorKey: "metode_pembayaran", header: "Metode" },
    {
      accessorKey: "status_pembayaran", header: "Status",
      cell: ({ row }) => (
        <Badge className={row.original.status_pembayaran === "lunas"
          ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-400 dark:border-green-800"
          : "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-800"
        }>{row.original.status_pembayaran}</Badge>
      ),
    },
    {
      id: "actions", header: "",
      cell: ({ row }) => (
        <ActionDropdown
          onEdit={() => openEdit(row.original)}
          onDelete={() => handleDelete(row.original.id)}
          extras={[{
            label: "Lihat Detail",
            icon: <Eye className="h-4 w-4" />,
            onClick: () => openDetail(row.original),
          }]}
        />
      ),
      size: 50,
    },
  ];

  const selectClass = "w-full";

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Transaksi</h1>
          <p className="text-muted-foreground text-sm">Kelola data transaksi restoran</p>
        </div>
        <Button onClick={openCreate} className="gap-2">
          <PlusCircle className="h-4 w-4" /> Tambah Transaksi
        </Button>
      </div>

      <DataTable
        columns={columns} data={data} total={total} page={page} pageSize={10}
        onPageChange={setPage} onBulkDelete={handleBulkDelete} getRowId={(row) => row.id}
        onSearch={(v) => { setPage(1); setSearch(v); }} searchPlaceholder="Cari pelanggan, kasir, atau meja..."
        loading={loading} search={search}
      />

      {/* Create / Edit Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Transaksi" : "Tambah Transaksi"}</DialogTitle>
          </DialogHeader>
          <FieldGroup className="gap-4">
            <Field>
              <FieldLabel>Pelanggan</FieldLabel>
              <Select value={form.id_pelanggan} onValueChange={(v) => setForm({ ...form, id_pelanggan: v })}>
                <SelectTrigger id="trx_pelanggan" className={selectClass}><SelectValue placeholder="Pilih pelanggan" /></SelectTrigger>
                <SelectContent>{pelangganOpts.map(o => <SelectItem key={o.id} value={String(o.id)}>{o.label}</SelectItem>)}</SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel>Kasir</FieldLabel>
              <Select value={form.id_kasir} onValueChange={(v) => setForm({ ...form, id_kasir: v })}>
                <SelectTrigger id="trx_kasir" className={selectClass}><SelectValue placeholder="Pilih kasir" /></SelectTrigger>
                <SelectContent>{kasirOpts.map(o => <SelectItem key={o.id} value={String(o.id)}>{o.label}</SelectItem>)}</SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel>Meja</FieldLabel>
              <Select value={form.id_meja} onValueChange={(v) => setForm({ ...form, id_meja: v })}>
                <SelectTrigger id="trx_meja" className={selectClass}><SelectValue placeholder="Pilih meja" /></SelectTrigger>
                <SelectContent>{mejaOpts.map(o => <SelectItem key={o.id} value={String(o.id)}>{o.label}</SelectItem>)}</SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel>Metode Pembayaran</FieldLabel>
              <Select value={form.metode_pembayaran} onValueChange={(v) => setForm({ ...form, metode_pembayaran: v })}>
                <SelectTrigger id="trx_metode" className={selectClass}><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="qris">QRIS</SelectItem>
                  <SelectItem value="dana">Dana</SelectItem>
                  <SelectItem value="gopay">GoPay</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </FieldGroup>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Batal</Button>
            <Button onClick={handleSubmit}>
              {editing ? "Simpan" : "Buat & Tambah Menu →"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Detail Sheet */}
      <TransaksiDetailSheet
        transaksi={detailTransaksi}
        open={detailOpen}
        onOpenChange={setDetailOpen}
        onStatusChange={fetchData}
      />
    </div>
  );
}
