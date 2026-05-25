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
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Meja = {
  id: number;
  lokasi: string;
  kapasitas: number;
  status: "tersedia" | "terisi" | "dipesan";
};

const emptyForm: Omit<Meja, "id"> = { lokasi: "", kapasitas: 4, status: "tersedia" };

const statusColor: Record<Meja["status"], string> = {
  tersedia: "bg-green-50 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-400 dark:border-green-800",
  terisi: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-800",
  dipesan: "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950/30 dark:text-yellow-400 dark:border-yellow-800",
};

export default function MejaPage() {
  const [data, setData] = useState<Meja[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Meja | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof typeof emptyForm, string>>>({});

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams({ page: String(page), limit: "10" });
      if (search) query.set("search", search);
      const res = await fetch(`/api/meja?${query.toString()}`);
      const json = await res.json();
      setData(json.data); setTotal(json.total);
    } catch { toast.error("Gagal memuat data meja"); }
    finally { setLoading(false); }
  }, [page, search]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const validate = () => {
    const e: typeof errors = {};
    if (!form.lokasi.trim()) e.lokasi = "Lokasi wajib diisi";
    if (!form.kapasitas || form.kapasitas <= 0) e.kapasitas = "Kapasitas harus lebih dari 0";
    setErrors(e); return Object.keys(e).length === 0;
  };

  const openCreate = () => { setEditing(null); setForm(emptyForm); setErrors({}); setOpen(true); };
  const openEdit = (row: Meja) => {
    setEditing(row); setForm({ lokasi: row.lokasi, kapasitas: row.kapasitas, status: row.status });
    setErrors({}); setOpen(true);
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    const url = editing ? `/api/meja/${editing.id}` : "/api/meja";
    try {
      await fetch(url, { method: editing ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      toast.success(editing ? "Meja berhasil diubah" : "Meja berhasil ditambahkan");
      setOpen(false); fetchData();
    } catch { toast.error("Gagal menyimpan data"); }
  };

  const handleDelete = async (id: number) => {
    try { await fetch(`/api/meja/${id}`, { method: "DELETE" }); toast.success("Meja berhasil dihapus"); fetchData(); }
    catch { toast.error("Gagal menghapus"); }
  };

  const handleBulkDelete = async (ids: number[]) => {
    try {
      await fetch("/api/meja", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ids }) });
      toast.success(`${ids.length} meja berhasil dihapus`); fetchData();
    } catch { toast.error("Gagal menghapus"); }
  };

  const columns: ColumnDef<Meja>[] = [
    { accessorKey: "lokasi", header: "Lokasi" },
    { accessorKey: "kapasitas", header: "Kapasitas" },
    {
      accessorKey: "status", header: "Status",
      cell: ({ row }) => <Badge className={statusColor[row.original.status]}>{row.original.status}</Badge>,
    },
    {
      id: "actions", header: "",
      cell: ({ row }) => <ActionDropdown onEdit={() => openEdit(row.original)} onDelete={() => handleDelete(row.original.id)} />,
      size: 50,
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold">Meja</h1><p className="text-muted-foreground text-sm">Kelola data meja restoran</p></div>
        <Button onClick={openCreate} className="gap-2"><PlusCircle className="h-4 w-4" /> Tambah Meja</Button>
      </div>
      <DataTable columns={columns} data={data} total={total} page={page} pageSize={10} onPageChange={setPage} onBulkDelete={handleBulkDelete} getRowId={(row) => row.id} onSearch={(v) => { setPage(1); setSearch(v); }} searchPlaceholder="Cari lokasi meja..." loading={loading} search={search} />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editing ? "Edit Meja" : "Tambah Meja"}</DialogTitle></DialogHeader>
          <FieldGroup className="gap-4">
            <Field>
              <FieldLabel>Lokasi</FieldLabel>
              <Input id="lokasi" value={form.lokasi} onChange={(e) => setForm({ ...form, lokasi: e.target.value })} placeholder="Contoh: Lantai 1 M1" />
              {errors.lokasi && <FieldError>{errors.lokasi}</FieldError>}
            </Field>
            <Field>
              <FieldLabel>Kapasitas</FieldLabel>
              <Input id="kapasitas" type="number" value={form.kapasitas} onChange={(e) => setForm({ ...form, kapasitas: Number(e.target.value) })} placeholder="4" />
              {errors.kapasitas && <FieldError>{errors.kapasitas}</FieldError>}
            </Field>
            <Field>
              <FieldLabel>Status</FieldLabel>
              <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v as Meja["status"] })}>
                <SelectTrigger id="status_meja"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="tersedia">Tersedia</SelectItem>
                  <SelectItem value="terisi">Terisi</SelectItem>
                  <SelectItem value="dipesan">Dipesan</SelectItem>
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
