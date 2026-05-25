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

type Pelanggan = { id: number; name: string };
const emptyForm: Omit<Pelanggan, "id"> = { name: "" };

export default function PelangganPage() {
  const [data, setData] = useState<Pelanggan[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Pelanggan | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof typeof emptyForm, string>>>({});

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams({ page: String(page), limit: "10" });
      if (search) query.set("search", search);
      const res = await fetch(`/api/pelanggan?${query.toString()}`);
      const json = await res.json();
      setData(json.data); setTotal(json.total);
    } catch { toast.error("Gagal memuat data pelanggan"); }
    finally { setLoading(false); }
  }, [page, search]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const validate = () => {
    const e: typeof errors = {};
    if (!form.name.trim()) e.name = "Nama wajib diisi";
    setErrors(e); return Object.keys(e).length === 0;
  };

  const openCreate = () => { setEditing(null); setForm(emptyForm); setErrors({}); setOpen(true); };
  const openEdit = (row: Pelanggan) => { setEditing(row); setForm({ name: row.name }); setErrors({}); setOpen(true); };

  const handleSubmit = async () => {
    if (!validate()) return;
    const url = editing ? `/api/pelanggan/${editing.id}` : "/api/pelanggan";
    try {
      await fetch(url, { method: editing ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      toast.success(editing ? "Pelanggan berhasil diubah" : "Pelanggan berhasil ditambahkan");
      setOpen(false); fetchData();
    } catch { toast.error("Gagal menyimpan data"); }
  };

  const handleDelete = async (id: number) => {
    try { await fetch(`/api/pelanggan/${id}`, { method: "DELETE" }); toast.success("Pelanggan berhasil dihapus"); fetchData(); }
    catch { toast.error("Gagal menghapus"); }
  };

  const handleBulkDelete = async (ids: number[]) => {
    try {
      await fetch("/api/pelanggan", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ids }) });
      toast.success(`${ids.length} pelanggan berhasil dihapus`); fetchData();
    } catch { toast.error("Gagal menghapus"); }
  };

  const columns: ColumnDef<Pelanggan>[] = [
    { accessorKey: "name", header: "Nama Pelanggan" },
    {
      id: "actions", header: "",
      cell: ({ row }) => <ActionDropdown onEdit={() => openEdit(row.original)} onDelete={() => handleDelete(row.original.id)} />,
      size: 50,
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold">Pelanggan</h1><p className="text-muted-foreground text-sm">Kelola data pelanggan restoran</p></div>
        <Button onClick={openCreate} className="gap-2"><PlusCircle className="h-4 w-4" /> Tambah Pelanggan</Button>
      </div>
      <DataTable columns={columns} data={data} total={total} page={page} pageSize={10} onPageChange={setPage} onBulkDelete={handleBulkDelete} getRowId={(row) => row.id} onSearch={(v) => { setPage(1); setSearch(v); }} searchPlaceholder="Cari nama pelanggan..." loading={loading} search={search} />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editing ? "Edit Pelanggan" : "Tambah Pelanggan"}</DialogTitle></DialogHeader>
          <FieldGroup className="gap-4">
            <Field>
              <FieldLabel>Nama Pelanggan</FieldLabel>
              <Input id="nama_pelanggan" value={form.name} onChange={(e) => setForm({ name: e.target.value })} placeholder="Nama pelanggan" />
              {errors.name && <FieldError>{errors.name}</FieldError>}
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
