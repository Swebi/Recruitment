"use server";

import { response } from "@/lib/schema";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function submitQuestions(formData: FormData) {
  const domain = formData.get("domain") as string;
  const subdomain = formData.get("subdomain") as string;
  const questions = formData.getAll("questions") as string[];
  console.log(domain);
  console.log(subdomain);
  console.log(questions);

  try {
    questions.map(
      async (question) =>
        await prisma.questions.create({
          data: {
            domain,
            subdomain,
            question,
          },
        })
    );
    return { success: true, message: "Questions submitted successfully!" };
  } catch (error) {
    console.error("Error submitting questions:", error);
    return {
      success: false,
      message: "Failed to submit questions. Please try again.",
    };
  }
}

export async function getQuestions({
  domain,
  subdomain,
}: {
  domain: string;
  subdomain: string;
}) {
  try {
    const questions = await prisma.questions.findMany({
      where: { domain, subdomain },
      select: {
        question: true,
      },
    });
    const questionStrings = questions.map((q) => q.question);

    return {
      success: true,
      message: "Questions fetched successfully!",
      questions: questionStrings,
    };
  } catch (error) {
    console.error("Error fetching questions:", error);
    return {
      success: false,
      message: "Failed to fetch questions. Please try again.",
    };
  }
}

export async function submitResponse(formData: response) {
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
