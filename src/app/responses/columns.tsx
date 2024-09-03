"use client";
import { Button } from "@/components/ui/button";
import { response } from "@/lib/schema";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { MoreHorizontal } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<response>[] = [
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "srmEmail",
    header: "SRM Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "regno",
    header: "Registration Number",
  },
  {
    accessorKey: "year",
    header: "Year",
  },
  {
    accessorKey: "course",
    header: "Course",
  },
  {
    accessorKey: "department",
    header: "Department",
  },
  {
    accessorKey: "linkedin",
    header: "LinkedIn",
  },
  {
    accessorKey: "github",
    header: "GitHub",
  },
  {
    accessorKey: "resume",
    header: "Resume",
  },
  {
    accessorKey: "domain",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Domain
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "subdomain",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Domain
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "q1",
    header: "Question 1",
  },
  {
    accessorKey: "q2",
    header: "Question 2",
  },
  {
    accessorKey: "q3",
    header: "Question 3",
  },
  {
    accessorKey: "q4",
    header: "Question 4",
  },
  {
    accessorKey: "q5",
    header: "Question 5",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const response = row.original;

      return (
        <Dialog>
          <DialogTrigger className="dark">View</DialogTrigger>
          <DialogContent className="dark">
            <DialogHeader>
              <DialogTitle className="text-white">
                Are you absolutely sure?
              </DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );
    },
  },
];
