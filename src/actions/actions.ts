"use server";

import { response } from "@/lib/schema";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

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

export async function getAllResponses() {
  try {
    const responses = await prisma.responses.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return responses;
  } catch (error) {
    return []; // Return an empty array on error
  }
}

export async function getResponseCount() {
  try {
    const count = await prisma.responses.count();
    return count;
  } catch (error) {
    return 0;
  }
}

export async function getDomainCount(domain: string) {
  try {
    const count = await prisma.responses.count({
      where: {
        domain,
      },
    });
    return count;
  } catch (error) {
    return 0;
  }
}

export async function getSubDomainCount(subdomain: string) {
  try {
    const count = await prisma.responses.count({
      where: {
        subdomain,
      },
    });
    return count;
  } catch (error) {
    return 0;
  }
}

export async function setStatus(id: string, status: string) {
  try {
    const response = await prisma.responses.update({
      where: {
        id: id,
      },
      data: {
        status: status,
      },
    });
    if (response) {
      revalidatePath("/responses");
      return {
        success: true,
        message: "Updated Status",
      };
    } else {
      return {
        success: false,
        message: "Could Not Update",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "Error",
    };
  }
}
