"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { FormDataSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { generateSteps } from "@/utils/generateSteps";
import StepNavigation from "./stepNavigation";
import NavigationControls from "./navigationControls";
import { submitResponse } from "@/actions/actions";
import { webDevQs } from "@/data/techQs";
import { useSearchParams } from "next/navigation";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { generateQs } from "@/utils/generateQs";

type Inputs = z.infer<typeof FormDataSchema>;

export default function Form() {
  const searchParams = useSearchParams();
  const domain = searchParams.get("domain") || "";
  const subdomain = searchParams.get("subdomain") || "";

  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    srmEmail: "",
    regno: "",
    course: "",
    department: "",
    linkedin: "",
    github: "",
    resume: "",
    year: "First",
    domain: domain,
    subdomain: subdomain,
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
  });

  const delta = currentStep - previousStep;

  const {
    register,
    trigger,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(FormDataSchema),
    defaultValues: formData,
  });

  type FieldName = keyof Inputs;

  const questions = generateQs(subdomain) || [];
  const steps = generateSteps(questions);

  const next = async () => {
    const fields = steps[currentStep].fields?.map((field: any) => field.name);
    const output = await trigger(fields as FieldName[], { shouldFocus: true });

    if (!output) return;

    if (currentStep < steps.length - 1) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0 && currentStep < steps.length - 1) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-gray-800 border-none text-white">
      <CardHeader>
        <CardTitle>{steps[currentStep].name}</CardTitle>
        <CardDescription>{steps[currentStep].description}</CardDescription>
      </CardHeader>
      <CardContent>
        <StepNavigation steps={steps} currentStep={currentStep} />

        <form className="mt-8 space-y-8">
          {steps[currentStep].fields && (
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {steps[currentStep].fields?.map((field: any) => (
                  <div key={field.name} className="space-y-2">
                    <Label htmlFor={field.name} className="text-white">
                      {field.label}
                    </Label>
                    {field.type === "select" ? (
                      <Select
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            [field.name]: value,
                          }))
                        }
                      >
                        <SelectTrigger className="w-full bg-gray-700 text-white border-gray-600">
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-700 text-white border-gray-600">
                          {field.options.map((option: string) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : steps[currentStep].name === "Questions" ? (
                      <Textarea
                        id={field.name}
                        {...register(field.name as FieldName, {
                          onChange: (e) =>
                            setFormData((prev) => ({
                              ...prev,
                              [e.target.name]: e.target.value,
                            })),
                        })}
                        className="h-[40vh] bg-gray-700 text-white border-gray-600"
                      />
                    ) : (
                      <Input
                        type={field.type}
                        id={field.name}
                        {...register(field.name as FieldName, {
                          onChange: (e) =>
                            setFormData((prev) => ({
                              ...prev,
                              [e.target.name]: e.target.value,
                            })),
                        })}
                        autoComplete={field.autoComplete}
                        className="bg-gray-700 text-white border-gray-600"
                      />
                    )}
                    {errors[field.name as FieldName]?.message && (
                      <p className="text-sm text-red-400">
                        {errors[field.name as FieldName]?.message}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {currentStep === steps.length - 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Complete</h2>
              <p className="text-gray-300">Thank you for filling the form</p>
              <Button
                onClick={() => {
                  submitResponse(formData);
                }}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Submit
              </Button>
            </div>
          )}
        </form>

        <NavigationControls
          steps={steps}
          currentStep={currentStep}
          next={next}
          prev={prev}
        />
      </CardContent>
    </Card>
  );
}
