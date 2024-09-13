"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { response } from "@/lib/schema";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import ResponseDialog from "@/components/responseDialog";

export const columns: ColumnDef<response>[] = [
  {
    id: "actions",
    cell: ({ row }) => {
      const response = row.original;

      return <ResponseDialog response={response} />;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const data = row.original;
      const status = data.status;
      return <div className="capitalize">{status}</div>;
    },
  },
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
    header: "domain",
    cell: ({ row }) => {
      const data = row.original;
      const domain = data.domain;
      return <div className="capitalize">{domain}</div>;
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
          Subdomain
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "q1",
    header: "Question 1",
    cell: ({ row }) => {
      const data = row.original;
      const res = data.q1;
      return <div className="w-[300px] max-h-[200px]">{res}</div>;
    },
  },
  {
    accessorKey: "q2",
    header: "Question 2",
    cell: ({ row }) => {
      const data = row.original;
      const res = data.q2;
      return <div className="w-[300px] max-h-[200px]">{res}</div>;
    },
  },
  {
    accessorKey: "q3",
    header: "Question 3",
    cell: ({ row }) => {
      const data = row.original;
      const res = data.q3;
      return <div className="w-[300px] max-h-[200px]">{res}</div>;
    },
  },
  {
    accessorKey: "q4",
    header: "Question 4",
    cell: ({ row }) => {
      const data = row.original;
      const res = data.q4;
      return <div className="w-[300px] max-h-[200px]">{res}</div>;
    },
  },
  {
    accessorKey: "q5",
    header: "Question 5",
    cell: ({ row }) => {
      const data = row.original;
      const res = data.q5;
      return <div className="w-[300px] max-h-[200px]">{res}</div>;
    },
  },
];
