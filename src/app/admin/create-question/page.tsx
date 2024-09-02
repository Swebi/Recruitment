"use client";

import { useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getQuestions, submitQuestions } from "@/actions/actions";

// Mock data for domains and subdomains
const domains = ["Technical", "Creatives", "Corporate"];
const subdomains = {
  Technical: ["Web Development", "App Development"],
  Creatives: ["Creatives"],
  Corporate: ["PR", "Sponsorship"],
};

export default function Page() {
  const [selectedDomain, setSelectedDomain] = useState<string>("");
  const [selectedSubdomain, setSelectedSubdomain] = useState<string>("");
  const [questions, setQuestions] = useState<string[]>([]);

  const handleAddQuestion = () => {
    setQuestions([...questions, ""]);
  };

  const handleQuestionChange = (index: number, value: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = value;
    setQuestions(updatedQuestions);
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8 p-6">
      <h1 className="mb-6 text-center text-2xl font-bold">
        Domain Question Form
      </h1>
      <form className="space-y-6" action={submitQuestions}>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="domain">Domain</Label>
            <Select onValueChange={setSelectedDomain} name="domain">
              <SelectTrigger id="domain">
                <SelectValue placeholder="Select a domain"  />
              </SelectTrigger>
              <SelectContent>
                {domains.map((domain) => (
                  <SelectItem key={domain} value={domain} className="px-2">
                    {domain}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="subdomain">Subdomain</Label>
            <Select
              name="subdomain"
              onValueChange={setSelectedSubdomain}
              disabled={!selectedDomain}
            >
              <SelectTrigger id="subdomain">
                <SelectValue placeholder="Select a subdomain" />
              </SelectTrigger>
              <SelectContent>
                {selectedDomain &&
                  subdomains[selectedDomain as keyof typeof subdomains].map(
                    (subdomain) => (
                      <SelectItem
                        key={subdomain}
                        value={subdomain}
                        className="px-2"
                      >
                        {subdomain}
                      </SelectItem>
                    )
                  )}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-4">
          <Label>Questions</Label>
          {questions.map((question, index) => (
            <Input
              key={index}
              name="questions"
              placeholder={`Question ${index + 1}`}
              value={question}
              onChange={(e) => handleQuestionChange(index, e.target.value)}
            />
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={handleAddQuestion}
            className="w-full"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Question
          </Button>
        </div>
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </div>
  );
}
