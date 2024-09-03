"use server";

import { response } from "@/lib/schema";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
    return {
      success: false,
      message: "You have already submitted a response",
    };
  }
}

export async function addCount() {
  try {
    await prisma.count.upsert({
      where: {
        id: "count",
        name: "count",
      },
      update: {
        visits: {
          increment: 1,
        },
      },
      create: {
        id: "count",
        name: "count",
        visits: 0,
      },
    });

    return { success: true, message: "Added Count" };
  } catch (error) {
    return {
      success: false,
      message: "Error",
    };
  }
}
