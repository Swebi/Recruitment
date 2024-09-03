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
import { generateQs } from "@/utils/generateQs";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<response>[] = [
  {
    id: "actions",
    cell: ({ row }) => {
      const response = row.original;
      const subdomain = response.subdomain;
      const questions = generateQs(subdomain);

      return (
        <Dialog>
          <DialogTrigger className="dark px-4 border rounded-lg py-2">
            View
          </DialogTrigger>
          <DialogContent className="dark max-w-screen-lg overflow-y-scroll max-h-screen">
            <DialogHeader>
              <DialogTitle className="text-white">
                {response.firstName} {response.lastName}
              </DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4 text-white">
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
                <a href={response.github} className="break-words">
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
            </div>
          </DialogContent>
        </Dialog>
      );
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
