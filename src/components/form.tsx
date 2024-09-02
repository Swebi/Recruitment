"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { FormDataSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { steps } from "@/data/steps";
import StepNavigation from "./stepNavigation";
import NavigationControls from "./navigationControls";

type Inputs = z.infer<typeof FormDataSchema>;

export default function Form() {
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedDomain, setSelectedDomain] = useState(""); // State to track selected domain
  const delta = currentStep - previousStep;

  const {
    register,
    handleSubmit,
    reset,
    trigger,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(FormDataSchema),
  });

  const processForm: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    reset();
  };

  type FieldName = keyof Inputs;

  const next = async () => {
    const fields = steps[currentStep].fields?.map((field) => field.name);
    const output = await trigger(fields as FieldName[], { shouldFocus: true });

    if (!output) return;

    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 2) {
        await handleSubmit(processForm)();
      }
      setPreviousStep(currentStep);
      setCurrentStep((step) => step + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
  };

  const handleDomainChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDomain(event.target.value);
  };

  const filteredSubdomains =
    selectedDomain === "Technical"
      ? ["Web Dev", "App Dev"]
      : selectedDomain === "Creatives"
      ? ["Creatives"]
      : selectedDomain === "Corporate"
      ? ["Sponsorship", "Marketing"]
      : [];

  return (
    <section className=" flex flex-col justify-between p-0">
      {/* Steps Navigation */}
      <StepNavigation steps={steps} currentStep={currentStep} />

      {/* Dynamic Form Fields */}
      <form className="mt-12 py-12" onSubmit={handleSubmit(processForm)}>
        {steps[currentStep].fields && (
          <motion.div
            initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              {steps[currentStep].name}
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              {steps[currentStep].description}
            </p>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              {steps[currentStep].fields?.map((field, index) => (
                <div key={field.name} className="sm:col-span-3">
                  <label
                    htmlFor={field.name}
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    {field.label}
                  </label>
                  <div className="mt-2">
                    {field.type === "select" && field.name === "domain" ? (
                      <select
                        id={field.name}
                        {...register(field.name as FieldName, {
                          onChange: handleDomainChange,
                        })}
                        autoComplete={field.autoComplete}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        {field.options?.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : field.type === "select" &&
                      field.name === "subdomain" ? (
                      <select
                        id={field.name}
                        {...register(field.name as FieldName)}
                        autoComplete={field.autoComplete}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        {filteredSubdomains.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : field.type === "select" &&
                      field.name !== "subdomain" &&
                      field.name !== "domain" ? (
                      <select
                        id={field.name}
                        {...register(field.name as FieldName)}
                        autoComplete={field.autoComplete}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        {field.options.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : steps[currentStep].name === "Questions" ? (
                      <textarea
                        id={field.name}
                        {...register(field.name as FieldName)}
                        autoComplete={field.autoComplete}
                        className="flex h-[40vh] w-full resize-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                        rows={4}
                      />
                    ) : (
                      <input
                        type={field.type}
                        id={field.name}
                        {...register(field.name as FieldName)}
                        autoComplete={field.autoComplete}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                      />
                    )}
                    {errors[field.name as FieldName]?.message && (
                      <p className="mt-2 text-sm text-red-400">
                        {errors[field.name as FieldName]?.message}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {currentStep === steps.length - 1 && (
          <>
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Complete
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Thank you for your submission.
            </p>
          </>
        )}
      </form>

      {/* Navigation */}

      <NavigationControls
        steps={steps}
        currentStep={currentStep}
        next={next}
        prev={prev}
      />
    </section>
  );
}
