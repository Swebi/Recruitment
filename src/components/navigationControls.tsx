import React from "react";
import { Step } from "@/lib/schema";

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
        <button
          type="button"
          onClick={prev}
          disabled={currentStep === 0}
          className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
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
        </button>
        {currentStep < steps.length - 1 && (
          <button
            type="button"
            onClick={next}
            className="rounded bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default NavigationControls;
