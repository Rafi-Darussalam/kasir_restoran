"use client";

import React, { useCallback, useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";
import { PlusCircle } from "lucide-react";
import { DataTable } from "@/components/data-table";
import { ActionDropdown } from "@/components/action-dropdown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel, FieldError } from "@/components/ui/field";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

type Menu = {
  id: number;
  nama_menu: string;
  harga: number;
  deskripsi: string;
  kategori: "makanan" | "minuman";
};

const emptyForm: Omit<Menu, "id"> = {
  nama_menu: "", harga: 0, deskripsi: "", kategori: "makanan",
};

export default function MenuPage() {
  const [data, setData] = useState<Menu[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Menu | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof typeof emptyForm, string>>>({});

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams({ page: String(page), limit: "10" });
      if (search) query.set("search", search);
      const res = await fetch(`/api/menu?${query.toString()}`);
      const json = await res.json();
      setData(json.data); setTotal(json.total);
    } catch { toast.error("Gagal memuat data menu"); }
    finally { setLoading(false); }
  }, [page, search]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const validate = () => {
    const e: typeof errors = {};
    if (!form.nama_menu.trim()) e.nama_menu = "Nama menu wajib diisi";
    if (!form.harga || form.harga <= 0) e.harga = "Harga harus lebih dari 0";
    if (!form.deskripsi.trim()) e.deskripsi = "Deskripsi wajib diisi";
    setErrors(e); return Object.keys(e).length === 0;
  };

  const openCreate = () => { setEditing(null); setForm(emptyForm); setErrors({}); setOpen(true); };
  const openEdit = (row: Menu) => {
    setEditing(row);
    setForm({ nama_menu: row.nama_menu, harga: row.harga, deskripsi: row.deskripsi, kategori: row.kategori });
    setErrors({}); setOpen(true);
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    const url = editing ? `/api/menu/${editing.id}` : "/api/menu";
    try {
      await fetch(url, { method: editing ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      toast.success(editing ? "Menu berhasil diubah" : "Menu berhasil ditambahkan");
      setOpen(false); fetchData();
    } catch { toast.error("Gagal menyimpan data"); }
  };

  const handleDelete = async (id: number) => {
    try { await fetch(`/api/menu/${id}`, { method: "DELETE" }); toast.success("Menu berhasil dihapus"); fetchData(); }
    catch { toast.error("Gagal menghapus"); }
  };

  const handleBulkDelete = async (ids: number[]) => {
    try {
      await fetch("/api/menu", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ids }) });
      toast.success(`${ids.length} menu berhasil dihapus`); fetchData();
    } catch { toast.error("Gagal menghapus"); }
  };

  const columns: ColumnDef<Menu>[] = [
    { accessorKey: "nama_menu", header: "Nama Menu" },
    {
      accessorKey: "harga", header: "Harga",
      cell: ({ row }) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(row.original.harga),
    },
    { accessorKey: "deskripsi", header: "Deskripsi" },
    {
      accessorKey: "kategori", header: "Kategori",
      cell: ({ row }) => (
        <Badge variant={row.original.kategori === "makanan" ? "default" : "secondary"}>
          {row.original.kategori}
        </Badge>
      ),
    },
    {
      id: "actions", header: "",
      cell: ({ row }) => (
        <ActionDropdown onEdit={() => openEdit(row.original)} onDelete={() => handleDelete(row.original.id)} />
      ),
      size: 50,
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Menu</h1>
          <p className="text-muted-foreground text-sm">Kelola data menu restoran</p>
        </div>
        <Button onClick={openCreate} className="gap-2"><PlusCircle className="h-4 w-4" /> Tambah Menu</Button>
      </div>
      <DataTable columns={columns} data={data} total={total} page={page} pageSize={10} onPageChange={setPage} onBulkDelete={handleBulkDelete} getRowId={(row) => row.id} onSearch={(v) => { setPage(1); setSearch(v); }} searchPlaceholder="Cari nama menu..." loading={loading} search={search} />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editing ? "Edit Menu" : "Tambah Menu"}</DialogTitle></DialogHeader>
          <FieldGroup className="gap-4">
            <Field>
              <FieldLabel>Nama Menu</FieldLabel>
              <Input id="nama_menu" value={form.nama_menu} onChange={(e) => setForm({ ...form, nama_menu: e.target.value })} placeholder="Contoh: Ayam Geprek" />
              {errors.nama_menu && <FieldError>{errors.nama_menu}</FieldError>}
            </Field>
            <Field>
              <FieldLabel>Harga (Rp)</FieldLabel>
              <Input id="harga" type="number" value={form.harga} onChange={(e) => setForm({ ...form, harga: Number(e.target.value) })} placeholder="15000" />
              {errors.harga && <FieldError>{errors.harga}</FieldError>}
            </Field>
            <Field>
              <FieldLabel>Deskripsi</FieldLabel>
              <Input id="deskripsi" value={form.deskripsi} onChange={(e) => setForm({ ...form, deskripsi: e.target.value })} placeholder="Deskripsi singkat menu" />
              {errors.deskripsi && <FieldError>{errors.deskripsi}</FieldError>}
            </Field>
            <Field>
              <FieldLabel>Kategori</FieldLabel>
              <Select value={form.kategori} onValueChange={(v) => setForm({ ...form, kategori: v as "makanan" | "minuman" })}>
                <SelectTrigger id="kategori"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="makanan">Makanan</SelectItem>
                  <SelectItem value="minuman">Minuman</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </FieldGroup>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Batal</Button>
            <Button onClick={handleSubmit}>Simpan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
