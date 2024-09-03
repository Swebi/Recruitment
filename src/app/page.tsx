"use client";
import { useRouter } from "next/navigation";

import { createContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { domains, subdomains } from "@/data/domains";

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export default function Component() {
  useEffect(() => {
    const router = useRouter();

    if (process.env.NEXT_PUBLIC_RECRUITMENT_CLOSED === "true") {
      router.push("/closed");
    }
  }, []); // Make sure to include an empty dependency array to run this effect once on mount

  const [step, setStep] = useState(1);
  const [selectedDomain, setSelectedDomain] = useState("");
  const [selectedSubdomain, setSelectedSubdomain] = useState("");

  const handleDomainSelect = (value: string) => {
    setSelectedDomain(value);
    setStep(2);
  };

  const handleSubdomainSelect = (value: string) => {
    setSelectedSubdomain(value);
  };

  const handleBack = () => {
    setStep(1);
    setSelectedSubdomain("");
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-900 flex items-start pt-[15vh] justify-center p-6"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <Card className="w-full max-w-2xl p-2 md:p-8 bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-white">
            dBug Labs Recruitment&apos;24
          </CardTitle>
          <CardDescription className="text-center text-gray-300">
            Please select your domain and subdomain to proceed to the
            recruitment form.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={fadeIn}
                className="space-y-4"
              >
                <h2 className="text-lg font-semibold text-white">
                  Select Your Domain
                </h2>
                <RadioGroup
                  onValueChange={handleDomainSelect}
                  className="grid grid-cols-2 gap-4"
                >
                  {domains.map((domain) => (
                    <div key={domain.id}>
                      <RadioGroupItem
                        value={domain.id}
                        id={domain.id}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={domain.id}
                        className="flex flex-col items-center justify-between rounded-md border-2 border-gray-600 bg-gray-700 p-4 hover:bg-gray-600 hover:text-white peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary text-gray-200"
                      >
                        {domain.name}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </motion.div>
            )}
            {step === 2 && (
              <motion.div
                key="step2"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={fadeIn}
                className="space-y-4"
              >
                <h2 className="text-lg font-semibold text-white">
                  Select Your Subdomain
                </h2>
                <RadioGroup
                  onValueChange={handleSubdomainSelect}
                  className="grid grid-cols-2 gap-4"
                >
                  {subdomains[selectedDomain as keyof typeof subdomains].map(
                    (subdomain) => (
                      <div key={subdomain}>
                        <RadioGroupItem
                          value={subdomain}
                          id={subdomain}
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={subdomain}
                          className="flex flex-col items-center justify-between rounded-md border-2 border-gray-600 bg-gray-700 p-4 hover:bg-gray-600 hover:text-white peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary text-gray-200"
                        >
                          {subdomain}
                        </Label>
                      </div>
                    )
                  )}
                </RadioGroup>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
        <CardFooter className="flex justify-between">
          {step === 2 && (
            <Button
              variant="outline"
              onClick={handleBack}
              className="bg-gray-700 text-white border-gray-600 hover:bg-gray-600 hover:text-white"
            >
              Back
            </Button>
          )}
          <Link
            href={`/recruitment?domain=${selectedDomain}&subdomain=${selectedSubdomain}`}
            className="ml-auto"
          >
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={step === 1 || !selectedSubdomain}
            >
              Proceed to Form <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
