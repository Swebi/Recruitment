import React from "react";
import { Step } from "@/lib/schema";
import { Button } from "./ui/button";

const NavigationControls = ({
  next,
  prev,
  currentStep,
  steps,
}: {
  next: () => void;
  prev: () => void;
  currentStep: number;
  steps: Step[];
}) => {
  return (
    <div className="mt-8 pt-5">
      <div className="flex justify-between">
        <Button
          type="button"
          onClick={prev}
          disabled={currentStep === 0}
          className="w-fit px-5 bg-primary text-primary-foreground hover:bg-primary disabled:bg-secondary"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </Button>
        {currentStep < steps.length - 1 && (
          <Button
            type="button"
            onClick={next}
            className="w-fit px-5 bg-primary text-primary-foreground hover:bg-primary disabled:bg-secondary"
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default NavigationControls;
