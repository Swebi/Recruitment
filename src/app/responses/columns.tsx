"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { response } from "@/lib/schema";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { generateQs } from "@/utils/generateQs";
import { setStatus } from "@/actions/actions";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { applicationStatus } from "@/data/status";

export const columns: ColumnDef<response>[] = [
  {
    id: "actions",
    cell: ({ row }) => {
      const response = row.original;
      const id = response.id || "";
      const subdomain = response.subdomain;
      const questions = generateQs(subdomain);
      const [open, setOpen] = useState(false);
      const { toast } = useToast();
      const router = useRouter();

      return (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" onClick={() => setOpen(true)}>
              View
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-screen-lg overflow-y-auto max-h-screen">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-white">
                {response.firstName} {response.lastName}
              </DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4 text-white font-light">
              <p className="capitalize text-lg font-semibold">
                Status: {response.status}
              </p>
              <p>Email: {response.email}</p>
              <p>SRM Email: {response.srmEmail}</p>
              <p>Phone: {response.phone}</p>
              <p>Registration Number: {response.regno}</p>
              <p>Year: {response.year}</p>
              <p>Course: {response.course}</p>
              <p>Department: {response.department}</p>
              <p>
                LinkedIn:
                <a href={response.linkedin} className="break-words">
                  {response.linkedin}
                </a>
              </p>
              <p>
                GitHub:
                <a
                  href={response.github ? response.github : ""}
                  className="break-words"
                >
                  {response.github}
                </a>
              </p>
              {response.resume && <p>Resume: {response.resume}</p>}
              <p className="title">Domain: {response.domain}</p>
              <p>Subdomain: {response.subdomain}</p>
              {questions?.map((question, index) => (
                <div
                  className=" w-[400px] md:w-[600px] flex flex-col"
                  key={index}
                >
                  <p>{question}: </p>
                  <p className="text-wrap whitespace-pre-wrap break-words">
                    {(response as any)[`q${index + 1}`]}
                  </p>
                </div>
              ))}
              <div className="flex gap-3 flex-wrap max-w-[90%]">
                {applicationStatus.map((status) => {
                  return (
                    <Button
                      className="capitalize"
                      onClick={async () => {
                        const response = await setStatus(id, status);
                        if (response.success) {
                          toast({
                            title: `Status has been updated to ${status}. Refresh the table`,
                            className: "dark text-white border-white/10",
                          });
                          setOpen(false);
                        }
                      }}
                    >
                      {status}
                    </Button>
                  );
                })}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      );
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
];
