import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { response } from "@/lib/schema";
import { generateQs } from "@/utils/generateQs";
import { setStatus } from "@/actions/actions";
import { applicationStatus } from "@/data/status";

const ResponseDialog = ({ response }: { response: response }) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const id = response.id || "";
  const subdomain = response.subdomain;
  const questions = generateQs(subdomain);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setOpen(true)}>
          View
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-screen-lg overflow-y-auto max-h-screen">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-white">
            {response.firstName} {response.lastName}
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-8 mt-8 text-white font-light">
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
            <div className=" w-[400px] md:w-[600px] flex flex-col" key={index}>
              <p className="font-semibold"> Q. {question}: </p>
              <p className="text-wrap whitespace-pre-wrap break-words mt-2">
                A. {(response as any)[`q${index + 1}`]}
              </p>
            </div>
          ))}
          <div className="flex gap-3 my-3 flex-wrap max-w-[90%]">
            {applicationStatus.map((status) => {
              return (
                <Button
                  key={id}
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
};

export default ResponseDialog;
