"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { FormDataSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { generateSteps } from "@/utils/generateSteps";
import StepNavigation from "./stepNavigation";
import NavigationControls from "./navigationControls";
import { submitResponse } from "@/actions/actions";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
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
import { ToastAction } from "./ui/toast";
import { Loader2 } from "lucide-react";
import { domainsCheck, subDomainsCheck } from "@/data/domains";

type Inputs = z.infer<typeof FormDataSchema>;

export default function Form() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const domain = searchParams.get("domain") || ("" as string);
  const subdomain = searchParams.get("subdomain") || ("" as string);

  if (domainsCheck.includes(domain) && subDomainsCheck.includes(subdomain)) {
    //
  } else {
    router.push("/");
  }
  const { toast } = useToast();

  // useEffect(() => {
  //   addCount();
  // }, []);

  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    control,
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
    if (currentStep > 0 && currentStep < steps.length) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
  };

  if (domain === "" || subdomain === "") {
    router.push("/");
    return null;
  }

  return (
    <Card className="w-full max-w-4xl mx-auto bg-background border-none text-white">
      <CardHeader>
        <CardTitle>{steps[currentStep].name}</CardTitle>
        <CardDescription>{steps[currentStep].description}</CardDescription>
      </CardHeader>
      <CardContent>
        <StepNavigation steps={steps} currentStep={currentStep} />

        <form
          className="mt-8 space-y-8"
          onSubmit={async (e) => {
            e.preventDefault();
            if (currentStep === steps.length - 1) {
              setIsSubmitting(true);
              try {
                const response = await submitResponse(formData);
                if (response.success) {
                  toast({
                    title: "Your response has been submitted",
                    className: "dark text-white border-white/10",
                    action: (
                      <ToastAction
                        altText="Finish"
                        onClick={() => {
                          router.push(`/finish`);
                        }}
                      >
                        Finish
                      </ToastAction>
                    ),
                  });
                  router.push("/finish");
                } else {
                  toast({
                    variant: "destructive",
                    title: response.message as string,
                    action: (
                      <ToastAction
                        altText="Try again"
                        onClick={() => {
                          router.push(`/`);
                        }}
                      >
                        Try again
                      </ToastAction>
                    ),
                  });
                }
              } finally {
                setIsSubmitting(false);
              }
            }
          }}
        >
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
                    {field.type === "select" && field.name === "year" ? (
                      <Select
                        onValueChange={(value: string) => {
                          setFormData((prev) => ({
                            ...prev,
                            ["year"]: value,
                          }));
                        }}
                        defaultValue="First"
                      >
                        <SelectTrigger className="w-full bg-primary text-white border-primary">
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent className="bg-secondary text-white border-secondary">
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
                        className="h-[40vh] resize-none bg-foreground text-white border-secondary active:border-primary"
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
                        className="bg-foreground text-white border-secondary active:border-primary"
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
            <div className="flex flex-col gap-5">
              <h2 className="text-xl font-semibold">Complete</h2>
              <p className="text-white">Thank you for filling the form</p>
              <Button
                type="submit"
                className="w-full  sm:max-w-[40%]  lg:max-w-[30%] bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit"
                )}
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
