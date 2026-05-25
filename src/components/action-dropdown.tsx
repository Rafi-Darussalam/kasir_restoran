"use client";

import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";

export interface ExtraAction {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
}

interface ActionDropdownProps {
  onEdit: () => void;
  onDelete: () => void;
  extras?: ExtraAction[];
}

export function ActionDropdown({ onEdit, onDelete, extras }: ActionDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 data-[state=open]:bg-muted">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Buka menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {extras?.map((action, i) => (
          <React.Fragment key={i}>
            <DropdownMenuItem onClick={action.onClick} className="gap-2 cursor-pointer">
              {action.icon}
              {action.label}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </React.Fragment>
        ))}
        <DropdownMenuItem onClick={onEdit} className="gap-2 cursor-pointer">
          <Pencil className="h-4 w-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={onDelete}
          variant='destructive'
          className="gap-2 cursor-pointer"
        >
          <Trash2 className="h-4 w-4" />
          Hapus
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
