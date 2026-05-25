"use client";

import React, { useCallback, useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";
import { PlusCircle } from "lucide-react";
import { DataTable } from "@/components/data-table";
import { ActionDropdown } from "@/components/action-dropdown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel, FieldError } from "@/components/ui/field";

type Kasir = { id: number; nama: string; no_telepon: string };
const emptyForm: Omit<Kasir, "id"> = { nama: "", no_telepon: "" };

export default function KasirPage() {
  const [data, setData] = useState<Kasir[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Kasir | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof typeof emptyForm, string>>>({});

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams({ page: String(page), limit: "10" });
      if (search) query.set("search", search);
      const res = await fetch(`/api/kasir?${query.toString()}`);
      const json = await res.json();
      setData(json.data); setTotal(json.total);
    } catch { toast.error("Gagal memuat data kasir"); }
    finally { setLoading(false); }
  }, [page, search]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const validate = () => {
    const e: typeof errors = {};
    if (!form.nama.trim()) e.nama = "Nama wajib diisi";
    if (!form.no_telepon.trim()) e.no_telepon = "Nomor telepon wajib diisi";
    setErrors(e); return Object.keys(e).length === 0;
  };

  const openCreate = () => { setEditing(null); setForm(emptyForm); setErrors({}); setOpen(true); };
  const openEdit = (row: Kasir) => { setEditing(row); setForm({ nama: row.nama, no_telepon: row.no_telepon }); setErrors({}); setOpen(true); };

  const handleSubmit = async () => {
    if (!validate()) return;
    const url = editing ? `/api/kasir/${editing.id}` : "/api/kasir";
    try {
      await fetch(url, { method: editing ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      toast.success(editing ? "Kasir berhasil diubah" : "Kasir berhasil ditambahkan");
      setOpen(false); fetchData();
    } catch { toast.error("Gagal menyimpan data"); }
  };

  const handleDelete = async (id: number) => {
    try { await fetch(`/api/kasir/${id}`, { method: "DELETE" }); toast.success("Kasir berhasil dihapus"); fetchData(); }
    catch { toast.error("Gagal menghapus"); }
  };

  const handleBulkDelete = async (ids: number[]) => {
    try {
      await fetch("/api/kasir", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ids }) });
      toast.success(`${ids.length} kasir berhasil dihapus`); fetchData();
    } catch { toast.error("Gagal menghapus"); }
  };

  const columns: ColumnDef<Kasir>[] = [
    { accessorKey: "nama", header: "Nama" },
    { accessorKey: "no_telepon", header: "No. Telepon" },
    {
      id: "actions", header: "",
      cell: ({ row }) => <ActionDropdown onEdit={() => openEdit(row.original)} onDelete={() => handleDelete(row.original.id)} />,
      size: 50,
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold">Kasir</h1><p className="text-muted-foreground text-sm">Kelola data kasir restoran</p></div>
        <Button onClick={openCreate} className="gap-2"><PlusCircle className="h-4 w-4" /> Tambah Kasir</Button>
      </div>
      <DataTable columns={columns} data={data} total={total} page={page} pageSize={10} onPageChange={setPage} onBulkDelete={handleBulkDelete} getRowId={(row) => row.id} onSearch={(v) => { setPage(1); setSearch(v); }} searchPlaceholder="Cari nama kasir..." loading={loading} search={search} />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editing ? "Edit Kasir" : "Tambah Kasir"}</DialogTitle></DialogHeader>
          <FieldGroup className="gap-4">
            <Field>
              <FieldLabel>Nama</FieldLabel>
              <Input id="nama_kasir" value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} placeholder="Nama kasir" />
              {errors.nama && <FieldError>{errors.nama}</FieldError>}
            </Field>
            <Field>
              <FieldLabel>No. Telepon</FieldLabel>
              <Input id="no_telepon_kasir" value={form.no_telepon} onChange={(e) => setForm({ ...form, no_telepon: e.target.value })} placeholder="08xxxxxxxxxx" />
              {errors.no_telepon && <FieldError>{errors.no_telepon}</FieldError>}
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
