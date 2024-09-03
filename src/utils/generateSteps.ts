import { Step, TextField } from "@/lib/schema";

// Function to generate steps based on question labels
export function generateSteps(questionLabels: string[]): Step[] {
  // Map over the questionLabels array to create the fields
  const questionFields: TextField[] = questionLabels.map((label, index) => ({
    name: `q${index + 1}`,
    label: label,
    type: "text",
  }));

  // Define the steps with the dynamically generated questionFields
  return [
    {
      id: "Step 1",
      name: "Personal Information",
      description: "Provide your personal details.",
      fields: [
        {
          name: "firstName",
          label: "First name",
          type: "text",
          autoComplete: "given-name",
        },
        {
          name: "lastName",
          label: "Last name",
          type: "text",
          autoComplete: "family-name",
        },
        {
          name: "email",
          label: "Personal Email",
          type: "email",
          autoComplete: "email",
        },
        {
          name: "srmEmail",
          label: "SRM Email",
          type: "email",
          autoComplete: "email",
        },
        {
          name: "phone",
          label: "Phone Number",
          type: "text",
        },
      ],
    },
    {
      id: "Step 2",
      name: "Details",
      description: "Provide your SRM details.",
      fields: [
        {
          name: "regno",
          label: "Registration Number",
          type: "text",
        },
        {
          name: "year",
          label: "Year",
          type: "select",
          options: ["First", "Second", "Third"],
          autoComplete: "",
        },
        {
          name: "course",
          label: "Course",
          type: "text",
        },
        {
          name: "department",
          label: "Department",
          type: "text",
        },
        {
          name: "linkedin",
          label: "Linkedin URL",
          type: "text",
        },
        {
          name: "github",
          label: "GitHub URL",
          type: "text",
        },
        {
          name: "resume",
          label: "Resume URL (Optional)",
          type: "text",
        },
      ],
    },
    {
      id: "Step 3",
      name: "Questions",
      description: "Answer some of these questions",
      fields: questionFields, // Use the dynamically generated fields
    },
    {
      id: "Step 4",
      name: "Complete",
    },
  ];
}
