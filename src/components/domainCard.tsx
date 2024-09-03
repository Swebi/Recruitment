import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const DomainCard = ({
  domain,
  count,
  icon,
}: {
  domain: string;
  count: number;
  icon: React.ReactNode;
}) => (
  <Card className="bg-gray-800 border-gray-700">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-white">{domain}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold text-white">{count}</div>
      <p className="text-xs text-gray-400">Responses</p>
    </CardContent>
  </Card>
);
