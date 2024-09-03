"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Users, Code, Paintbrush, Building, ChevronDown } from "lucide-react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  getFilteredRowModel,
  ColumnFiltersState,
} from "@tanstack/react-table";
import { DomainCard } from "@/components/domainCard";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { getAllResponses } from "@/actions/actions";
import { response } from "@/lib/schema";

const domainCounts = {
  Technical: 10,
  Creatives: 5,
  Corporate: 8,
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

export default function Dashboard() {
  const { userId } = useAuth();
  const [responses, setResponses] = useState<response[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAllResponses();
        setResponses(data);
      } catch (error) {
        console.error("Error fetching responses:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const totalResponses = Object.values(domainCounts).reduce((a, b) => a + b, 0);

  return (
    <>
      <div className="absolute top-5 right-5">
        {userId ? <UserButton /> : ""}
      </div>
      <motion.div
        className="min-h-screen bg-gray-900 p-6"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="flex flex-col max-w-7xl mx-auto space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white">
                Recruitment Dashboard
              </CardTitle>
              <CardDescription className="text-gray-400">
                Overview of recruitment responses for dBug Labs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-white">
                {totalResponses}
              </div>
              <p className="text-sm text-gray-400">Total Responses</p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <DomainCard
              domain="Technical"
              count={domainCounts.Technical}
              icon={<Code className="h-4 w-4 text-blue-400" />}
            />
            <DomainCard
              domain="Creatives"
              count={domainCounts.Creatives}
              icon={<Paintbrush className="h-4 w-4 text-green-400" />}
            />
            <DomainCard
              domain="Corporate"
              count={domainCounts.Corporate}
              icon={<Building className="h-4 w-4 text-yellow-400" />}
            />
          </div>

          <div>
            {loading ? (
              <p className="text-white">Loading...</p>
            ) : (
              <DataTable columns={columns} data={responses} />
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
}
