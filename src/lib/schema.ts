import { z } from "zod";

export const FormDataSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  srmEmail: z.string().endsWith("@srmist.edu.in", "Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  regno: z.string().startsWith("RA").min(15, "Registeration number Invalid "),
  year: z.string().min(1, "Year is required"),
  course: z.string().min(1, "Course is required"),
  department: z.string().min(1, "Department is required"),
  linkedin: z.string().url().min(1, "Linkedin is required"),
  github: z.string().url().min(1, "Github is required"),
  resume: z.string(),
  q1: z.string().min(1, "This question is required"),
  q2: z.string().min(1, "This question is required"),
  q3: z.string().min(1, "This question is required"),
  q4: z.string().min(1, "This question is required"),
  q5: z.string().min(1, "This question is required"),
});

export interface response {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  srmEmail: boolean;
  phone: string;
  regno: string;
  year: boolean;
  course: string;
  department: string;
}

export interface BaseField {
  name: string;
  label: string;
  type: string;
  autoComplete?: string;
}

export interface TextField extends BaseField {
  type: "text" | "email";
}

export interface SelectField extends BaseField {
  type: "select";
  options: string[];
}

export type Field = TextField | SelectField;

export interface Step {
  id: string;
  name: string;
  description?: string;
  fields?: Field[];
}
