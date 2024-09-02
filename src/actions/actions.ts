"use server";

import { response } from "@/lib/schema";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function submitResponse(formData: response) {
  console.log(formData);
  try {
    await prisma.responses.create({
      data: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        srmEmail: formData.srmEmail,
        phone: formData.phone,
        regno: formData.regno,
        year: formData.year,
        course: formData.course,
        department: formData.department,
        linkedin: formData.linkedin,
        github: formData.github,
        resume: formData.resume,
        domain: formData.domain,
        subdomain: formData.subdomain,
        q1: formData.q1,
        q2: formData.q2,
        q3: formData.q3,
        q4: formData.q4,
        q5: formData.q5,
      },
    });

    return { success: true, message: "Questions submitted successfully!" };
  } catch (error) {
    console.error("Error submitting questions:", error);
    return {
      success: false,
      message: "Failed to submit questions. Please try again.",
    };
  }
}
